import { ItemIdentifier } from "../../../common/ItemIdentifier.ts";
import { LootTableFunction } from "./LootTableFunction.ts";

interface EmptyEntry {
  type: "empty";
  weight?: number;
}

interface ItemEntry {
  type: "item";
  /**
   * Item identifier
   */
  name: ItemIdentifier;
  weight?: number;
  functions?: LootTableFunction[];
}

interface LootEntry {
  type: "loot_table";
  /**
   * Path to a loot table file
   */
  name: string;
  weight?: number;
}

export type LootTableEntry = EmptyEntry | ItemEntry | LootEntry;
