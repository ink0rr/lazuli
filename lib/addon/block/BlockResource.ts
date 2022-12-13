import { Identifier } from "../../core/Identifier.ts";
import { Project } from "../../core/Project.ts";
import { Schema } from "../../schemas/mod.ts";
import { ResourceFile } from "../AddonFile.ts";

export class BlockResource extends ResourceFile<Schema.BlockResource> {
  dir = ".";

  constructor(public identifier: Identifier, data: Schema.BlockResource) {
    super("blocks", data);
  }

  /**
   * Skips the normal write method, blocks.json will be written through the project.sync() method.
   */
  write(project: Project): void {
    const { identifier, data } = this;
    project.blocks[identifier.toString()] ??= data;

    const name = this.identifier.name;
    if (data.textures === name) {
      project.addTerrainTexture(name, name);
    }
  }
}
