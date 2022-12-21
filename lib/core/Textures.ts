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
