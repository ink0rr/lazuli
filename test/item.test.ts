import {
  createItem,
  createItemBehavior,
  createItemResource,
  lazuli,
} from "../mod.ts";

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

Deno.test("Item", async () => {
  const item = createItem({
    identifier: "lazuli:my_item",
    behavior(item) {
      const bp = item["minecraft:item"];
      bp.components = {
        "minecraft:hand_equipped": true,
        "minecraft:max_stack_size": 1,
      };
      return item;
    },
    resource(item) {
      const rp = item["minecraft:item"];
      rp.components = {
        ...rp.components,
        "minecraft:hover_text_color": "yellow",
      };
      return item;
    },
  });
  await lazuli([item]);
});
