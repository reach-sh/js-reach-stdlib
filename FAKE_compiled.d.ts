import * as shared from './shared';
export declare const typeDefs: {
    T_Null: {
        name: string;
        defaultValue: null;
        canonicalize: (uv: unknown) => null;
        munge: (bv: null) => false;
        unmunge: (nv: false) => null;
        paramType: string;
    };
    T_Bool: {
        name: string;
        defaultValue: boolean;
        canonicalize: (uv: unknown) => boolean;
        munge: (bv: boolean) => boolean;
        unmunge: (nv: boolean) => boolean;
        paramType: string;
    };
    T_UInt: {
        name: string;
        defaultValue: import("ethers").BigNumber;
        canonicalize: (uv: unknown) => import("ethers").BigNumber;
        munge: (bv: import("ethers").BigNumber) => import("ethers").BigNumber;
        unmunge: (nv: import("ethers").BigNumber) => import("ethers").BigNumber;
        paramType: string;
    };
    T_Bytes: (len: number) => {
        name: string;
        defaultValue: string;
        canonicalize: (uv: unknown) => string;
        munge: (bv: string) => number[];
        unmunge: (nv: number[]) => string;
        paramType: string;
    };
    T_Address: {
        name: string;
        defaultValue: string;
        canonicalize: (uv: unknown) => string;
        munge: (bv: string) => string;
        unmunge: (nv: string) => string;
        paramType: string;
    };
    T_Digest: {
        name: string;
        defaultValue: string;
        canonicalize: (uv: unknown) => string;
        munge: (bv: string) => import("ethers").BigNumber;
        unmunge: (nv: import("ethers").BigNumber) => string;
        paramType: string;
    };
    T_Object: <T>(co: {
        [key: string]: {
            name: string;
            defaultValue: import("./CBR").CBR_Val;
            canonicalize: (uv: unknown) => import("./CBR").CBR_Val;
            munge: (bv: import("./CBR").CBR_Val) => T;
            unmunge: (nv: T) => import("./CBR").CBR_Val;
            paramType: string;
        };
    }) => {
        name: string;
        defaultValue: import("./CBR").CBR_Object;
        canonicalize: (uv: unknown) => import("./CBR").CBR_Object;
        munge: (bv: import("./CBR").CBR_Object) => {
            [key: string]: T;
        };
        unmunge: (nv: {
            [key: string]: T;
        }) => import("./CBR").CBR_Object;
        paramType: string;
    };
    T_Data: <T_1>(co: {
        [key: string]: {
            name: string;
            defaultValue: import("./CBR").CBR_Val;
            canonicalize: (uv: unknown) => import("./CBR").CBR_Val;
            munge: (bv: import("./CBR").CBR_Val) => T_1;
            unmunge: (nv: T_1) => import("./CBR").CBR_Val;
            paramType: string;
        };
    }) => {
        name: string;
        defaultValue: import("./CBR").CBR_Data;
        canonicalize: (uv: unknown) => import("./CBR").CBR_Data;
        munge: (bv: import("./CBR").CBR_Data) => T_1[];
        unmunge: (nv: T_1[]) => import("./CBR").CBR_Data;
        paramType: string;
    };
    T_Array: <T_2>(ctc: {
        name: string;
        defaultValue: import("./CBR").CBR_Val;
        canonicalize: (uv: unknown) => import("./CBR").CBR_Val;
        munge: (bv: import("./CBR").CBR_Val) => T_2;
        unmunge: (nv: T_2) => import("./CBR").CBR_Val;
        paramType: string;
    }, size: number) => {
        name: string;
        defaultValue: import("./CBR").CBR_Array;
        canonicalize: (uv: unknown) => import("./CBR").CBR_Array;
        munge: (bv: import("./CBR").CBR_Array) => T_2[];
        unmunge: (nv: T_2[]) => import("./CBR").CBR_Array;
        paramType: string;
    };
    T_Tuple: <T_3>(ctcs: {
        name: string;
        defaultValue: import("./CBR").CBR_Val;
        canonicalize: (uv: unknown) => import("./CBR").CBR_Val;
        munge: (bv: import("./CBR").CBR_Val) => T_3;
        unmunge: (nv: T_3) => import("./CBR").CBR_Val;
        paramType: string;
    }[]) => {
        name: string;
        defaultValue: import("./CBR").CBR_Tuple;
        canonicalize: (uv: unknown) => import("./CBR").CBR_Tuple;
        munge: (bv: import("./CBR").CBR_Tuple) => T_3[];
        unmunge: (nv: T_3[]) => import("./CBR").CBR_Tuple;
        paramType: string;
    };
};
export declare const stdlib: {
    addressEq: (x: any, y: any) => boolean;
    digest: (t: any, v: any) => string;
    UInt_max: import("ethers").BigNumber;
    T_Null: {
        name: string;
        defaultValue: null;
        canonicalize: (uv: unknown) => null;
        munge: (bv: null) => false;
        unmunge: (nv: false) => null;
        paramType: string;
    };
    T_Bool: {
        name: string;
        defaultValue: boolean;
        canonicalize: (uv: unknown) => boolean;
        munge: (bv: boolean) => boolean;
        unmunge: (nv: boolean) => boolean;
        paramType: string;
    };
    T_UInt: {
        name: string;
        defaultValue: import("ethers").BigNumber;
        canonicalize: (uv: unknown) => import("ethers").BigNumber;
        munge: (bv: import("ethers").BigNumber) => import("ethers").BigNumber;
        unmunge: (nv: import("ethers").BigNumber) => import("ethers").BigNumber;
        paramType: string;
    };
    T_Bytes: (len: number) => {
        name: string;
        defaultValue: string;
        canonicalize: (uv: unknown) => string;
        munge: (bv: string) => number[];
        unmunge: (nv: number[]) => string;
        paramType: string;
    };
    T_Address: {
        name: string;
        defaultValue: string;
        canonicalize: (uv: unknown) => string;
        munge: (bv: string) => string;
        unmunge: (nv: string) => string;
        paramType: string;
    };
    T_Digest: {
        name: string;
        defaultValue: string;
        canonicalize: (uv: unknown) => string;
        munge: (bv: string) => import("ethers").BigNumber;
        unmunge: (nv: import("ethers").BigNumber) => string;
        paramType: string;
    };
    T_Object: <T>(co: {
        [key: string]: {
            name: string;
            defaultValue: import("./CBR").CBR_Val;
            canonicalize: (uv: unknown) => import("./CBR").CBR_Val;
            munge: (bv: import("./CBR").CBR_Val) => T;
            unmunge: (nv: T) => import("./CBR").CBR_Val;
            paramType: string;
        };
    }) => {
        name: string;
        defaultValue: import("./CBR").CBR_Object;
        canonicalize: (uv: unknown) => import("./CBR").CBR_Object;
        munge: (bv: import("./CBR").CBR_Object) => {
            [key: string]: T;
        };
        unmunge: (nv: {
            [key: string]: T;
        }) => import("./CBR").CBR_Object;
        paramType: string;
    };
    T_Data: <T_1>(co: {
        [key: string]: {
            name: string;
            defaultValue: import("./CBR").CBR_Val;
            canonicalize: (uv: unknown) => import("./CBR").CBR_Val;
            munge: (bv: import("./CBR").CBR_Val) => T_1;
            unmunge: (nv: T_1) => import("./CBR").CBR_Val;
            paramType: string;
        };
    }) => {
        name: string;
        defaultValue: import("./CBR").CBR_Data;
        canonicalize: (uv: unknown) => import("./CBR").CBR_Data;
        munge: (bv: import("./CBR").CBR_Data) => T_1[];
        unmunge: (nv: T_1[]) => import("./CBR").CBR_Data;
        paramType: string;
    };
    T_Array: <T_2>(ctc: {
        name: string;
        defaultValue: import("./CBR").CBR_Val;
        canonicalize: (uv: unknown) => import("./CBR").CBR_Val;
        munge: (bv: import("./CBR").CBR_Val) => T_2;
        unmunge: (nv: T_2) => import("./CBR").CBR_Val;
        paramType: string;
    }, size: number) => {
        name: string;
        defaultValue: import("./CBR").CBR_Array;
        canonicalize: (uv: unknown) => import("./CBR").CBR_Array;
        munge: (bv: import("./CBR").CBR_Array) => T_2[];
        unmunge: (nv: T_2[]) => import("./CBR").CBR_Array;
        paramType: string;
    };
    T_Tuple: <T_3>(ctcs: {
        name: string;
        defaultValue: import("./CBR").CBR_Val;
        canonicalize: (uv: unknown) => import("./CBR").CBR_Val;
        munge: (bv: import("./CBR").CBR_Val) => T_3;
        unmunge: (nv: T_3) => import("./CBR").CBR_Val;
        paramType: string;
    }[]) => {
        name: string;
        defaultValue: import("./CBR").CBR_Tuple;
        canonicalize: (uv: unknown) => import("./CBR").CBR_Tuple;
        munge: (bv: import("./CBR").CBR_Tuple) => T_3[];
        unmunge: (nv: T_3[]) => import("./CBR").CBR_Tuple;
        paramType: string;
    };
    protect(ctc: shared.AnyBackendTy, v: unknown, ai?: unknown): any;
    Array_set<T_4>(arr: T_4[], idx: number, elem: T_4): T_4[];
    setDEBUG: (b: boolean) => void;
    getDEBUG: () => boolean;
    debug: (msg: any) => void;
    assert: (d: any, ai?: any) => void;
    isBigNumber: typeof import("ethers").BigNumber.isBigNumber;
    bigNumberify: (x: any) => import("ethers").BigNumber;
    checkedBigNumberify: (at: string, m: import("ethers").BigNumber, x: any) => import("ethers").BigNumber;
    isHex: typeof import("@ethersproject/bytes").isHexString;
    hexToString: typeof import("@ethersproject/strings").toUtf8String;
    stringToHex: (x: string) => string;
    makeDigest: (prep: any) => (t: any, v: any) => string;
    hexToBigNumber: (h: string) => import("ethers").BigNumber;
    uintToBytes: (i: import("ethers").BigNumber) => string;
    bigNumberToHex: (u: number | import("ethers").BigNumber, size?: number) => string;
    bytesEq: (x: any, y: any) => boolean;
    digestEq: (x: any, y: any) => boolean;
    makeRandom: (width: number) => {
        randomUInt: () => import("ethers").BigNumber;
        hasRandom: {
            random: () => import("ethers").BigNumber;
        };
    };
    eq: (a: number | import("ethers").BigNumber, b: number | import("ethers").BigNumber) => boolean;
    add: (a: number | import("ethers").BigNumber, b: number | import("ethers").BigNumber) => import("ethers").BigNumber;
    sub: (a: number | import("ethers").BigNumber, b: number | import("ethers").BigNumber) => import("ethers").BigNumber;
    mod: (a: number | import("ethers").BigNumber, b: number | import("ethers").BigNumber) => import("ethers").BigNumber;
    mul: (a: number | import("ethers").BigNumber, b: number | import("ethers").BigNumber) => import("ethers").BigNumber;
    div: (a: number | import("ethers").BigNumber, b: number | import("ethers").BigNumber) => import("ethers").BigNumber;
    ge: (a: number | import("ethers").BigNumber, b: number | import("ethers").BigNumber) => boolean;
    gt: (a: number | import("ethers").BigNumber, b: number | import("ethers").BigNumber) => boolean;
    le: (a: number | import("ethers").BigNumber, b: number | import("ethers").BigNumber) => boolean;
    lt: (a: number | import("ethers").BigNumber, b: number | import("ethers").BigNumber) => boolean;
    argsSlice: <T_5>(args: T_5[], cnt: number) => T_5[];
    argsSplit: <T_6>(args: T_6[], cnt: number) => [T_6[], T_6[]];
    Array_zip: <X, Y>(x: X[], y: Y[]) => [X, Y][];
    mkAddressEq: (T_Address: {
        canonicalize: (addr: any) => any;
    }) => (x: any, y: any) => boolean;
    parseFixedPoint: (x: {
        sign: boolean;
        i: {
            i: number | import("ethers").BigNumber;
            scale: number | import("ethers").BigNumber;
        };
    }) => number;
    parseInt: (x: {
        sign: boolean;
        i: number | import("ethers").BigNumber;
    }) => number;
};
//# sourceMappingURL=FAKE_compiled.d.ts.map