import { Identifier } from "../../core/Identifier.ts";
import { Project } from "../../core/Project.ts";
import { ItemBehavior } from "../../schemas/mod.ts";
import { AddonFile } from "../AddonFile.ts";

interface Props {
  alias?: string;
}

export function createItemBehavior(
  filePath: string,
  data: ItemBehavior,
  props?: Props,
) {
  return new AddonFile({
    pack: "BP",
    dir: "items",
    filePath,
    data,
    preWrite(project: Project) {
      const { identifier } = data["minecraft:item"].description;
      const id = new Identifier(identifier);

      if (id.namespace !== "minecraft") {
        const alias = props?.alias;
        project.lang.setItem(id, alias);
      }
    },
  });
}
