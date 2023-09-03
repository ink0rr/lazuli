export type LiteralUnion<T extends string, U = string> =
  | T
  | (U & Record<never, never>);
