/**
 * @description Create a getter/setter, where the getter defaults to memoizing a thunk
 */
export declare function replaceableThunk<T>(thunk: () => T): [() => T, (val: T) => void];
/**
 * @description Only perform side effects from thunk on the first call.
 */
export declare function memoizeThunk<T>(thunk: () => T): () => T;
/**
 * @description ascLabels[i] = label; labelMap[label] = i;
 */
export declare const labelMaps: (co: {
    [key: string]: unknown;
}) => {
    ascLabels: Array<string>;
    labelMap: {
        [key: string]: number;
    };
};
//# sourceMappingURL=shared_impl.d.ts.map