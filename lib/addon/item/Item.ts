import { Identifier } from "../../core/Identifier.ts";
import { ItemBehavior, ItemResource } from "../../schemas/mod.ts";
import { createItemBehavior } from "./ItemBehavior.ts";
import { createItemResource } from "./ItemResource.ts";

interface Props {
  dir?: string;
  identifier: string;
  alias?: string;
  behavior?(item: ItemBehavior): ItemBehavior;
  resource?(item: ItemResource): ItemResource;
}

export function createItem(props: Props) {
  const { dir, identifier, alias, behavior, resource } = props;
  const id = new Identifier(identifier);
  const path = id.toFilePath(dir);

  const bp = behavior?.({
    format_version: "1.10.0",
    "minecraft:item": {
      description: {
        identifier,
      },
      components: {},
    },
  });

  const rp = resource?.({
    format_version: "1.10.0",
    "minecraft:item": {
      description: {
        identifier,
        category: "items",
      },
      components: {
        "minecraft:icon": id.name,
      },
    },
  });

  return [
    bp && createItemBehavior(path, bp, { alias }),
    rp && createItemResource(path, rp),
  ];
}
