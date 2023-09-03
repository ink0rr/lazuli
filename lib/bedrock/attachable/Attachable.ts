import { Project } from "../../core/Project.ts";
import { addAnimation } from "../../utils/addAnimation.ts";
import { IdentifierAddonFile } from "../AddonFile.ts";
import { ItemIdentifier } from "../common/ItemIdentifier.ts";
import { StringOrRecord } from "../common/StringOrRecord.ts";

export class Attachable extends IdentifierAddonFile {
  #data: AttachableSchema;
  constructor(identifier: string, dir?: string) {
    super(identifier, dir);
    const id = this.identifier;
    this.#data = {
      format_version: "1.10.0",
      "minecraft:attachable": {
        description: {
          identifier,
          materials: {
            default: "entity_alphatest",
          },
          textures: {
            default: `textures/items/${this.fileName}`,
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
      writeRP(`attachables/${this.fileName}.json`, this.#data);
    });
  }

  get #attachable() {
    return this.#data["minecraft:attachable"].description;
  }

  get formatVersion() {
    return this.#data.format_version;
  }

  set formatVersion(value) {
    this.#data.format_version = value;
  }

  addMaterials(materials: Record<string, string>) {
    Object.assign(this.#attachable.materials ??= {}, materials);
  }

  getMaterial(key: string) {
    return this.#attachable.materials?.[key];
  }

  setMaterials(materials: Record<string, string>) {
    this.#attachable.materials = materials;
  }

  addTextures(textures: Record<string, string>) {
    Object.assign(this.#attachable.textures ??= {}, textures);
  }

  getTexture(key: string) {
    return this.#attachable.textures?.[key];
  }

  setTextures(textures: Record<string, string>) {
    this.#attachable.textures = textures;
  }

  addGeometry(geometry: Record<string, string>) {
    Object.assign(this.#attachable.geometry ??= {}, geometry);
  }

  getGeometry(key: string) {
    return this.#attachable.geometry?.[key];
  }

  setGeometry(geometry: Record<string, string>) {
    this.#attachable.geometry = geometry;
  }

  get scripts() {
    return this.#attachable.scripts;
  }

  set scripts(value) {
    this.#attachable.scripts = value;
  }

  addAnimation(key: string, animation: string, condition?: string | true) {
    addAnimation(this.#attachable, key, animation, condition);
  }

  get renderControllers() {
    return this.#attachable.render_controllers;
  }

  set renderControllers(value) {
    this.#attachable.render_controllers = value;
  }

  get queryableGeometry() {
    return this.#attachable.queryable_geometry;
  }

  set queryableGeometry(value) {
    this.#attachable.queryable_geometry = value;
  }

  /**
   * Create from object data
   */
  // deno-lint-ignore no-explicit-any
  static from(data: any) {
    const identifier = data?.["minecraft:attachable"]?.description?.identifier;
    if (typeof identifier !== "string") {
      throw new Error(`Invalid attachable data`);
    }
    const attachable = new Attachable(identifier);
    attachable.#data = data;
    return attachable;
  }
}

export interface AttachableSchema {
  format_version: "1.10.0";
  "minecraft:attachable": {
    description: {
      identifier: string;
      item?: ItemIdentifier;
      materials?: Record<string, string>;
      textures?: Record<string, string>;
      geometry?: Record<string, string>;
      animations?: Record<string, string>;
      scripts?: {
        animate?: StringOrRecord[];
        parent_setup?: string;
        pre_animation?: string[];
        should_update_bones_and_effects_offscreen?: string | number | boolean;
        should_update_effects_offscreen?: string | number | boolean;
      };
      render_controllers?: StringOrRecord[];
      queryable_geometry?: string;
    };
  };
}
