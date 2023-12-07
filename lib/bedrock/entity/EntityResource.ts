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
  }

  saveTo(project: Project) {
    project.onSave(({ writeRP }) => {
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

  addMaterials(materials: Record<string, string>) {
    Object.assign(this.#entity.materials ??= {}, materials);
  }

  getMaterial(key: string) {
    return this.#entity.materials?.[key];
  }

  setMaterials(materials: Record<string, string>) {
    this.#entity.materials = materials;
  }

  addTextures(textures: Record<string, string>) {
    Object.assign(this.#entity.textures ??= {}, textures);
  }

  getTexture(key: string) {
    return this.#entity.textures?.[key];
  }

  setTextures(textures: Record<string, string>) {
    this.#entity.textures = textures;
  }

  addGeometry(geometry: Record<string, string>) {
    Object.assign(this.#entity.geometry ??= {}, geometry);
  }

  getGeometry(key: string) {
    return this.#entity.geometry?.[key];
  }

  setGeometry(geometry: Record<string, string>) {
    this.#entity.geometry = geometry;
  }

  get scripts() {
    return this.#entity.scripts;
  }

  set scripts(value) {
    this.#entity.scripts = value;
  }

  get animations() {
    return this.#entity.animations;
  }

  set animations(value) {
    this.#entity.animations = value;
  }

  addAnimation(key: string, animation: string, condition?: string | true) {
    addAnimation(this.#entity, key, animation, condition);
  }

  addParticleEffects(particleEffects: Record<string, string>) {
    Object.assign(this.#entity.particle_effects ??= {}, particleEffects);
  }

  getParticleEffect(key: string) {
    return this.#entity.particle_effects?.[key];
  }

  setParticleEffects(particleEffects: Record<string, string>) {
    this.#entity.particle_effects = particleEffects;
  }

  addParticleEmitters(particleEmitters: Record<string, string>) {
    Object.assign(this.#entity.particle_emitters ??= {}, particleEmitters);
  }

  getParticleEmitter(key: string) {
    return this.#entity.particle_emitters?.[key];
  }

  setParticleEmitters(particleEmitters: Record<string, string>) {
    this.#entity.particle_emitters = particleEmitters;
  }

  addSoundEffects(soundEffects: Record<string, string>) {
    Object.assign(this.#entity.sound_effects ??= {}, soundEffects);
  }

  getSoundEffect(key: string) {
    return this.#entity.sound_effects?.[key];
  }

  setSoundEffects(soundEffects: Record<string, string>) {
    this.#entity.sound_effects = soundEffects;
  }

  getSpawnEgg() {
    return this.#entity.spawn_egg;
  }

  setSpawnEgg(spawnEgg: SpawnEgg) {
    this.#entity.spawn_egg = spawnEgg;
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
  format_version: string;
  "minecraft:client_entity": {
    description: {
      identifier: string;
      materials?: Record<string, string>;
      textures?: Record<string, string>;
      geometry?: Record<string, string>;
      scripts?: {
        animate?: StringOrRecord[];
        initialize?: string[];
        pre_animation?: string[];
        scale?: string | number | boolean;
        should_update_bones_and_effects_offscreen?: string | number | boolean;
        should_update_effects_offscreen?: string | number | boolean;
        variables?: Record<string, "public">;
      };
      animations?: Record<string, string>;
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
