import ethers from 'ethers';
import Timeout from 'await-timeout';

function epochToBlockNumber(x) {
  return {
    blockNumber: x.epochNumber,
    ...x,
  };
}
export function ethifyOkReceipt(receipt) {
  if (receipt.outcomeStatus !== 0) {
    throw Error(`Receipt outcomeStatus is nonzero: ${receipt.outcomeStatus}`);
  }
  return epochToBlockNumber({
    status: 'ok',
    ...receipt,
  });
}
export function ethifyTxn(txn) {
  if (txn.status !== 0) {
    throw Error(`Txn status is not 0: ${txn.status}`);
  }
  // It would appear that no eth-ification is actully necessary at this moment.
  // It might be nice to have blockNumber on here,
  // but it's not required.
  // Accomplishing that would require another API call...
  return txn;
}
// XXX bi: BigInt
function bi2bn(bi) {
  return ethers.BigNumber.from(bi.toString());
}
export class Provider {
  constructor(conflux) {
    this.conflux = conflux;
  }
  async getBalance(address, epochNumber) {
    return bi2bn(await this.conflux.getBalance(address, epochNumber));
  }
  async getBlockNumber() {
    // Arbitrarily make the user wait.
    // This is just because we tend to spam this a lot.
    // It can help to increase this to 1000 or more if you need to debug.
    await Timeout.set(50);
    // TODO: 'latest_state' seems to work well; is there a better choice?
    return await this.conflux.getEpochNumber('latest_state');
  }
  async getTransactionReceipt(transactionHash) {
    const r = await this.conflux.getTransactionReceipt(transactionHash);
    return ethifyOkReceipt(r);
  }
  on(...argz) {
    void(argz);
    throw Error(`on not yet implemented`);
    // XXX
  }
  off(...argz) {
    void(argz);
    throw Error(`off not yet implemented`);
    // XXX
  }
  async getLogs(opts) {
    const cfxOpts = {
      fromEpoch: opts.fromBlock,
      toEpoch: opts.toBlock,
      address: opts.address,
      topics: opts.topics,
    };
    return (await this.conflux.getLogs(cfxOpts)).map(epochToBlockNumber);
  }
  async getTransaction(txnHash) {
    // @ts-ignore
    return ethifyTxn(await this.conflux.getTransactionByHash(txnHash));
  }
}
