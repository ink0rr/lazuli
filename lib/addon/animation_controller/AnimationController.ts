import { AnimationController } from "../../schemas/mod.ts";
import { AddonFile } from "../AddonFile.ts";

export function createAnimationController(
  filePath: string,
  data: AnimationController,
) {
  return new AddonFile({
    pack: "BP",
    dir: "animation_controllers",
    filePath,
    data,
  });
}
