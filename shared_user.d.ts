import { ethers } from 'ethers';
import { bigNumberify, bigNumberToNumber } from './CBR';
import { hexToBigNumber } from './shared_impl';
import { num, isHex, stringToHex } from './shared_backend';
export { isHex, stringToHex, bigNumberify, bigNumberToNumber, hexToBigNumber };
declare type BigNumber = ethers.BigNumber;
declare const BigNumber: typeof ethers.BigNumber;
export declare const isBigNumber: typeof ethers.BigNumber.isBigNumber;
export declare const bigNumberToBigInt: (x: BigNumber) => bigint;
export declare const uintToBytes: (i: BigNumber) => string;
export declare const bigNumberToHex: (u: num, size?: number) => string;
export declare const parseFixedPoint: (x: {
    sign: boolean;
    i: {
        i: num;
        scale: num;
    };
}) => number;
export declare const parseInt: (x: {
    sign: boolean;
    i: num;
}) => number;
export declare const hasConsoleLogger: {
    log: (message?: any, ...optionalParams: any[]) => void;
};
export declare const numberToFixedPoint: (n: number) => {
    sign: boolean;
    i: {
        scale: ethers.BigNumber;
        i: ethers.BigNumber;
    };
};
export declare const numberToInt: (n: number) => {
    sign: boolean;
    i: ethers.BigNumber;
};
export declare const withDisconnect: <T>(f: () => Promise<T>) => Promise<T>;
export declare const disconnect: <T>(t: T) => never;
//# sourceMappingURL=shared_user.d.ts.map