import { Block } from "../../../schemas/resource/block/mod.ts";

export function RPBlockBuilder(name: string) {
  const data: Block = {
    textures: name,
  };
  return {
    ...data,
    override(data: Block) {
      Object.assign(this, data);
    },
    build() {
      Object.assign(data, this);
      return data;
    },
  };
}
