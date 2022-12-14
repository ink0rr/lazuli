import { Identifier } from "../../core/Identifier.ts";
import { Project } from "../../core/Project.ts";
import { Schema } from "../../schemas/mod.ts";
import { BehaviorFile } from "../AddonFile.ts";

interface Props {
  alias?: string;
}

export class BlockBehavior extends BehaviorFile<Schema.BlockBehavior, Props> {
  dir = "blocks";

  get #description() {
    return this.data["minecraft:block"].description;
  }

  write(project: Project) {
    const id = new Identifier(this.#description.identifier);

    if (id.namespace !== "minecraft") {
      project.lang.setBlock(id, this.props?.alias);
    }
    return super.write(project);
  }
}
