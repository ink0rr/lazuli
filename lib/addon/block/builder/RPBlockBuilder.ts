import { Schema } from "../../../schemas/mod.ts";

export function RPBlockBuilder(name: string) {
  const data: Schema.BlockResource = {
    textures: name,
  };
  return {
    ...data,
    override(data: Schema.BlockResource) {
      Object.assign(this, data);
    },
    build() {
      Object.assign(data, this);
      return data;
    },
  };
}
