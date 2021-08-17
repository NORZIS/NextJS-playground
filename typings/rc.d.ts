/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'rc' {
  function rc<T = { [key: string]: any }>(
    name: string,
    defaults?: T,
    argv?: { [key: string]: any } | null,
    parse?: ((content: string) => T) | null
  ): T;

  export default rc;
}
