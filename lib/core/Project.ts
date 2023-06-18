import { join } from "../../deps.ts";
import { Blocks } from "../core/Blocks.ts";
import { Language } from "../core/Language.ts";
import { Textures } from "../core/Textures.ts";
import { outputFile } from "../fs/file.ts";
import { readJson, writeJson } from "../fs/json.ts";

const paths = {
  BP: "BP",
  RP: "RP",
  get blocks() {
    return join(this.RP, "blocks.json");
  },
  get item_texture() {
    return join(this.RP, "textures/item_texture.json");
  },
  get terrain_texture() {
    return join(this.RP, "textures/terrain_texture.json");
  },
  get lang() {
    return join(this.RP, "texts/en_US.lang");
  },
};

const queue = new Map<string, unknown>();

const actions = {
  writeBP(path: string, data: unknown) {
    queue.set(join(paths.BP, path), data);
  },
  writeRP(path: string, data: unknown) {
    queue.set(join(paths.RP, path), data);
  },
};
type Actions = typeof actions;
const onSaves: ((actions: Actions) => void)[] = [];

let blocks: Blocks | undefined;
let item_texture: Textures | undefined;
let terrain_texture: Textures | undefined;
let lang: Language | undefined;

export const Project = Object.freeze({
  async load(packs?: { BP: string; RP: string }) {
    if (packs) {
      paths.BP = packs.BP;
      paths.RP = packs.RP;
    }

    // Ignore read errors to avoid creating files when not needed
    const ignore = () => {};
    await Promise.all([
      readJson<Blocks>(paths.blocks).then((data) => {
        blocks = data;
      }).catch(ignore),

      readJson<Textures>(paths.item_texture).then((data) => {
        item_texture = data;
      }).catch(ignore),

      readJson<Textures>(paths.terrain_texture).then((data) => {
        terrain_texture = data;
      }).catch(ignore),

      Deno.readTextFile(paths.lang).then((text) => {
        lang = new Language(text);
      }).catch(ignore),
    ]);
  },

  get blocks() {
    blocks ??= {};
    // @ts-expect-error: Can't define format_version on the type
    blocks.format_version = "1.19.30";
    return blocks;
  },

  setItemTexture(name: string, texture: string) {
    item_texture ??= {
      resource_pack_name: "pack.name",
      texture_name: "atlas.items",
      texture_data: {},
    };
    item_texture.texture_data[name] = {
      textures: `textures/items/${texture}`,
    };
  },

  setTerrainTexture(name: string, texture: string) {
    terrain_texture ??= {
      resource_pack_name: "pack.name",
      texture_name: "atlas.terrain",
      texture_data: {},
    };
    terrain_texture.texture_data[name] = {
      textures: `textures/blocks/${texture}`,
    };
  },

  get lang() {
    lang ??= new Language("");
    return lang;
  },

  onSave(callback: (actions: Actions) => void) {
    onSaves.push(callback);
  },

  async save() {
    for (const f of onSaves) {
      f(actions);
    }
    if (blocks) queue.set(paths.blocks, blocks);
    if (item_texture) queue.set(paths.item_texture, item_texture);
    if (terrain_texture) queue.set(paths.terrain_texture, terrain_texture);
    if (lang) queue.set(paths.lang, lang.toString());

    const promises = [];
    for (const [path, data] of queue) {
      if (typeof data === "string") {
        promises.push(outputFile(path, data));
      } else {
        promises.push(writeJson(path, data));
      }
    }
    await Promise.all(promises);
  },
});
