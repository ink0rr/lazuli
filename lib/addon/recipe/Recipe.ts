import { Recipe } from "../../schemas/mod.ts";
import { AddonFile } from "../AddonFile.ts";

export function createRecipe(filePath: string, data: Recipe) {
  return new AddonFile({
    pack: "BP",
    dir: "recipes",
    filePath,
    data,
  });
}
