import { createEntity, createEntityBehavior, createEntityResource, lazuli } from "../mod.ts";

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

Deno.test("Entity", async () => {
  const entity = createEntity({
    identifier: "lazuli:my_entity",
    behavior(entity) {
      const bp = entity["minecraft:entity"];
      bp.components = {
        "minecraft:health": {
          value: 20,
          max: 20,
        },
      };
      bp.component_groups = {
        despawn: {
          "minecraft:instant_despawn": {},
        },
      };
      bp.events = {
        despawn: {
          add: {
            component_groups: ["despawn"],
          },
        },
      };
      return entity;
    },
    resource(entity) {
      const rp = entity["minecraft:client_entity"].description;
      rp.textures = {
        default: "textures/blank",
      };
      rp.geometry = {
        default: "geometry.blank",
      };
      return entity;
    },
  });
  await lazuli([entity]);
});
