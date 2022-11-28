import { Block } from "../../../schemas/behavior/block/mod.ts";

export function BPBlockBuilder(identifier: string) {
  const data: Block = {
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
    override(data: Block) {
      Object.assign(this, data["minecraft:block"]);
    },
    build() {
      Object.assign(data["minecraft:block"], this);
      return data;
    },
  };
}
