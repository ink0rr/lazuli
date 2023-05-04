import { BlockResource } from "../schemas/mod.ts";

export type Blocks = {
  format_version: [number, number, number];
} | Record<string, BlockResource>;
