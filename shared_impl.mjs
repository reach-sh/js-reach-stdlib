// Shared code with stuff that is not exported to the user
/**
 * @description Create a getter/setter, where the getter defaults to memoizing a thunk
 */
export function replaceableThunk(thunk) {
  let called = false;
  let res = null;

  function get() {
    if (!called) {
      called = true;
      res = thunk();
    }
    return res;
  }

  function set(val) {
    if (called) {
      throw Error(`Cannot re-set value once already set`);
    }
    res = val;
    called = true;
  }
  return [get, set];
}
/**
 * @description Only perform side effects from thunk on the first call.
 */
export function memoizeThunk(thunk) {
  return replaceableThunk(thunk)[0];
}
/**
 * @description ascLabels[i] = label; labelMap[label] = i;
 */
export const labelMaps = (co) => {
  const ascLabels = Object.keys(co).sort();
  const labelMap = {};
  for (const i in ascLabels) {
    labelMap[ascLabels[i]] = parseInt(i);
  }
  return { ascLabels, labelMap };
};
