import { Identifier } from "../../core/Identifier.ts";
import { Project } from "../../core/Project.ts";
import { Schema } from "../../schemas/mod.ts";
import { ResourceFile } from "../AddonFile.ts";

export class ItemResource extends ResourceFile<Schema.ItemResource> {
  dir = "items";

  get #description() {
    return this.data["minecraft:item"].description;
  }

  get #components() {
    return this.data["minecraft:item"].components;
  }

  write(project: Project) {
    const { identifier } = this.#description;
    const id = new Identifier(identifier);

    if (id.namespace !== "minecraft") {
      const { filePath } = this;
      const name = id.name;

      if (this.#components?.["minecraft:icon"] === name) {
        project.addItemTexture(name, filePath);
      }
    }
    return super.write(project);
  }
}
