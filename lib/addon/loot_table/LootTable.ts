import { LootTable } from "../../schemas/mod.ts";
import { AddonFile } from "../AddonFile.ts";

export function createLootTable(filePath: string, data: LootTable) {
  return new AddonFile({
    pack: "BP",
    dir: "loot_tables",
    filePath,
    data,
  });
}
