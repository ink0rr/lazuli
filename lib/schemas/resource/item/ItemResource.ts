import { ItemResourceComponents } from "./types/ItemResourceComponents.ts";

export interface ItemResource {
  format_version: "1.10.0";
  "minecraft:item": {
    description: {
      identifier: string;
      category?: "construction" | "equipment" | "items" | "nature";
      is_experimental?: boolean;
    };
    components: ItemResourceComponents;
  };
}
