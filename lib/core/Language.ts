import { startCase } from "../../deps.ts";
import { Identifier } from "./Identifier.ts";

export class Language extends Map<string, string> {
  constructor(text = "") {
    super(
      text.split(/\r?\n/).map((s, i) => {
        let [key, value] = s.split("=");
        if (key === "") {
          key = `_${i}_`;
        }
        return [key, value];
      }),
    );
  }

  set(key: string, value: string) {
    if (this.has(key)) return this;
    return super.set(key, value);
  }

  toString(): string {
    let lang = "";
    for (const [key, value] of this) {
      lang += `\n${key.replace(/^_\d+_/, "")}`;
      if (value) {
        lang += `=${value}`;
      }
    }
    return lang.trim();
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
