import { Identifier } from "../../../core/Identifier.ts";
import { Schema } from "../../../schemas/mod.ts";

export function RPEntityBuilder(identifier: string, path: string) {
  const id = new Identifier(identifier);
  const data: Schema.EntityResource = {
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
        render_controllers: ["controller.render.default"],
      },
    },
  };
  return {
    ...data["minecraft:client_entity"].description,
    override(data: Schema.EntityResource) {
      Object.assign(this, data["minecraft:client_entity"].description);
    },
    build() {
      Object.assign(data["minecraft:client_entity"].description, this);
      return data;
    },
  };
}
