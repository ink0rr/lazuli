import { Identifier } from "../../core/Identifier.ts";
import { Project } from "../../core/Project.ts";
import { ItemResource } from "../../schemas/mod.ts";
import { AddonFile } from "../AddonFile.ts";

export function createItemResource(
  filePath: string,
  data: ItemResource,
) {
  return new AddonFile({
    pack: "RP",
    dir: "items",
    filePath,
    data,
    preWrite(project: Project) {
      const item = data["minecraft:item"];
      const { identifier } = item.description;
      const id = new Identifier(identifier);

      if (id.namespace !== "minecraft") {
        const name = id.name;

        if (item.components?.["minecraft:icon"] === name) {
          project.addItemTexture(name, filePath);
        }
      }
    },
  });
}
