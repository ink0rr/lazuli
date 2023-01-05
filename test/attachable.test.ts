import { createAttachable, lazuli } from "../mod.ts";

Deno.test("Attachable", async () => {
  const attachable = createAttachable("my_item", {
    format_version: "1.10.0",
    "minecraft:attachable": {
      description: {
        identifier: "lazuli:my_item",
        materials: {
          default: "entity_alphatest",
        },
        textures: {
          default: "textures/items/my_item",
        },
        geometry: {
          default: "geometry.my_item",
        },
        render_controllers: [
          "controller.render.default",
        ],
      },
    },
  });
  await lazuli([attachable]);
});
