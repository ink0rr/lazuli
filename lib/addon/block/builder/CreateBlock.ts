import { Identifier } from "../../../core/Identifier.ts";
import { BlockBehavior } from "../BlockBehavior.ts";
import { BlockResource } from "../BlockResource.ts";
import { BPBlockBuilder } from "./BPBlockBuilder.ts";
import { RPBlockBuilder } from "./RPBlockBuilder.ts";

export interface CreateBlock {
  identifier: string;
  dir?: string;
  alias?: string;
  behavior?(bp: ReturnType<typeof BPBlockBuilder>): void;
  resource?(rp: ReturnType<typeof RPBlockBuilder>): void;
}

export function createBlock(
  { identifier, dir, alias, behavior, resource }: CreateBlock,
): [BlockBehavior, BlockResource] {
  const id = new Identifier(identifier);
  const path = id.toFilePath(dir);

  const bpJson = BPBlockBuilder(identifier);
  behavior?.(bpJson);

  const rpJson = RPBlockBuilder(id.name);
  resource?.(rpJson);

  return [
    new BlockBehavior(path, bpJson.build(), { alias }),
    new BlockResource(id, rpJson.build()),
  ];
}
