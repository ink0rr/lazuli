import { join } from "../../deps.ts";
import { Identifier } from "../core/Identifier.ts";

export abstract class AddonFile {
  #name: string;
  #dir?: string;
  #fileName?: string;
  constructor(name: string, dir?: string) {
    this.#name = name;
    this.#dir = dir;
  }

  /**
   * File name without extension
   */
  get fileName() {
    return this.#fileName ?? join(this.#dir ?? "", this.#name);
  }

  set fileName(value) {
    this.#fileName = value;
  }
}

export abstract class IdentifierAddonFile {
  #id: Identifier;
  #dir?: string;
  #fileName?: string;
  constructor(identifier: string, dir?: string) {
    this.#id = new Identifier(identifier);
    this.#dir = dir;
  }

  /**
   * File name without extension
   */
  get fileName() {
    return this.#fileName ?? this.#id.toFilePath(this.#dir);
  }

  set fileName(value) {
    this.#fileName = value;
  }

  get identifier() {
    return this.#id;
  }
}
