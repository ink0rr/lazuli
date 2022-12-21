import { Identifier } from "../../core/Identifier.ts";
import { Project } from "../../core/Project.ts";
import { BlockResource } from "../../schemas/mod.ts";
import { AddonFile } from "../AddonFile.ts";

class BlockResourceFile extends AddonFile {
  constructor(private identifier: string, private data: BlockResource) {
    super({
      pack: "RP",
      dir: ".",
      filePath: "blocks",
      data,
    });
  }

  /**
   * Skips the normal write method, blocks.json will be written through the project.sync() method.
   */
  write(project: Project) {
    const { identifier, data } = this;
    const id = new Identifier(identifier);
    if (id.namespace !== "minecraft") {
      project.blocks[identifier] ??= data;
      const name = id.name;
      if (data.textures === name) {
        project.addTerrainTexture(name, name);
      }
    }
    return Promise.resolve();
  }
}

export function createBlockResource(identifier: string, data: BlockResource) {
  return new BlockResourceFile(identifier, data);
}
