import { Identifier } from "../../core/Identifier.ts";
import { Project } from "../../core/Project.ts";
import { Block } from "../../schemas/behavior/block/mod.ts";
import { BehaviorFile } from "../AddonFile.ts";

interface Props {
  alias?: string;
}

export class BlockBehavior extends BehaviorFile<Block, Props> {
  dir = "blocks";

  get #description() {
    return this.data["minecraft:block"].description;
  }

  write(project: Project): void {
    super.write(project);

    const { alias } = this.props ?? {};
    const { identifier } = this.#description;
    const id = new Identifier(identifier);

    project.lang.setBlock(id, alias);
  }
}
