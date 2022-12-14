import { Identifier } from "../../core/Identifier.ts";
import { Project } from "../../core/Project.ts";
import { Schema } from "../../schemas/mod.ts";
import { BehaviorFile } from "../AddonFile.ts";

interface Props {
  alias?: string;
}

export class ItemBehavior extends BehaviorFile<Schema.ItemBehavior, Props> {
  dir = "items";

  get #description() {
    return this.data["minecraft:item"].description;
  }

  write(project: Project) {
    const { identifier } = this.#description;
    const id = new Identifier(identifier);

    if (id.namespace !== "minecraft") {
      const { alias } = this.props ?? {};

      project.lang.setItem(id, alias);
    }
    return super.write(project);
  }
}
