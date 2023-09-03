import { Identifier } from "../core/Identifier.ts";

export abstract class AddonFile {
  /**
   * @param fileName File name without extension
   */
  constructor(public fileName: string) {}
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
