import { Project } from "../../core/Project.ts";
import { startCase } from "../../utils/startCase.ts";
import { IdentifierAddonFile } from "../AddonFile.ts";
import { EntityBehavior } from "./EntityBehavior.ts";
import { EntityResource } from "./EntityResource.ts";

export class Entity extends IdentifierAddonFile {
  #behavior: EntityBehavior;
  #resource: EntityResource;

  alias: string;
  spawnEgg: string;
  rideHint?: string;
  constructor(identifier: string, dir?: string) {
    super(identifier, dir);
    this.#behavior = new EntityBehavior(identifier, dir);
    this.#resource = new EntityResource(identifier, dir);

    this.alias = startCase(this.id);
    this.spawnEgg = `Spawn ${this.alias}`;
  }

  saveTo(project: Project) {
    project.onSave(({ itemTextures, lang }) => {
      if (this.namespace === "minecraft") {
        return;
      }

      const identifier = this.identifier;
      lang.setEntity(identifier, this.alias);

      if (this.behavior.isSpawnable) {
        lang.setSpawnEgg(identifier, this.spawnEgg);

        const spawnEggTexture = this.resource.getSpawnEgg()?.texture;
        if (spawnEggTexture === identifier && !itemTextures.has(identifier)) {
          itemTextures.set(identifier, `textures/items/spawn_egg/${this.fileName}`);
        }
      }

      if (this.rideHint) {
        lang.setRideHint(identifier, this.rideHint);
      }
    });
  }

  set fileName(value: string) {
    this.#behavior.fileName = value;
    this.#resource.fileName = value;
  }

  get behavior() {
    return this.#behavior;
  }

  get resource() {
    return this.#resource;
  }
}
