import { Animation } from "../../schemas/mod.ts";
import { AddonFile } from "../AddonFile.ts";

export function createAnimation(filePath: string, data: Animation) {
  return new AddonFile({
    pack: "BP",
    dir: "animations",
    filePath,
    data,
  });
}
