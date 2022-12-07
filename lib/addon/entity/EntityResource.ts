import { Identifier } from "../../core/Identifier.ts";
import { Project } from "../../core/Project.ts";
import { Entity } from "../../schemas/resource/entity/mod.ts";
import { ResourceFile } from "../AddonFile.ts";

export class EntityResource extends ResourceFile<Entity> {
  dir = "entity";

  get #description() {
    return this.data["minecraft:client_entity"].description;
  }

  write(project: Project): void {
    super.write(project);

    const { filePath } = this;
    const { identifier, spawn_egg } = this.#description;
    const id = new Identifier(identifier);
    const name = id.name;

    if (spawn_egg?.texture == name) {
      project.addItemTexture(name, `spawn_egg/${filePath}`);
    }
  }
}
