import { Identifier } from "../../../core/Identifier.ts";
import { EntityBehavior } from "../EntityBehavior.ts";
import { EntityResource } from "../EntityResource.ts";
import { BPEntityBuilder } from "./BPEntityBuilder.ts";
import { RPEntityBuilder } from "./RPEntityBuilder.ts";

export interface CreateEntity {
  identifier: string;
  dir?: string;
  alias?: string;
  behavior?(bp: ReturnType<typeof BPEntityBuilder>): void;
  resource?(rp: ReturnType<typeof RPEntityBuilder>): void;
}

export function createEntity(
  { identifier, dir, alias, behavior, resource }: CreateEntity,
): [EntityBehavior, EntityResource] {
  const id = new Identifier(identifier);
  const path = id.toFilePath(dir);

  const bpJson = BPEntityBuilder(identifier);
  behavior?.(bpJson);

  const rpJson = RPEntityBuilder(identifier, path);
  resource?.(rpJson);

  return [
    new EntityBehavior(path, bpJson.build(), { alias }),
    new EntityResource(path, rpJson.build()),
  ];
}
