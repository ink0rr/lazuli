import { ItemBehaviorComponents } from "./types/ItemBehaviorComponents.ts";

export interface ItemBehavior {
  format_version: "1.10.0";
  "minecraft:item": {
    description: {
      identifier: string;
      is_experimental?: boolean;
    };
    components: ItemBehaviorComponents;
  };
}
