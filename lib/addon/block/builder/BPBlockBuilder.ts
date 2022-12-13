import { Schema } from "../../../schemas/mod.ts";

export function BPBlockBuilder(identifier: string) {
  const data: Schema.BlockBehavior = {
    format_version: "1.12.0",
    "minecraft:block": {
      description: {
        identifier,
        register_to_creative_menu: true,
        is_experimental: false,
      },
      components: {},
    },
  };
  return {
    ...data["minecraft:block"],
    override(data: Schema.BlockBehavior) {
      Object.assign(this, data["minecraft:block"]);
    },
    build() {
      Object.assign(data["minecraft:block"], this);
      return data;
    },
  };
}
