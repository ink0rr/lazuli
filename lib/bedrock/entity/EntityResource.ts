import { Project } from "../../core/Project.ts";
import { addAnimation } from "../../utils/addAnimation.ts";
import { IdentifierAddonFile } from "../AddonFile.ts";
import { StringOrRecord } from "../common/StringOrRecord.ts";

export class EntityResource extends IdentifierAddonFile {
  #data: EntityResourceSchema;
  constructor(identifier: string, dir?: string) {
    super(identifier, dir);
    const id = this.identifier;
    this.#data = {
      format_version: "1.10.0",
      "minecraft:client_entity": {
        description: {
          identifier,
          materials: {
            default: "entity_alphatest",
          },
          textures: {
            default: `textures/entity/${this.fileName}`,
          },
          geometry: {
            default: `geometry.${id.name}`,
          },
          render_controllers: [
            "controller.render.default",
          ],
        },
      },
    };

    Project.onSave(({ writeRP }) => {
      writeRP(`entity/${this.fileName}.json`, this.#data);
    });
  }

  get #entity() {
    return this.#data["minecraft:client_entity"].description;
  }

  get formatVersion() {
    return this.#data.format_version;
  }

  set formatVersion(value) {
    this.#data.format_version = value;
  }

  materials(materials: Record<string, string>) {
    Object.assign(this.#entity.materials ??= {}, materials);
  }

  textures(textures: Record<string, string>) {
    Object.assign(this.#entity.textures ??= {}, textures);
  }

  geometry(geometry: Record<string, string>) {
    Object.assign(this.#entity.geometry ??= {}, geometry);
  }

  get scripts() {
    return this.#entity.scripts;
  }

  set scripts(value) {
    this.#entity.scripts = value;
  }

  addAnimation(key: string, animation: string, condition?: string | true) {
    addAnimation(this.#entity, key, animation, condition);
  }

  particleEffects(particleEffects: Record<string, string>) {
    Object.assign(this.#entity.particle_effects ??= {}, particleEffects);
  }

  particleEmitters(particleEmitters: Record<string, string>) {
    Object.assign(this.#entity.particle_emitters ??= {}, particleEmitters);
  }

  soundEffects(soundEffects: Record<string, string>) {
    Object.assign(this.#entity.sound_effects ??= {}, soundEffects);
  }

  get spawnEgg() {
    return this.#entity.spawn_egg;
  }

  set spawnEgg(value) {
    this.#entity.spawn_egg = value;
  }

  get renderControllers() {
    return this.#entity.render_controllers;
  }

  set renderControllers(value) {
    this.#entity.render_controllers = value;
  }

  get enableAttachables() {
    return this.#entity.enable_attachables;
  }

  set enableAttachables(value) {
    this.#entity.enable_attachables = value;
  }

  get hideArmor() {
    return this.#entity.hide_armor;
  }

  set hideArmor(value) {
    this.#entity.hide_armor = value;
  }

  /**
   * Create from object data
   */
  // deno-lint-ignore no-explicit-any
  static from(data: any) {
    const identifier = data?.["minecraft:client_entity"]?.description?.identifier;
    if (typeof identifier !== "string") {
      throw new Error(`Invalid entity resource data`);
    }
    const entity = new EntityResource(identifier);
    entity.#data = data;
    return entity;
  }
}

export interface EntityResourceSchema {
  format_version: "1.10.0";
  "minecraft:client_entity": {
    description: {
      identifier: string;
      materials?: Record<string, string>;
      textures?: Record<string, string>;
      geometry?: Record<string, string>;
      animations?: Record<string, string>;
      scripts?: {
        animate?: StringOrRecord[];
        initialize?: string[];
        pre_animation?: string[];
        scale?: string | number | boolean;
        should_update_bones_and_effects_offscreen?: string | number | boolean;
        should_update_effects_offscreen?: string | number | boolean;
        variables?: Record<string, "public">;
      };
      particle_effects?: Record<string, string>;
      particle_emitters?: Record<string, string>;
      sound_effects?: Record<string, string>;
      spawn_egg?: SpawnEgg;
      render_controllers?: StringOrRecord[];
      enable_attachables?: boolean;
      hide_armor?: boolean;
    };
  };
}

export interface SpawnEgg {
  base_color?: string;
  overlay_color?: string;
  texture?: string;
  texture_index?: number;
}
