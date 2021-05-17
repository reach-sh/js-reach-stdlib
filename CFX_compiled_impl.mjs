import * as eci from './ETH_compiled_impl.mjs';
export const T_Address = {
  ...eci.T_Address,
  canonicalize: (uv) => uv,
  defaultValue: 'XXX',
  munge: (bv) => bv,
  unmunge: (nv) => T_Address.canonicalize(nv),
};
