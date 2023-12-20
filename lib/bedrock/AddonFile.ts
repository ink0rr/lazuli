import { join } from "../../deps.ts";
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
  #namespace: string;
  #id: string;
  #identifier: string;

  #dir?: string;
  #fileName?: string;

  /**
   * @param identifier A valid identifier, e.g. `minecraft:zombie`
   * @param dir Directory to save the file
   */
  constructor(identifier: string, dir?: string) {
    const split = identifier.split(":");
    if (split.length !== 2) {
      throw new Error("Invalid identifier");
    }
    [this.#namespace, this.#id] = split;
    this.#identifier = identifier;
    this.#dir = dir;

    if (Project.instance) {
      this.saveTo(Project.instance);
    }
  }

  abstract saveTo(project: Project): void;

  /**
   * Identifier namespace
   */
  get namespace() {
    return this.#namespace;
  }

  /**
   * Identifier without namespace
   */
  get id() {
    return this.#id;
  }

  /**
   * Identifier with namespace
   */
  get identifier() {
    return this.#identifier;
  }

  /**
   * File name without extension
   */
  get fileName() {
    return this.#fileName ?? join(this.#dir ?? "", this.#id);
  }

  set fileName(value) {
    this.#fileName = value;
  }
}
