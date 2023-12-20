import { startCase } from "../../../deps.ts";
import { Project } from "../../core/Project.ts";
import { IdentifierAddonFile } from "../AddonFile.ts";
import { ItemComponents } from "./types/ItemComponents.ts";
import { ItemGroup } from "./types/ItemGroup.ts";

export class Item extends IdentifierAddonFile {
  #data: ItemSchema;

  alias: string;
  constructor(identifier: string, dir?: string) {
    super(identifier, dir);
    this.#data = {
      format_version: "1.20.50",
      "minecraft:item": {
        description: {
          identifier,
          menu_category: {
            category: "items",
          },
        },
        components: {
          "minecraft:icon": identifier,
        },
      },
    };
    this.alias = startCase(this.id);
  }

  saveTo(project: Project) {
    project.onSave(({ itemTextures, lang, writeBP }) => {
      writeBP(`items/${this.fileName}.json`, this.#data);

      if (this.namespace === "minecraft") {
        return;
      }

      const identifier = this.identifier;
      lang.setItem(identifier, this.alias);

      let icon = this.getComponent("minecraft:icon");
      if (typeof icon === "object") {
        icon = icon.texture;
      }

      if (icon === identifier) {
        itemTextures.set(identifier, `textures/items/${this.fileName}`);
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

  get menuCategory() {
    return this.#item.description.menu_category;
  }

  set menuCategory(value) {
    this.#item.description.menu_category = value;
  }

  addComponents(components: ItemComponents) {
    Object.assign(this.#item.components ??= {}, components);
  }

  editComponent<Key extends keyof ItemComponents>(
    key: Key,
    callback: (data: ItemComponents[Key]) => ItemComponents[Key],
  ) {
    const component = this.getComponent(key);
    // TODO: create a type for each component
    // @ts-expect-error: ^^^
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
      menu_category?: {
        category?: "commands" | "construction" | "equipment" | "items" | "nature" | "none";
        group?: ItemGroup;
        is_hidden_in_commands?: boolean;
      };
    };
    components?: ItemComponents;
  };
}
