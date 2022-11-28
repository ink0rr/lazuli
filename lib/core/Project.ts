import { outputFile } from "../fs/file.ts";
import { readJson, readJsonSync, writeJson } from "../fs/json.ts";
import { Blocks } from "./Blocks.ts";
import { Language } from "./Language.ts";
import { Textures } from "./Textures.ts";

export class Project {
  paths;
  #blocks?: Blocks;
  #item_texture?: Textures;
  #terrain_texture?: Textures;
  #lang?: Language;

  constructor() {
    const [BP, RP] = this.#findPaths();
    this.paths = {
      BP,
      RP,
      blocks: `${RP}/blocks.json`,
      item_texture: `${RP}/textures/item_texture.json`,
      terrain_texture: `${RP}/textures/terrain_texture.json`,
      lang: `${RP}/texts/en_US.lang`,
    };
  }

  #findPaths(): [string, string] {
    try {
      const { packs } = readJsonSync<Config>("config.json");
      if (
        Deno.readDirSync(packs.behaviorPack) &&
        Deno.readDirSync(packs.resourcePack)
      ) {
        return [packs.behaviorPack, packs.resourcePack];
      } else {
        throw new Error("Invalid config.json");
      }
    } catch {
      const paths = [];
      for (const dir of Deno.readDirSync(".")) {
        if (dir.isFile) continue;
        if (dir.name.match(/[br]p$/i)) {
          paths.push(dir.name);
        }
        if (paths.length === 2) {
          break;
        }
      }
      const [BP, RP] = paths;
      // Make sure the paths have matching names aside from the bp/rp suffix
      if (BP.slice(0, -2) === RP.slice(0, -2)) {
        return [BP, RP];
      }
      throw new Error("Cannot find behavior pack and resource pack folders");
    }
  }

  async load() {
    // Ignore read errors to avoid creating files when not needed
    const ignore = () => {};
    await Promise.all([
      readJson<Blocks>(this.paths.blocks).then((blocks) => {
        this.#blocks = blocks;
      }).catch(ignore),

      readJson<Textures>(this.paths.item_texture).then((item_texture) => {
        this.#item_texture = item_texture;
      }).catch(ignore),

      readJson<Textures>(this.paths.terrain_texture).then((terrain_texture) => {
        this.#terrain_texture = terrain_texture;
      }).catch(ignore),

      Deno.readTextFile(this.paths.lang).then((lang) => {
        this.#lang = new Language(lang);
      }).catch(ignore),
    ]);
    return this;
  }

  sync() {
    return Promise.all([
      this.#blocks &&
      writeJson(this.paths.blocks, this.#blocks),

      this.#item_texture &&
      writeJson(this.paths.item_texture, this.#item_texture),

      this.#terrain_texture &&
      writeJson(this.paths.terrain_texture, this.#terrain_texture),

      this.#lang &&
      outputFile(this.paths.lang, this.#lang.toString()),
    ]);
  }

  get blocks() {
    this.#blocks ??= {
      // @ts-ignore: ¯\_(ツ)_/¯
      format_version: [1, 1, 0],
    };
    return this.#blocks!;
  }

  addItemTexture(name: string, texture: string) {
    this.#item_texture ??= {
      resource_pack_name: "vanilla",
      texture_name: "atlas.items",
      texture_data: {},
    };
    this.#item_texture.texture_data[name] = {
      textures: `textures/items/${texture}`,
    };
  }

  addTerrainTexture(name: string, texture: string) {
    this.#terrain_texture ??= {
      resource_pack_name: "vanilla",
      texture_name: "atlas.terrain",
      texture_data: {},
    };
    this.#terrain_texture.texture_data[name] = {
      textures: `textures/blocks/${texture}`,
    };
  }

  get lang() {
    this.#lang ??= new Language();
    return this.#lang;
  }
}

interface Config {
  packs: {
    behaviorPack: string;
    resourcePack: string;
  };
}
