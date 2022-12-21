import { createItemBehavior, createItemResource, lazuli } from "../mod.ts";

Deno.test("Item Behavior", async () => {
  const item = createItemBehavior("test_item", {
    format_version: "1.10.0",
    "minecraft:item": {
      description: {
        identifier: "lazuli:test_item",
      },
      components: {},
    },
  });
  await lazuli([item]);
});

Deno.test("Item Resource", async () => {
  const item = createItemResource("test_item", {
    format_version: "1.10.0",
    "minecraft:item": {
      description: {
        identifier: "lazuli:test_item",
      },
      components: {
        "minecraft:icon": "test_item",
      },
    },
  });
  await lazuli([item]);
});
