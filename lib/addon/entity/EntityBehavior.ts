import { Identifier } from "../../core/Identifier.ts";
import { EntityBehavior } from "../../schemas/mod.ts";
import { AddonFile } from "../AddonFile.ts";

interface Props {
  alias?: string;
  rideHint?: string | boolean;
}

export function createEntityBehavior(
  filePath: string,
  data: EntityBehavior,
  props?: Props,
) {
  return new AddonFile({
    pack: "BP",
    dir: "entities",
    filePath,
    data,
    preWrite(project) {
      const { identifier, is_spawnable } = data["minecraft:entity"].description;
      const id = new Identifier(identifier);

      if (id.namespace !== "minecraft") {
        const { alias, rideHint } = props ?? {};

        project.lang.setEntity(id, alias);
        if (is_spawnable) {
          project.lang.setSpawnEgg(id, alias);
        }
        if (rideHint) {
          project.lang.setRideHint(id, rideHint);
        }
      }
    },
  });
}
