import cfxsdk from 'js-conflux-sdk';
import ethers from 'ethers';
import * as providers from './cfxers_providers.mjs';
const { BigNumber, utils } = ethers;
export { BigNumber, utils, providers };
// XXX Convenience export, may want to rethink
export { cfxsdk };
// This file immitates the ethers.js API
// Recursively stringify BigNumbers
function unbn(arg) {
  if (!arg)
    return arg;
  if (arg._isBigNumber)
    return arg.toString();
  if (Array.isArray(arg))
    return arg.map(unbn);
  if (typeof arg === 'string')
    return arg;
  if (Object.keys(arg).length > 0) {
    const newArg = {};
    for (const k of Object.keys(arg)) {
      newArg[k] = unbn(arg[k]);
    }
    return newArg;
  }
  return arg;
}
export class Signer {
  static isSigner(x) {
    // XXX
    return x instanceof Wallet;
  }
}
// compare to ethers.Contract
export class Contract {
  // {
  //   getEventTopic: (name: string) => string, // ?
  //   getEvent: (name: string) => {inputs: {name: string}[]},
  //   parseLog: (log: Log) => {args: {[k: string]: any}},
  // }
  constructor(address, abi, wallet, receiptP) {
    this.address = address;
    this._abi = (typeof abi === 'string') ? JSON.parse(abi) : abi;
    this._wallet = wallet;
    this._receiptP = receiptP;
    // @ts-ignore // ???
    this._contract = this._wallet.provider.conflux.Contract({
      abi: this._abi,
      address: this.address,
    });
    const self = this;
    this.deployTransaction = {
      hash: undefined,
      wait: async () => {
        if (!receiptP) {
          throw Error(`No receipt promise to wait on`);
        }
        const receipt = await self._receiptP;
        self.address = receipt.contractCreated;
        self.deployTransaction.hash = receipt.transactionHash;
        return providers.ethifyOkReceipt(receipt);
      },
    };
    for (const item of this._abi) {
      if (item.type === 'function') {
        if (item.name[0] !== '_' && item.name !== 'address' && item.name !== 'deployTransaction' && item.name !== 'interface') {
          this[item.name] = this._makeHandler(item);
        }
      }
    }
    this.interface = new ethers.utils.Interface(this._abi);
  }
  _makeHandler(abiFn) {
    const from = this._wallet.getAddress();
    const self = this;
    // return (await getC())[funcName](arg, { value, gasLimit });
    // const r_fn = await callC(funcName, arg, value);
    // r_fn.wait()
    // const ok_r = await fetchAndRejectInvalidReceiptFor(r_maybe.transactionHash);
    return async (arg, txn) => {
      arg = unbn(arg);
      // XXX user-configurable gas limit
      // const gas = '50000';
      txn = { from, ...txn, value: txn.value.toString() };
      // @ts-ignore
      const transactionReceipt = await self._contract[abiFn.name](arg).sendTransaction(txn).executed();
      const { transactionHash } = transactionReceipt;
      return {
        // XXX not sure what the distinction is supposed to be here
        wait: async () => {
          return {
            transactionHash,
          };
        },
      };
    };
  }
}
export class ContractFactory {
  constructor(abi, bytecode, wallet) {
    this.abi = (typeof abi === 'string') ? JSON.parse(abi) : abi;
    this.bytecode = bytecode;
    this.wallet = wallet;
    this.interface = new ethers.utils.Interface(this.abi);
  }
  // XXX this code can return Contract directly
  // Should it wait?
  async deploy(...deployArgs) {
    const [argsOrTxn, txnIfArgs] = deployArgs;
    const [args, txn] = txnIfArgs
      ?
      [argsOrTxn, txnIfArgs] :
      [
        [], argsOrTxn,
      ];
    const { abi, bytecode, wallet } = this;
    wallet._requireConnected();
    if (!wallet.provider)
      throw Error(`Impossible: provider is undefined`);
    const { conflux } = wallet.provider;
    const contract = conflux.Contract({ abi, bytecode });
    const from = wallet.getAddress();
    const value = (txn.value || BigNumber.from(0)).toString();
    if (args.length > 0) {
      throw Error(`ctc args not yet supported`);
    }
    // XXX gasLimit
    const receiptP = contract.constructor()
      .sendTransaction({ from, value })
      .executed();
    return new Contract(undefined, abi, wallet, receiptP);
  }
  getDeployTransaction() {
    // XXX
    throw Error(`XXX getDeployTransaction on CFX`);
  }
}
export class Wallet {
  constructor(privateKey, provider) {
    this.privateKey = privateKey;
    if (provider) {
      this.connect(provider);
    }
  }
  connect(provider) {
    if (this.provider) {
      throw Error(`Wallet already connected`);
    }
    this.provider = provider;
    if (this.privateKey) {
      this.account = this.provider.conflux.wallet.addPrivateKey(this.privateKey);
    } else {
      this.account = this.provider.conflux.wallet.addRandom();
    }
    return this;
  }
  _requireConnected() {
    if (!this.provider) {
      throw Error(`Wallet has no Provider, please call .connect()`);
    }
    if (!this.account) {
      throw Error(`Wallet has no Account, please call .connect()`);
    }
  }
  getAddress() {
    this._requireConnected();
    if (!this.account)
      throw Error(`Impossible: account is undefined`);
    return this.account.toString();
  }
  async sendTransaction(txn) {
    this._requireConnected();
    if (!this.provider)
      throw Error(`Impossible: provider is undefined`);
    const from = this.getAddress();
    txn = { from, ...txn, value: txn.value.toString() };
    // This is weird but whatever
    if (txn.to instanceof Promise) {
      txn.to = await txn.to;
    }
    const transactionHashP = this.provider.conflux.sendTransaction(txn);
    const transactionHash = await transactionHashP;
    return {
      transactionHash,
      wait: async () => {
        // see: https://github.com/Conflux-Chain/js-conflux-sdk/blob/master/docs/how_to_send_tx.md#transactions-stage
        // @ts-ignore
        await transactionHashP.executed();
        return { transactionHash };
      },
    };
  }
  static createRandom() {
    return new Wallet();
  }
  static fromMnemonic(mnemonic) {
    // TODO
    void(mnemonic);
    throw Error(`Account 'from mnemonic' not supported on Conflux, please use secret key`);
  }
}
