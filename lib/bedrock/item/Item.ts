import { startCase } from "../../../deps.ts";
import { Project } from "../../core/Project.ts";
import { IdentifierAddonFile } from "../AddonFile.ts";
import { ItemComponents } from "./types/ItemComponents.ts";

export class Item extends IdentifierAddonFile {
  #data: ItemSchema;

  alias: string;
  constructor(identifier: string, dir?: string) {
    super(identifier, dir);
    this.#data = {
      format_version: "1.10.0",
      "minecraft:item": {
        description: {
          identifier,
          category: "items",
        },
        components: {
          "minecraft:icon": this.identifier.name,
        },
      },
    };

    this.alias = startCase(identifier);

    Project.onSave(({ writeBP, writeRP }) => {
      const {
        "minecraft:hover_text_color": hover_text_color,
        "minecraft:icon": icon,
        "minecraft:render_offsets": render_offset,
        "minecraft:use_animation": use_animation,
        ...behaviorComponents
      } = this.#item.components ?? {};

      const resourceComponents: ItemComponents = {
        "minecraft:hover_text_color": hover_text_color,
        "minecraft:icon": icon,
        "minecraft:render_offsets": render_offset,
        "minecraft:use_animation": use_animation,
      };

      const behavior: ItemSchema = {
        format_version: "1.10.0",
        "minecraft:item": {
          description: {
            identifier,
          },
          components: behaviorComponents,
        },
      };
      const resource: ItemSchema = {
        format_version: "1.10.0",
        "minecraft:item": {
          description: {
            identifier,
            category: this.category,
          },
          components: resourceComponents,
        },
      };
      writeBP(`items/${this.fileName}.json`, behavior);
      writeRP(`items/${this.fileName}.json`, resource);

      const id = this.identifier;
      if (id.namespace !== "minecraft") {
        const { alias } = this;
        Project.lang.setItem(id, alias);

        if (icon === id.name) {
          Project.setItemTexture(id.name, this.fileName);
        }
      }
    });
  }

  get #item() {
    return this.#data["minecraft:item"];
  }

  get formatVersion() {
    return this.#data.format_version;
  }

  set formatVersion(value) {
    this.#data.format_version = value;
  }

  get category() {
    return this.#item.description.category;
  }

  set category(value) {
    this.#item.description.category = value;
  }

  addComponents(components: ItemComponents) {
    Object.assign(this.#item.components ??= {}, components);
  }

  editComponent<Key extends keyof ItemComponents>(
    key: Key,
    callback: (data: ItemComponents[Key]) => ItemComponents[Key],
  ) {
    const component = this.getComponent(key);
    this.addComponents({ [key]: callback(component) });
  }

  getComponent<Key extends keyof ItemComponents>(component: Key) {
    return this.#item.components?.[component];
  }

  setComponents(components: ItemComponents) {
    this.#item.components = components;
  }
}

export interface ItemSchema {
  format_version: string;
  "minecraft:item": {
    description: {
      identifier: string;
      category?: "construction" | "equipment" | "items" | "nature";
    };
    components?: ItemComponents;
  };
}
