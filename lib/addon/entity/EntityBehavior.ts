import { Identifier } from "../../core/Identifier.ts";
import { Project } from "../../core/Project.ts";
import { Schema } from "../../schemas/mod.ts";
import { BehaviorFile } from "../AddonFile.ts";

interface Props {
  alias?: string;
  rideHint?: string | boolean;
}

export class EntityBehavior extends BehaviorFile<Schema.EntityBehavior, Props> {
  dir = "entities";

  get #description() {
    return this.data["minecraft:entity"].description;
  }

  write(project: Project) {
    const { identifier, is_spawnable } = this.#description;
    const id = new Identifier(identifier);

    if (id.namespace !== "minecraft") {
      const { alias, rideHint } = this.props ?? {};

      project.lang.setEntity(id, alias);
      if (is_spawnable) {
        project.lang.setSpawnEgg(id, alias);
      }
      if (rideHint) {
        project.lang.setRideHint(id, rideHint);
      }
    }
    return super.write(project);
  }
}
