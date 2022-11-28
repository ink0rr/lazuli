import { Entity } from "../../../schemas/behavior/entity/mod.ts";

export function BPEntityBuilder(identifier: string) {
  const data: Entity = {
    format_version: "1.16.0",
    "minecraft:entity": {
      description: {
        identifier,
        is_spawnable: true,
        is_summonable: true,
        is_experimental: false,
      },
      components: {},
    },
  };
  return {
    ...data["minecraft:entity"],
    override(data: Entity) {
      Object.assign(this, data["minecraft:entity"]);
    },
    build() {
      Object.assign(data["minecraft:entity"], this);
      return data;
    },
  };
}
