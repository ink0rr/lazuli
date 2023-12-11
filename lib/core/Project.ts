import { join } from "../../deps.ts";
import { Language } from "../core/Language.ts";
import { ItemTextures, Textures } from "../core/Textures.ts";
import { outputFile } from "../fs/file.ts";
import { readJson, writeJson } from "../fs/json.ts";

type Actions = {
  itemTextures: ItemTextures;
  lang: Language;
  writeBP(path: string, data: unknown): void;
  writeRP(path: string, data: unknown): void;
};

const paths = {
  item_texture: "textures/item_texture.json",
  lang: "texts/en_US.lang",
};

type Packs = {
  BP: string;
  RP: string;
};

export class Project {
  #packs: Packs = {
    BP: "BP",
    RP: "RP",
  };
  #callbacks: ((actions: Actions) => void)[] = [];

  constructor(packs?: Packs) {
    if (packs) {
      this.#packs = packs;
    }
  }

  /**
   * Add a callback to be called when the project is saved
   */
  onSave(callback: (actions: Actions) => void) {
    this.#callbacks.push(callback);
  }

  /**
   * Save the project
   */
  async save() {
    const { BP, RP } = this.#packs;
    let itemTextures: ItemTextures | undefined;
    let lang: Language | undefined;
    await Promise.allSettled([
      readJson<Textures>(join(RP, paths.item_texture)).then((data) => {
        itemTextures = new ItemTextures(data);
      }),
      Deno.readTextFile(join(RP, paths.lang)).then((text) => {
        lang = new Language(text);
      }),
    ]);

    const promises: Promise<void>[] = [];
    const write = (path: string, data: unknown) => {
      let promise;
      if (typeof data === "string") {
        promise = outputFile(path, data);
      } else {
        promise = writeJson(path, data);
      }
      promises.push(promise);
    };
    const actions: Actions = {
      get itemTextures() {
        itemTextures ??= new ItemTextures({
          resource_pack_name: "pack.name",
          texture_name: "atlas.items",
          texture_data: {},
        });
        return itemTextures;
      },
      get lang() {
        lang ??= new Language();
        return lang;
      },
      writeBP(path, data) {
        write(join(BP, path), data);
      },
      writeRP(path, data) {
        write(join(RP, path), data);
      },
    };

    for (const fn of this.#callbacks) {
      fn(actions);
    }
    if (itemTextures) {
      actions.writeRP(paths.item_texture, actions.itemTextures);
    }
    if (lang) {
      actions.writeRP(paths.lang, actions.lang.toString());
    }
    await Promise.all(promises);
    this.#callbacks = [];
  }

  static #instance: Project | undefined;

  static get instance() {
    return this.#instance;
  }

  static async lazuli(callback: CallableFunction) {
    if (Project.#instance) {
      throw Error("Cannot call lazuli inside lazuli block");
    }
    const project = new Project();
    Project.#instance = project;
    await callback();
    await project.save();
    Project.#instance = undefined;
  }
}
