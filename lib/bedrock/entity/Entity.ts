import { Project } from "../../core/Project.ts";
import { IdentifierAddonFile } from "../AddonFile.ts";
import { EntityBehavior } from "./EntityBehavior.ts";
import { EntityResource } from "./EntityResource.ts";

type HideProps = "identifier" | "fileName";

export class Entity extends IdentifierAddonFile {
  #behavior: EntityBehavior;
  #resource: EntityResource;

  alias?: string;
  rideHint?: string | true;
  constructor(identifier: string, dir?: string) {
    super(identifier, dir);
    this.#behavior = new EntityBehavior(identifier, dir);
    this.#resource = new EntityResource(identifier, dir);

    Project.onSave(() => {
      const id = this.identifier;
      if (id.namespace !== "minecraft") {
        const { alias, rideHint } = this;
        Project.lang.setEntity(id, alias);

        if (rideHint) {
          Project.lang.setRideHint(id, rideHint);
        }
        if (this.behavior.isSpawnable) {
          Project.lang.setSpawnEgg(id, alias);
        }
        if (this.resource.getSpawnEgg()?.texture === id.name) {
          Project.setItemTexture(id.name, `spawn_egg/${this.fileName}`);
        }
      }
    });
  }

  set fileName(value: string) {
    this.#behavior.fileName = value;
    this.#resource.fileName = value;
  }

  get behavior(): Omit<EntityBehavior, HideProps> {
    return this.#behavior;
  }

  get resource(): Omit<EntityResource, HideProps> {
    return this.#resource;
  }
}
