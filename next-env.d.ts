/// <reference types="next" />
/// <reference types="next/types/global" />
declare module 'node-fetch' {
  const fetch: GlobalFetch['fetch'];
  export default fetch;
}
