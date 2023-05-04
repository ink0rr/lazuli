import { Identifier } from "../../core/Identifier.ts";
import { EntityResource } from "../../schemas/mod.ts";
import { AddonFile } from "../AddonFile.ts";

export function createEntityResource(
  filePath: string,
  data: EntityResource,
) {
  return new AddonFile({
    pack: "RP",
    dir: "entity",
    filePath,
    data,
    preWrite(project) {
      const { identifier, spawn_egg } = data["minecraft:client_entity"].description;
      const id = new Identifier(identifier);

      if (id.namespace !== "minecraft") {
        const name = id.name;

        if (spawn_egg?.texture === name) {
          project.addItemTexture(name, `spawn_egg/${filePath}`);
        }
      }
    },
  });
}
