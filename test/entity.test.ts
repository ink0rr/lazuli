import { createEntityBehavior, createEntityResource, lazuli } from "../mod.ts";

Deno.test("Entity Behavior", async () => {
  const entity = createEntityBehavior("test_entity", {
    format_version: "1.19.50",
    "minecraft:entity": {
      description: {
        identifier: "lazuli:test_entity",
        is_spawnable: true,
      },
      components: {},
    },
  });
  await lazuli([entity]);
});

Deno.test("Entity Resource", async () => {
  const entity = createEntityResource("test_entity", {
    format_version: "1.10.0",
    "minecraft:client_entity": {
      description: {
        identifier: "lazuli:test_entity",
      },
    },
  });
  await lazuli([entity]);
});
