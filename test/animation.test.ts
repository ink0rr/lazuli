import { createAnimation, lazuli } from "../mod.ts";

Deno.test("Animation", async () => {
  const animation = createAnimation("test.animation", {
    format_version: "1.10.0",
    animations: {
      "animation.lazuli.test": {
        timeline: {
          0: ["/say Hello World!"],
        },
      },
    },
  });
  await lazuli([animation]);
});
