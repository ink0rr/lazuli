import { Attachable } from "../../schemas/mod.ts";
import { AddonFile } from "../AddonFile.ts";

export function createAttachable(filePath: string, data: Attachable) {
  return new AddonFile({
    pack: "RP",
    dir: "attachables",
    filePath,
    data,
  });
}
