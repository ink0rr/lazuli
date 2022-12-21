import { RenderController } from "../../schemas/mod.ts";
import { AddonFile } from "../AddonFile.ts";

export function createRenderController(
  filePath: string,
  data: RenderController,
) {
  return new AddonFile({
    pack: "RP",
    dir: "render_controllers",
    filePath,
    data,
  });
}
