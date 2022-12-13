import { BlockComponents } from "./types/BlockComponents.ts";

export interface BlockBehavior {
  format_version: "1.12.0";
  "minecraft:block": {
    description: {
      identifier: string;
      is_experimental?: boolean;
      register_to_creative_menu?: boolean;
    };
    components: BlockComponents;
  };
}
