import { createBlockBehavior, createBlockResource, lazuli } from "../mod.ts";

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
