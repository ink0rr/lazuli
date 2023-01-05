import { _deepMerge } from "../../deps.ts";

export function deepMerge<T>(source: T, others: T): T {
  // @ts-ignore: deepMerge is not generic
  return _deepMerge(source, others);
}
