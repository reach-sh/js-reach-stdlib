import { createSecureServer } from 'http2';
import { randomBytes } from 'crypto';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import express from 'express';
import { loadStdlib } from './loader.mjs';
const withApiKey = () => {
  const key = process.env.REACH_RPC_KEY;
  if (!key) {
    console.error(['\nPlease populate the `REACH_RPC_KEY` environment variable with a',
      ' strong pre-shared key, e.g.:\n',
      '  $ head -c 24 /dev/urandom | base64\n',
    ].join(''));
    process.exit(1);
  }
  return (req, res, next) => req.get('X-API-Key') === key ?
    next() :
    res.status(403).json({});
};
export const mkKont = () => {
  // TODO consider replacing stringly-typed exceptions with structured
  // descendants of `Error` base class
  const UNTRACKED = 'Untracked continuation ID:';
  const untracked = (i) => `${UNTRACKED} ${i}`;
  const k = {};
  let i = 0;
  const mkWas = (m) => (e) => !!(e.message
    .substr(0, m.length)
    .match(`^${m}$`));
  const was = {
    untracked: mkWas(UNTRACKED),
  };
  const raise = (e) => {
    throw new Error(e);
  };
  const track = async (a) => {
    const rb = await randomBytes(24);
    const id = `${i}_${rb.toString('hex')}`;
    k[id] = a;
    i++;
    return id;
  };
  const id = (i) => k[i] === undefined ?
    raise(untracked(i)) :
    k[i];
  const replace = (i, a) => k[i] === undefined ?
    raise(untracked(i)) :
    (() => { k[i] = a; return i; })();
  const forget = (i) => delete k[i];
  return {
    // Internals
    _: {
      k,
      i,
      UNTRACKED,
      untracked,
    },
    // General API
    forget,
    id,
    replace,
    track,
    was,
  };
};
export const mkStdlibProxy = async (lib) => {
  const account = mkKont();
  const rpc_stdlib = {
    ...lib,
    newTestAccount: async (bal) => account.track(await lib.newTestAccount(bal)),
    getDefaultAccount: async () => account.track(await lib.getDefaultAccount()),
    newAccountFromSecret: async (s) => account.track(await lib.newAccountFromSecret(s)),
    newAccountFromMnemonic: async (s) => account.track(await lib.newAccountFromMnemonic(s)),
    createAccount: async () => account.track(await lib.createAccount()),
    fundFromFaucet: (id, bal) => lib.fundFromFaucet(account.id(id), bal),
    connectAccount: async (id) => account.track(await lib.connectAccount(account.id(id).networkAccount)),
    balanceOf: async (id) => lib.balanceOf(account.id(id)),
    transfer: async (from, to, bal) => lib.transfer(account.id(from), account.id(to), bal),
  };
  return {
    account,
    rpc_stdlib,
  };
};
export const serveRpc = async (backend) => {
  const real_stdlib = await loadStdlib();
  const { account, rpc_stdlib } = await mkStdlibProxy(real_stdlib);
  const { debug } = real_stdlib;
  const contract = mkKont();
  const kont = mkKont();
  const app = express();
  const route_backend = express.Router();
  const rpc_acc = {
    attach: async (id, ...args) => contract.track(await account.id(id).attach(backend, ...args)),
    deploy: async (id) => contract.track(await account.id(id).deploy(backend)),
    getAddress: async (id) => await account.id(id).getAddress(),
    setGasLimit: async (id, ...args) => await account.id(id).setGasLimit(...args),
  };
  const rpc_ctc = {
    getInfo: async (id) => contract.id(id).getInfo(),
  };
  const safely = (f) => (req, res) => (async () => {
    const { was } = kont;
    const client = `client ${req.ip}: ${req.method} ${req.originalUrl} ${JSON.stringify(req.body)}`;
    try {
      debug(`Attempting to process request by ${client}`);
      await f(req, res);
    } catch (e) {
      debug(`!! Witnessed exception triggered by ${client}:\n  ${e.stack}`);
      const [s, message] = was.untracked(e) ? [404, String(e)] :
        [500, 'Unspecified fault'];
      if (!res.headersSent) {
        res.status(s).json({ message, request: req.body });
        debug(`!! HTTP ${s}: "${message}" response sent to client`);
      } else {
        res.end();
        debug(`!! Response already initiated; unable to send appropriate payload`);
      }
    }
  })();
  const mkRPC = (olab, obj) => {
    const router = express.Router();
    for (const k in obj) {
      router.post(`/${k}`, safely(async (req, res) => {
        const args = req.body;
        const lab = `RPC ${olab}/${k} ${JSON.stringify(args)}`;
        debug(`${lab}`);
        const ans = await obj[k](...args);
        debug(`${lab} ==> ${JSON.stringify(ans)}`);
        res.json(ans);
      }));
    }
    return router;
  };
  for (const b in backend) {
    route_backend.post(`/${b}`, safely(async (req, res) => {
      let lab = `RPC backend/${b}`;
      debug(`${lab} IN`);
      const [cid, vals, meths] = req.body;
      const ctc = contract.id(cid);
      const kid = await kont.track(res);
      lab = `${lab} ${cid} ${kid}`;
      debug(`${lab} START ${JSON.stringify(req.body)}`);
      let io = { ...vals };
      if (io['stdlib.hasRandom']) {
        delete io['stdlib.hasRandom'];
        io = { ...real_stdlib.hasRandom, ...io };
      }
      for (const m in meths) {
        io[m] = (...args) => new Promise((resolve, reject) => {
          debug(`${lab} IO ${m} ${JSON.stringify(args)}`);
          const old_res = kont.id(kid);
          kont.replace(kid, { resolve, reject });
          old_res.json({ t: `Kont`, kid, m, args });
        });
      }
      const ans = await backend[b](ctc, io);
      debug(`${lab} END ${JSON.stringify(ans)}`);
      const new_res = kont.id(kid);
      kont.forget(kid);
      debug(`${lab} DONE`);
      new_res.json({ t: `Done`, ans });
    }));
  }
  const do_kont = safely(async (req, res) => {
    let lab = `KONT`;
    debug(`${lab} IN`);
    const [kid, ans] = req.body;
    lab = `${lab} ${kid}`;
    debug(`${lab} ANS ${JSON.stringify(ans)}`);
    const { resolve, reject } = kont.id(kid);
    void(reject);
    kont.replace(kid, res);
    debug(`${lab} OUT`);
    resolve(ans);
  });
  const mkForget = (K) => safely(async (req, res) => {
    req.body.map(K.forget);
    res.status(200).json({ deleted: req.body });
  });
  app.use(withApiKey());
  app.use(express.json());
  app.use(`/stdlib`, mkRPC('stdlib', rpc_stdlib));
  app.use(`/acc`, mkRPC('acc', rpc_acc));
  app.use(`/ctc`, mkRPC('ctc', rpc_ctc));
  app.use(`/backend`, route_backend);
  app.post(`/kont`, do_kont);
  // Note: successful `/backend/<p>` requests automatically `forget` their
  // continuation ID before yielding a "Done" response; likewise with requests
  // to `/kont` due to their relationship with `/backend/<p>`
  app.post(`/forget/acc`, mkForget(account));
  app.post(`/forget/ctc`, mkForget(contract));
  app.post(`/stop`, safely(async (_, res) => {
    res.json(true);
    process.exit(0);
  }));
  app.post(`/health`, safely(async (req, res) => {
    void(req);
    res.json(true);
  }));
  app.disable('x-powered-by');
  const fetchOrFail = (envvar, desc) => {
    const f = process.env[envvar];
    if (!f) {
      console.error([`\nPlease populate the \`${envvar}\` environment variable with`,
        ` the path to your TLS ${desc}.\n`,
      ].join(''));
      process.exit(1);
    }
    const fq = resolve(`./tls/${f}`);
    if (!existsSync(fq)) {
      console.error(`\nPath: ${fq} does not exist!\n`);
      process.exit(1);
    }
    return readFileSync(fq);
  };
  const opts = {
    allowHTTP1: true,
    key: fetchOrFail('REACH_RPC_TLS_KEY', 'private key'),
    cert: fetchOrFail('REACH_RPC_TLS_CRT', 'public certificate'),
  };
  const passphrase = process.env.REACH_RPC_TLS_PASSPHRASE;
  if (passphrase)
    Object.assign(opts, { passphrase });
  // @ts-ignore
  createSecureServer(opts, app)
    .listen(process.env.REACH_RPC_PORT, () => debug(`I am alive`));
};
