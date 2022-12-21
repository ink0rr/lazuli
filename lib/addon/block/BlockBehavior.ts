import { Identifier } from "../../core/Identifier.ts";
import { BlockBehavior } from "../../schemas/mod.ts";
import { AddonFile } from "../AddonFile.ts";

interface Props {
  alias?: string;
}

export function createBlockBehavior(
  filePath: string,
  data: BlockBehavior,
  props?: Props,
) {
  const description = data["minecraft:block"].description;
  return new AddonFile({
    pack: "BP",
    dir: "blocks",
    filePath,
    data,
    preWrite(project) {
      const id = new Identifier(description.identifier);

      if (id.namespace !== "minecraft") {
        project.lang.setBlock(id, props?.alias);
      }
    },
  });
}
