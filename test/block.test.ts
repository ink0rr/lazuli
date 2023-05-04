import { createBlock, createBlockBehavior, createBlockResource, lazuli } from "../mod.ts";

Deno.test("Block Behavior", async () => {
  const block = createBlockBehavior("test_block", {
    format_version: "1.12.0",
    "minecraft:block": {
      description: {
        identifier: "lazuli:test_block",
      },
      components: {},
    },
  });
  await lazuli([block]);
});

Deno.test("Block Resource", async () => {
  const block = createBlockResource("lazuli:test_block", {
    textures: "test_block",
  });
  await lazuli([block]);
});

Deno.test("Block", async () => {
  const block = createBlock({
    identifier: "lazuli:my_block",
    behavior(block) {
      const bp = block["minecraft:block"];
      bp.components = {
        "minecraft:loot": "loot_tables/blocks/my_block.json",
      };
      return block;
    },
    resource(block) {
      return block;
    },
  });
  await lazuli([block]);
});
