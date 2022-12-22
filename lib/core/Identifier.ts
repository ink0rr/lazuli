import { join } from "../../deps.ts";

export class Identifier extends String {
  #namespace: string;
  #name: string;
  constructor(id: string) {
    super(id);
    const split = id.split(":");
    if (split.length !== 2) {
      throw new Error("Invalid identifier");
    }
    [this.#namespace, this.#name] = split;
  }

  get namespace() {
    return this.#namespace;
  }

  get name() {
    return this.#name;
  }

  toFilePath(dir?: string) {
    return join(dir ?? "", this.name);
  }
}
