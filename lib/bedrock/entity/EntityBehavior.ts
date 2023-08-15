import { Project } from "../../core/Project.ts";
import { addAnimation } from "../../utils/addAnimation.ts";
import { IdentifierAddonFile } from "../AddonFile.ts";
import { StringOrRecord } from "../common/StringOrRecord.ts";
import { EntityComponents } from "./types/EntityComponents.ts";
import { EventTriggerFiltered } from "./types/EventTrigger.ts";
import { Filters } from "./types/Filter.ts";
import { RuntimeIdentifier } from "./types/RuntimeIdentifier.ts";

export class EntityBehavior extends IdentifierAddonFile {
  #data: EntityBehaviorSchema;
  constructor(identifier: string, dir?: string) {
    super(identifier, dir);
    this.#data = {
      format_version: "1.16.0",
      "minecraft:entity": {
        description: {
          identifier,
          is_spawnable: true,
          is_summonable: true,
          is_experimental: false,
        },
        components: {},
      },
    };

    Project.onSave(({ writeBP }) => {
      writeBP(`entities/${this.fileName}.json`, this.#data);
    });
  }

  get #entity() {
    return this.#data["minecraft:entity"];
  }

  get formatVersion() {
    return this.#data.format_version;
  }

  set formatVersion(value) {
    this.#data.format_version = value;
  }

  get isSpawnable() {
    return this.#entity.description.is_spawnable;
  }

  set isSpawnable(value) {
    this.#entity.description.is_spawnable = value;
  }

  get isSummonable() {
    return this.#entity.description.is_summonable;
  }

  set isSummonable(value) {
    this.#entity.description.is_summonable = value;
  }

  get isExperimental() {
    return this.#entity.description.is_experimental;
  }

  set isExperimental(value) {
    this.#entity.description.is_experimental = value;
  }

  get runtimeIdentifier() {
    return this.#entity.description.runtime_identifier;
  }

  set runtimeIdentifier(value) {
    this.#entity.description.runtime_identifier = value;
  }

  addAnimation(key: string, animation: string, condition?: string | true) {
    addAnimation(this.#entity.description, key, animation, condition);
  }

  properties(properties: Record<string, Property>) {
    Object.assign(this.#entity.description.properties ??= {}, properties);
  }

  getProperty(key: string) {
    return this.#entity.description.properties?.[key];
  }

  editProperty(key: string, callback: (data?: Property) => Property) {
    const property = this.getProperty(key);
    this.properties({ [key]: callback(property) });
  }

  components(components: EntityComponents) {
    Object.assign(this.#entity.components ??= {}, components);
  }

  getComponent<Key extends keyof EntityComponents>(component: Key) {
    return this.#entity.components?.[component];
  }

  editComponent<Key extends keyof EntityComponents>(
    key: Key,
    callback: (data: EntityComponents[Key]) => EntityComponents[Key],
  ) {
    const component = this.getComponent(key);
    this.components({ [key]: callback(component) });
  }

  componentGroups(componentGroups: Record<string, EntityComponents>) {
    Object.assign(this.#entity.component_groups ??= {}, componentGroups);
  }

  getComponentGroup(key: string) {
    return this.#entity.component_groups?.[key];
  }

  getComponentGroups() {
    return Object.entries(this.#entity.component_groups ?? {});
  }

  editComponentGroup(key: string, callback: (data?: EntityComponents) => EntityComponents) {
    const componentGroup = this.getComponentGroup(key);
    this.componentGroups({ [key]: callback(componentGroup) });
  }

  events(events: Events) {
    Object.assign(this.#entity.events ??= {}, events);
  }

  getEvent(key: string) {
    return this.#entity.events?.[key];
  }

  getEvents() {
    return Object.entries(this.#entity.events ?? {});
  }

  editEvent(key: string, callback: (data?: Event) => Event) {
    const event = this.getEvent(key);
    this.events({ [key]: callback(event) });
  }

  /**
   * Create from object data
   */
  // deno-lint-ignore no-explicit-any
  static from(data: any, dir?: string) {
    const identifier = data?.["minecraft:entity"]?.description?.identifier;
    if (typeof identifier !== "string") {
      throw new Error(`Invalid entity behavior data`);
    }
    const entity = new EntityBehavior(identifier, dir);
    entity.#data = data;
    return entity;
  }
}

export interface EntityBehaviorSchema {
  format_version: string;
  "minecraft:entity": {
    description: {
      identifier: string;
      is_spawnable?: boolean;
      is_summonable?: boolean;
      is_experimental?: boolean;
      runtime_identifier?: RuntimeIdentifier;
      scripts?: {
        animate?: StringOrRecord[];
      };
      animations?: Record<string, string>;
      properties?: Record<string, Property>;
    };
    component_groups?: Record<string, EntityComponents>;
    components?: EntityComponents;
    events?: Events;
  };
}

export type Property = {
  client_sync?: boolean;
  type?: "enum";
  default?: string;
  values?: string[];
} | {
  client_sync?: boolean;
  type?: "bool";
  default?: boolean;
} | {
  client_sync?: boolean;
  type?: "float";
  default?: number;
  range?: [number, number];
} | {
  client_sync?: boolean;
  type?: "int";
  default?: number;
  range?: [number, number];
};

export type Events = Record<string, Event> & {
  "minecraft:entity_born"?: Event;
  "minecraft:entity_spawned"?: Event;
  "minecraft:entity_transformed"?: Event;
  "minecraft:on_prime"?: Event;
};

export interface Event {
  add?: EventAction;
  filters?: Filters;
  randomize?: EventRandomize[];
  remove?: EventAction;
  sequence?: Event[];
  set_property?: Record<string, string | number | boolean>;
  trigger?: string | EventTriggerFiltered;
}

export interface EventAction {
  component_groups?: string[];
}

export type EventRandomize = Event & {
  weight?: number;
};
