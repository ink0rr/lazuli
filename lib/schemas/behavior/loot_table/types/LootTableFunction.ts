import { Range } from "../../../common/Range.ts";

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

export type LootTableFunction = SetCount | SetDamage | SetData;
