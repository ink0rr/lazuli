import { Project } from "../../core/Project.ts";
import { IdentifierAddonFile } from "../AddonFile.ts";
import { ItemComponents } from "./types/ItemComponents.ts";

export class Item extends IdentifierAddonFile {
  #components: ItemComponents;
  category?: "construction" | "equipment" | "items" | "nature";

  alias?: string;

  constructor(identifier: string, dir?: string) {
    super(identifier, dir);
    const id = this.identifier;
    this.#components = {
      "minecraft:icon": id.name,
    };
    this.category = "items";

    Project.onSave(({ writeBP, writeRP }) => {
      const {
        "minecraft:hover_text_color": hover_text_color,
        "minecraft:icon": icon,
        "minecraft:render_offsets": render_offset,
        "minecraft:use_animation": use_animation,
        ...behaviorComponents
      } = this.#components;

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

      if (id.namespace !== "minecraft") {
        const { alias } = this;
        Project.lang.setItem(id, alias);

        if (icon === id.name) {
          Project.setItemTexture(id.name, this.fileName);
        }
      }
    });
  }

  components(value: ItemComponents) {
    Object.assign(this.#components, value);
  }

  getComponent<Key extends keyof ItemComponents>(component: Key) {
    return this.#components[component];
  }

  editComponent<Key extends keyof ItemComponents>(
    key: Key,
    callback: (data: ItemComponents[Key]) => ItemComponents[Key],
  ) {
    const component = this.getComponent(key);
    this.components({ [key]: callback(component) });
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
