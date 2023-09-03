import { LootTableEntry } from "./LootTableEntry.ts";

export interface LootTablePool {
  /**
   * Determines how many items will be selected.
   */
  rolls?: number;
  /**
   * Lists the entries of the loot table to be chosen from.
   */
  entries?: LootTableEntry[];
}
