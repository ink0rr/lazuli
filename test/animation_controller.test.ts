import { createAnimationController, lazuli } from "../mod.ts";

Deno.test("Animation Controller", async () => {
  const controller = createAnimationController("test.controller", {
    format_version: "1.10.0",
    animation_controllers: {
      "controller.animation.test": {
        states: {
          default: {
            on_entry: [
              "/say Hello World!",
            ],
          },
        },
      },
    },
  });
  await lazuli([controller]);
});
