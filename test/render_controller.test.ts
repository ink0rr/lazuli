import { createRenderController, lazuli } from "../mod.ts";

Deno.test("Render Controller", async () => {
  const renderController = createRenderController("test.render_controller", {
    format_version: "1.8.0",
    render_controllers: {
      "controller.render.test": {
        materials: [
          {
            "*": "Material.default",
          },
        ],
        geometry: "Geometry.default",
        textures: ["Texture.default"],
      },
    },
  });
  await lazuli([renderController]);
});
