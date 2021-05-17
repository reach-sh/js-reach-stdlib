import type { num } from './shared';
import type { BigNumber, ethers } from 'ethers';
import type { CBR_Val } from './CBR';
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
export interface TypeDefs {
    T_Null: any;
    T_Bool: any;
    T_UInt: any;
    T_Bytes: any;
    T_Address: any;
    T_Digest: any;
    T_Token: any;
    T_Object: any;
    T_Data: any;
    T_Array: any;
    T_Tuple: any;
    T_Struct: any;
}
export interface SharedStdlib {
    bigNumberify: any;
    bigNumberToNumber: any;
    getViewsHelper: any;
    deferContract: any;
    truthyEnv: any;
    envDefault: any;
    setDEBUG: any;
    getDEBUG: any;
    debug: any;
    assert: any;
    isBigNumber: any;
    checkedBigNumberify: any;
    protect: any;
    isHex: any;
    hexToString: any;
    stringToHex: any;
    makeDigest: any;
    hexToBigNumber: any;
    uintToBytes: any;
    bigNumberToHex: any;
    bytesEq: any;
    digestEq: any;
    makeRandom: any;
    eq: any;
    makeArith: any;
    ge: any;
    gt: any;
    le: any;
    lt: any;
    argsSlice: any;
    argsSplit: any;
    Array_set: any;
    Array_zip: any;
    mapRef: any;
    objectMap: any;
    mkAddressEq: any;
    parseFixedPoint: any;
    parseInt: any;
}
export interface Arith {
    add: (x: num, y: num) => BigNumber;
    sub: (x: num, y: num) => BigNumber;
    mod: (x: num, y: num) => BigNumber;
    mul: (x: num, y: num) => BigNumber;
    div: (x: num, y: num) => BigNumber;
}
export interface StdlibBase extends SharedStdlib, Arith, TypeDefs {
    addressEq: (addr1: unknown, addr2: unknown) => boolean;
    tokenEq: (x: unknown, y: unknown) => boolean;
    digest: (t: AnyETH_Ty, a: unknown) => string;
}
export interface BackendStdlib extends StdlibBase {
    UInt_max: BigNumber;
}
export interface EthLikeCompiled extends BackendStdlib {
    stdlib: BackendStdlib;
    typeDefs: TypeDefs;
}
export interface ProviderLib {
    getProvider: any;
    setProvider: any;
    setProviderByEnv: any;
    setProviderByName: any;
    providerEnvByName: any;
}
export interface ReachStdlib extends StdlibBase, ProviderLib {
    connector: string;
    randomUInt: any;
    hasRandom: any;
    balanceOf: any;
    transfer: any;
    connectAccount: any;
    newAccountFromSecret: any;
    newAccountFromMnemonic: any;
    getDefaultAccount: any;
    createAccount: any;
    fundFromFaucet: any;
    newTestAccount: any;
    getNetworkTime: any;
    wait: any;
    waitUntilTime: any;
    verifyContract: any;
    /** @description the display name of the standard unit of currency for the network */
    standardUnit: string;
    /** @description the display name of the atomic (smallest) unit of currency for the network */
    atomicUnit: string;
    parseCurrency: any;
    minimumBalance: any;
    formatCurrency: any;
    formatAddress: any;
    reachStdlib: BackendStdlib;
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