/**
 * Utility function to create a proxy object that will initialize any missing keys with an empty object.
 *
 * Be warned that this will not work with other types other than objects. So you'll have to be careful
 */
// deno-lint-ignore ban-types
export function useProxy<T extends object>(data: T): Required<T> {
  const proxy = new Proxy(data, {
    get(target, key) {
      // @ts-ignore: key is a string
      return target[key] ??= {};
    },
  });
  return proxy as Required<T>;
}
