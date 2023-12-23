import { Range } from "../../common/Range.ts";

interface SetCount {
  function: "set_count";
  count: number | Range;
}

interface SetDamage {
  function: "set_damage";
  damage: number | Range;
}

interface SetData {
  function: "set_data";
  data: number | Range;
}

interface SetLore {
  function: "set_lore";
  lore: string[];
}

interface SetName {
  function: "set_name";
  name: string;
}

export type LootTableFunction =
  | SetCount
  | SetDamage
  | SetData
  | SetLore
  | SetName;
