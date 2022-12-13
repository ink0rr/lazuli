import { Schema } from "../../../schemas/mod.ts";

export function BPEntityBuilder(identifier: string) {
  const data: Schema.EntityBehavior = {
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
  };
  return {
    ...data["minecraft:entity"],
    override(data: Schema.EntityBehavior) {
      Object.assign(this, data["minecraft:entity"]);
    },
    build() {
      Object.assign(data["minecraft:entity"], this);
      return data;
    },
  };
}
