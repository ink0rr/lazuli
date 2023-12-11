import { startCase } from "../../../deps.ts";
import { Project } from "../../core/Project.ts";
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

    this.alias = startCase(this.identifier.name);
    this.spawnEgg = `Spawn ${this.alias}`;
  }

  saveTo(project: Project) {
    project.onSave(({ itemTextures, lang }) => {
      const id = this.identifier;
      if (id.namespace !== "minecraft") {
        const { alias, spawnEgg, rideHint } = this;
        lang.setEntity(id, alias);
        if (this.behavior.isSpawnable) {
          lang.setSpawnEgg(id, spawnEgg);
        }
        if (this.resource.getSpawnEgg()?.texture === id.name && !itemTextures.has(id.name)) {
          itemTextures.set(id.name, `textures/items/spawn_egg/${this.fileName}`);
        }
        if (rideHint) {
          lang.setRideHint(id, rideHint);
        }
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
