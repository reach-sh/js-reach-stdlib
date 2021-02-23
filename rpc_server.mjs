import { createSecureServer } from 'http2';
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
export const mkStdlibProxy = async (lib) => {
  const makeHandle = (container) => (val) => {
    const id = container.length;
    container[id] = val;
    return id;
  };
  const ACC = [];
  const mkACC = makeHandle(ACC);
  const rpc_stdlib = {
    ...lib,
    newTestAccount: async (bal) => mkACC(await lib.newTestAccount(bal)),
    getDefaultAccount: async () => mkACC(await lib.getDefaultAccount()),
    newAccountFromSecret: async (s) => mkACC(await lib.newAccountFromSecret(s)),
    newAccountFromMnemonic: async (s) => mkACC(await lib.newAccountFromMnemonic(s)),
    createAccount: async () => mkACC(await lib.createAccount()),
    fundFromFaucet: (id, bal) => lib.fundFromFaucet(ACC[id], bal),
    connectAccount: async (id) => mkACC(await lib.connectAccount(ACC[id].networkAccount)),
    balanceOf: async (id) => lib.balanceOf(ACC[id]),
    transfer: async (from, to, bal) => lib.transfer(ACC[from], ACC[to], bal),
  };
  return {
    ACC,
    mkACC,
    makeHandle,
    rpc_stdlib,
  };
};
export const serveRpc = async (backend) => {
  const real_stdlib = await loadStdlib();
  const { ACC, makeHandle, rpc_stdlib } = await mkStdlibProxy(real_stdlib);
  const CTC = [];
  const mkCTC = makeHandle(CTC);
  const { debug } = real_stdlib;
  const app = express();
  const rpc_acc = {
    attach: async (id, ...args) => mkCTC(await ACC[id].attach(backend, ...args)),
    deploy: async (id) => mkCTC(await ACC[id].deploy(backend)),
  };
  const rpc_ctc = {
    getInfo: async (id) => CTC[id].getInfo(),
  };
  const makeRPC = (olab, obj) => {
    const router = express.Router();
    for (const k in obj) {
      router.post(`/${k}`, async (req, res) => {
        const args = req.body;
        const lab = `RPC ${olab}/${k} ${JSON.stringify(args)}`;
        debug(`${lab}`);
        const ans = await obj[k](...args);
        debug(`${lab} ==> ${JSON.stringify(ans)}`);
        res.json(ans);
      });
    }
    return router;
  };
  const KONT = [];
  const makeKont = makeHandle(KONT);
  const route_backend = express.Router();
  for (const b in backend) {
    route_backend.post(`/${b}`, async (req, res) => {
      let lab = `RPC backend/${b}`;
      debug(`${lab} IN`);
      const [cid, vals, meths] = req.body;
      const ctc = CTC[cid];
      const kid = makeKont(res);
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
          const old_res = KONT[kid];
          KONT[kid] = { resolve, reject };
          old_res.json({ t: `Kont`, kid, m, args });
        });
      }
      const ans = await backend[b](ctc, io);
      debug(`${lab} END ${JSON.stringify(ans)}`);
      const new_res = KONT[kid];
      KONT[kid] = null;
      debug(`${lab} DONE`);
      new_res.json({ t: `Done`, ans });
    });
  }
  const do_kont = (req, res) => {
    let lab = `KONT`;
    debug(`${lab} IN`);
    const [kid, ans] = req.body;
    lab = `${lab} ${kid}`;
    debug(`${lab} ANS ${JSON.stringify(ans)}`);
    const { resolve, reject } = KONT[kid];
    void(reject);
    KONT[kid] = res;
    debug(`${lab} OUT`);
    resolve(ans);
  };
  app.use(withApiKey());
  app.use(express.json());
  app.use(`/stdlib`, makeRPC('stdlib', rpc_stdlib));
  app.use(`/acc`, makeRPC('acc', rpc_acc));
  app.use(`/ctc`, makeRPC('ctc', rpc_ctc));
  app.use(`/backend`, route_backend);
  app.post(`/kont`, do_kont);
  app.post(`/stop`, (_, res) => {
    res.json(true);
    process.exit(0);
  });
  app.post(`/health`, (req, res) => {
    void(req);
    res.json(true);
  });
  app.disable('X-Powered-By');
  const fetchOrFail = (envvar, desc) => {
    const f = process.env[envvar];
    if (!f) {
      console.error([`\nPlease populate the \`${envvar}\` environment variable with`,
        ` the path to your TLS ${desc}.\n`,
      ].join(''));
      process.exit(1);
    }
    const fq = resolve(f);
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
