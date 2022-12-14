import { Schema } from "../../schemas/mod.ts";
import { BehaviorFile } from "../AddonFile.ts";

export class LootTable extends BehaviorFile<Schema.LootTable> {
  dir = "loot_tables";
}
