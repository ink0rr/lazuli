import { Identifier } from "../../core/Identifier.ts";
import { EntityBehavior, EntityResource } from "../../schemas/mod.ts";
import { createEntityBehavior } from "./EntityBehavior.ts";
import { createEntityResource } from "./EntityResource.ts";

interface Props {
  dir?: string;
  identifier: string;
  alias?: string;
  rideHint?: string;
  behavior?(entity: EntityBehavior): EntityBehavior;
  resource?(entity: EntityResource): EntityResource;
}

export function createEntity(props: Props) {
  const { dir, identifier, alias, rideHint, behavior, resource } = props;
  const id = new Identifier(identifier);
  const path = id.toFilePath(dir);

  const bp = behavior?.({
    format_version: "1.19.50",
    "minecraft:entity": {
      description: {
        identifier,
        is_spawnable: true,
        is_summonable: true,
        is_experimental: false,
      },
      components: {},
    },
  });

  const rp = resource?.({
    format_version: "1.10.0",
    "minecraft:client_entity": {
      description: {
        identifier,
        materials: {
          default: "entity_alphatest",
        },
        textures: {
          default: `textures/entity/${path}`,
        },
        geometry: {
          default: `geometry.${id.name}`,
        },
        render_controllers: [
          "controller.render.default",
        ],
      },
    },
  });

  return [
    bp && createEntityBehavior(path, bp, { alias, rideHint }),
    rp && createEntityResource(path, rp),
  ];
}
