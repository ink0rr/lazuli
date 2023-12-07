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

  setBlock(identifier: Identifier, value: string) {
    const key = `tile.${identifier}.name`;
    this.set(key, value);
  }

  setEntity(identifier: Identifier, value: string) {
    const key = `entity.${identifier}.name`;
    this.set(key, value);
  }

  setSpawnEgg(identifier: Identifier, value: string) {
    const key = `item.spawn_egg.entity.${identifier}.name`;
    this.set(key, value);
  }

  setRideHint(identifier: Identifier, value: string) {
    const key = `action.hint.exit.${identifier}`;
    this.set(key, value);
  }

  setItem(identifier: Identifier, value: string) {
    const key = `item.${identifier}`;
    this.set(key, value);
  }

  toString() {
    let lang = "";
    for (const [key, value] of this) {
      lang += `\n${key.replace(/^_\d+_/, "")}`;
      if (value) {
        lang += `=${value}`;
      }
    }
    return lang;
  }
}
