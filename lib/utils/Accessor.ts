export class Accessor<T extends object> {
  #data: T;

  constructor(data: T) {
    this.#data = data;
  }

  add(data: T) {
    Object.assign(this.#data, data);
  }

  edit<Key extends keyof T>(key: Key, callback: (value: T[Key]) => T[Key]) {
    this.#data[key] = callback(this.#data[key]);
  }

  get<Key extends keyof T>(key: Key) {
    return this.#data[key];
  }

  delete<Key extends keyof T>(key: Key) {
    delete this.#data[key];
  }
}
