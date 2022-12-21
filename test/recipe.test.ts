import { createRecipe, lazuli } from "../mod.ts";

Deno.test("Recipe", async () => {
  const recipe = createRecipe("test_recipe", {
    format_version: "1.12.0",
    "minecraft:recipe_shaped": {
      description: {
        identifier: "lazuli:test_recipe",
      },
      tags: ["crafting_table"],
      pattern: ["A"],
      key: {
        A: {
          item: "minecraft:apple",
        },
      },
      result: {
        item: "minecraft:apple",
      },
    },
  });
  await lazuli([recipe]);
});
