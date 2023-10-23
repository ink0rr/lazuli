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
    const id = this.identifier;
    this.#behavior = new EntityBehavior(identifier, dir);
    this.#resource = new EntityResource(identifier, dir);

    this.alias = startCase(id.name);
    this.spawnEgg = `Spawn ${this.alias}`;
    Project.onSave(() => {
      if (id.namespace !== "minecraft") {
        const { alias, spawnEgg, rideHint } = this;
        Project.lang.setEntity(id, alias);

        if (this.behavior.isSpawnable) {
          Project.lang.setSpawnEgg(id, spawnEgg);
        }
        if (this.resource.getSpawnEgg()?.texture === id.name) {
          Project.setItemTexture(id.name, `spawn_egg/${this.fileName}`);
        }
        if (rideHint) {
          Project.lang.setRideHint(id, rideHint);
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
