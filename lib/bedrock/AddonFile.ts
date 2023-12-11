import { Identifier } from "../core/Identifier.ts";
import { Project } from "../core/Project.ts";

export abstract class AddonFile {
  /**
   * @param fileName File name without extension
   */
  constructor(public fileName: string) {
    if (Project.instance) {
      this.saveTo(Project.instance);
    }
  }

  abstract saveTo(project: Project): void;
}

export abstract class IdentifierAddonFile {
  #id: Identifier;
  #dir?: string;
  #fileName?: string;

  /**
   * @param identifier A valid identifier, e.g. `minecraft:zombie`
   * @param dir Directory to save the file
   */
  constructor(identifier: string, dir?: string) {
    this.#id = new Identifier(identifier);
    this.#dir = dir;

    if (Project.instance) {
      this.saveTo(Project.instance);
    }
  }

  abstract saveTo(project: Project): void;

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
