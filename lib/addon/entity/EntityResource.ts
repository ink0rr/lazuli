import { Identifier } from "../../core/Identifier.ts";
import { Project } from "../../core/Project.ts";
import { Schema } from "../../schemas/mod.ts";
import { ResourceFile } from "../AddonFile.ts";

export class EntityResource extends ResourceFile<Schema.EntityResource> {
  dir = "entity";

  get #description() {
    return this.data["minecraft:client_entity"].description;
  }

  write(project: Project) {
    const { identifier, spawn_egg } = this.#description;
    const id = new Identifier(identifier);

    if (id.namespace !== "minecraft") {
      const { filePath } = this;
      const name = id.name;

      if (spawn_egg?.texture === name) {
        project.addItemTexture(name, `spawn_egg/${filePath}`);
      }
    }
    return super.write(project);
  }
}
