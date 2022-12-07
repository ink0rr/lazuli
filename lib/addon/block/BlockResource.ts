import { Identifier } from "../../core/Identifier.ts";
import { Project } from "../../core/Project.ts";
import { Block } from "../../schemas/resource/block/mod.ts";
import { ResourceFile } from "../AddonFile.ts";

export class BlockResource extends ResourceFile<Block> {
  dir = ".";

  constructor(public identifier: Identifier, data: Block) {
    super("blocks", data);
  }

  /**
   * Bypass the normal write method, blocks.json will be written through the project.sync() method.
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
