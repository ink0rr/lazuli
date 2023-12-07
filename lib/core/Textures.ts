export interface Textures {
  resource_pack_name: "pack.name";
  texture_data: TextureData;
  texture_name: "atlas.items" | "atlas.terrain";
}

export interface TextureData {
  [key: string]: {
    textures: string;
  };
}

export class ItemTextures {
  #data: Textures;
  constructor(textures?: Textures) {
    this.#data = textures ?? {
      resource_pack_name: "pack.name",
      texture_name: "atlas.items",
      texture_data: {},
    };
  }

  get(key: string): string | undefined {
    return this.#data.texture_data[key].textures;
  }

  has(key: string) {
    return key in this.#data.texture_data;
  }

  set(key: string, value: string) {
    this.#data.texture_data[key] = {
      textures: value,
    };
  }
}
