import { BehaviorFile } from "../../core/AddonFile.ts";
import { Identifier } from "../../core/Identifier.ts";
import { Project } from "../../core/Project.ts";
import { Entity } from "../../schemas/behavior/entity/mod.ts";

interface Props {
  alias?: string;
  rideHint?: string | boolean;
}

export class EntityBehavior extends BehaviorFile<Entity, Props> {
  dir = "entities";

  get #description() {
    return this.data["minecraft:entity"].description;
  }

  write(project: Project): void {
    super.write(project);

    const { alias, rideHint } = this.props ?? {};
    const { identifier, is_spawnable } = this.#description;
    const id = new Identifier(identifier);

    project.lang.setEntity(id, alias);
    if (is_spawnable) {
      project.lang.setSpawnEgg(id, alias);
    }
    if (rideHint) {
      project.lang.setRideHint(id, rideHint);
    }
  }
}
