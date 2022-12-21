import type { // =>
TypeDefs, Stdlib_Backend_Base, ProviderLib, Stdlib_Impl_Shared } from './interfaces';
import type { // =>
Token, ContractInfo } from './ETH_like_compiled';
import type { // =>
ethers, BigNumber } from 'ethers';
import type { // =>
CBR_Val, BackendTy } from './CBR';
export type Address = string;
export type TransactionReceipt = ethers.providers.TransactionReceipt;
export type Block = ethers.providers.Block;
export type Log = ethers.providers.Log;
export type TransactionResponse = ethers.providers.TransactionResponse;
export interface ETH_Ty<BV extends CBR_Val, NV> extends BackendTy<BV> {
    munge: (bv: BV) => NV;
    unmunge: (nv: NV) => BV;
    /** @description describes the shape of the munged value */
    paramType: string;
    isBaseType: boolean;
}
export type AnyETH_Ty = ETH_Ty<any, any>;
type ConnectorTy = AnyETH_Ty;
export interface EthLikeCompiled extends Stdlib_Impl_Shared {
    stdlib: Stdlib_Backend_Base<Token, ContractInfo, ConnectorTy>;
    typeDefs: TypeDefs<AnyETH_Ty>;
}
interface EthersLikeNetworkAccountIsh {
    address?: any;
    getAddress?: any;
    getBalance?: any;
    sendTransaction?: any;
    _mnemonic?: () => {
        phrase: string;
    };
}
export interface EthersLikeSigner extends EthersLikeNetworkAccountIsh {
    isSigner(...arg: any): boolean;
}
export interface EthersLikeContractFactory {
}
export interface EthersLikeContract {
    [key: string]: any;
    interface: ethers.utils.Interface;
}
export interface EthersLikeProvider {
    getTransactionReceipt: (h: string) => Promise<TransactionReceipt>;
    getBalance: (a: Address) => Promise<BigNumber>;
    getBlock: (n: number) => Promise<Block>;
    getBlockNumber: () => Promise<number>;
    getLogs: (q: object) => Promise<Array<Log>>;
    getTransaction: (h: string) => Promise<TransactionResponse>;
    waitForTransaction: (h: string) => Promise<TransactionReceipt>;
}
export interface EthersLikeProviders {
}
export interface EthersLikeContractFactory {
    deploy(...args: any): Promise<EthersLikeContract>;
    getDeployTransaction(...args: any): any;
    interface: ethers.utils.Interface;
}
export interface EthersLikeContractFactoryClass {
    new (...args: any): EthersLikeContractFactory;
}
export interface EthersLikeContractClass {
    new (...args: any): EthersLikeContract;
}
export interface EthersLike {
    Contract: EthersLikeContractClass;
    ContractFactory: EthersLikeContractFactoryClass;
    Wallet: EthersLikeWalletClass;
    Signer: EthersLikeSigner;
    providers: EthersLikeProviders;
}
export interface EthersLikeWallet extends EthersLikeNetworkAccountIsh {
    connect(...args: any): this;
}
export interface EthersLikeWalletClass {
    new (secret: Uint8Array): EthersLikeWallet;
    fromMnemonic(mnemonic: string): EthersLikeWallet;
    createRandom(): EthersLikeWallet;
}
export interface EthLikeArgs<Provider, ProviderEnv, ProviderName> {
    ethLikeCompiled: EthLikeCompiled;
    ethers: EthersLike;
    standardDigits?: number;
    providerLib: ProviderLib<Provider, ProviderEnv, ProviderName>;
    isIsolatedNetwork(): boolean;
    isWindowProvider(): boolean;
    canGetDefaultAccount(): boolean;
    _getDefaultNetworkAccount(): any;
    _getDefaultFaucetNetworkAccount(): any;
    _specialFundFromFaucet?: () => Promise<null | ((acc: any, val: any) => Promise<any>)>;
    _warnTxNoBlockNumber?: boolean;
    canFundFromFaucet: () => Promise<boolean>;
    standardUnit: string;
    atomicUnit: string;
    validQueryWindow: number | true;
}
export interface EthLikeCompiledArgs {
    T_Address: ETH_Ty<string, string>;
}
export {};
//# sourceMappingURL=ETH_like_interfaces.d.ts.map