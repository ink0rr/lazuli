import { Project } from "../../core/Project.ts";
import { AddonFile } from "../AddonFile.ts";
import { LootTablePool } from "./types/LootTablePool.ts";

export class LootTable extends AddonFile {
  #data: LootTableSchema;
  constructor(fileName: string) {
    super(fileName);
    this.#data = {
      pools: [],
    };
  }

  saveTo(project: Project) {
    project.onSave(({ writeBP }) => {
      writeBP(`loot_tables/${this.fileName}.json`, this.#data);
    });
  }

  get pools() {
    return this.#data.pools;
  }

  set pools(value) {
    this.#data.pools = value;
  }
}

export interface LootTableSchema {
  /**
   * Lists the loot pools for this loot table.
   */
  pools: LootTablePool[];
}
