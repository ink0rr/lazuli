import { Identifier } from "../../core/Identifier.ts";
import { BlockBehavior, BlockResource } from "../../schemas/mod.ts";
import { createBlockBehavior } from "./BlockBehavior.ts";
import { createBlockResource } from "./BlockResource.ts";

interface Props {
  dir?: string;
  identifier: string;
  alias?: string;
  behavior?(block: BlockBehavior): BlockBehavior;
  resource?(block: BlockResource): BlockResource;
}

export function createBlock(props: Props) {
  const { dir, identifier, alias, behavior, resource } = props;
  const id = new Identifier(identifier);
  const path = id.toFilePath(dir);

  const bp = behavior?.({
    format_version: "1.12.0",
    "minecraft:block": {
      description: {
        identifier,
        register_to_creative_menu: true,
      },
      components: {},
    },
  });

  const rp = resource?.({
    textures: id.name,
  });

  return [
    bp && createBlockBehavior(path, bp, { alias }),
    rp && createBlockResource(identifier, rp),
  ];
}
