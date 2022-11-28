import { Components } from "./types/Components.ts";

export interface Block {
  format_version: "1.12.0";
  "minecraft:block": {
    description: {
      identifier: string;
      is_experimental?: boolean;
      register_to_creative_menu?: boolean;
    };
    components: Components;
  };
}
