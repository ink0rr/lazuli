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

export class ItemTextures implements Textures {
  resource_pack_name;
  texture_data;
  texture_name;

  constructor(textures?: Textures) {
    const { resource_pack_name, texture_data, texture_name } = textures ?? {
      resource_pack_name: "pack.name",
      texture_data: {},
      texture_name: "atlas.items",
    };
    this.resource_pack_name = resource_pack_name;
    this.texture_data = texture_data;
    this.texture_name = texture_name;
  }

  get(key: string): string | undefined {
    return this.texture_data[key].textures;
  }

  has(key: string) {
    return key in this.texture_data;
  }

  set(key: string, value: string) {
    this.texture_data[key] = {
      textures: value,
    };
  }
}
