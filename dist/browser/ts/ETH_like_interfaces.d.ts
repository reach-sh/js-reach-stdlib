import type { // =>
TypeDefs, Stdlib_Backend_Base, ProviderLib, Stdlib_Impl_Shared } from './interfaces';
import type { // =>
ethers } from 'ethers';
import type { // =>
CBR_Val } from './CBR';
export declare type ETH_Ty<BV extends CBR_Val, NV> = {
    name: string;
    defaultValue: BV;
    canonicalize: (uv: unknown) => BV;
    munge: (bv: BV) => NV;
    unmunge: (nv: NV) => BV;
    /** @description describes the shape of the munged value */
    paramType: string;
};
export declare type AnyETH_Ty = ETH_Ty<CBR_Val, any>;
export interface EthLikeCompiled extends Stdlib_Impl_Shared {
    stdlib: Stdlib_Backend_Base<AnyETH_Ty>;
    typeDefs: TypeDefs;
}
export interface EthersLikeSigner {
    isSigner(...arg: any): boolean;
}
export interface EthersLikeContractFactory {
}
export interface EthersLikeContract {
    [key: string]: any;
    interface: ethers.utils.Interface;
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
export interface EthersLikeWallet {
    connect(...args: any): this;
}
export interface EthersLikeWalletClass {
    new (secret: string): EthersLikeWallet;
    fromMnemonic(mnemonic: string): EthersLikeWallet;
    createRandom(): EthersLikeWallet;
}
export interface EthLikeArgs {
    ethLikeCompiled: EthLikeCompiled;
    ethers: EthersLike;
    standardDigits?: number;
    providerLib: ProviderLib;
    isIsolatedNetwork(): boolean;
    isWindowProvider(): boolean;
    _getDefaultNetworkAccount(): any;
    _getDefaultFaucetNetworkAccount(): any;
    _verifyContractCode?: boolean;
    _warnTxNoBlockNumber?: boolean;
    standardUnit: string;
    atomicUnit: string;
}
export interface EthLikeCompiledArgs {
    T_Address: ETH_Ty<string, string>;
}
//# sourceMappingURL=ETH_like_interfaces.d.ts.map