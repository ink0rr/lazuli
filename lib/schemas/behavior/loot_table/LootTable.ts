import { LootTablePool } from "./types/LootTablePool.ts";

export interface LootTable {
  /**
   * Lists the loot pools for this loot table.
   */
  pools: LootTablePool[];
}
