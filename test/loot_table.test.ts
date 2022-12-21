import { createLootTable, lazuli } from "../mod.ts";

Deno.test("Loot Table", async () => {
  const lootTable = createLootTable("test_loot", {
    pools: [
      {
        rolls: 1,
        entries: [
          {
            type: "item",
            name: "minecraft:apple",
          },
        ],
      },
    ],
  });
  await lazuli([lootTable]);
});
