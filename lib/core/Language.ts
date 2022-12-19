import startCase from "lodash/startCase";
import { Identifier } from "./Identifier.ts";

export class Language extends Map<string, string> {
  constructor(text = "") {
    super(
      text.split("\n").map((s) => s.split("=") as [string, string]),
    );
  }

  set(key: string, value: string) {
    if (this.has(key)) return this;
    return super.set(key, value);
  }

  toString(): string {
    return [...this.entries()].map((arr) => {
      if (arr[0].length === 0 || arr[0].startsWith("##")) {
        return arr[0];
      }
      return arr.join("=");
    }).join("\n");
  }

  setBlock(identifier: Identifier, alias?: string) {
    const key = `tile.${identifier}.name`;
    const value = alias ?? startCase(identifier.name);
    this.set(key, value);
  }

  setEntity(identifier: Identifier, alias?: string) {
    const key = `entity.${identifier}.name`;
    const value = alias ?? startCase(identifier.name);
    this.set(key, value);
  }

  setSpawnEgg(identifier: Identifier, alias?: string) {
    const key = `item.spawn_egg.entity.${identifier}.name`;
    const value = `Spawn ${alias ?? startCase(identifier.name)}`;
    this.set(key, value);
  }

  setRideHint(identifier: Identifier, hint: string | true) {
    const key = `action.hint.exit.${identifier}`;
    const value = hint === true ? "Tap jump to exit" : hint;
    this.set(key, value);
  }

  setItem(identifier: Identifier, alias?: string) {
    const key = `item.${identifier}.name`;
    const value = alias ?? startCase(identifier.name);
    this.set(key, value);
  }
}
