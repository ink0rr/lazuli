import { EventTriggerFiltered } from "./EventTrigger.ts";
import { Filters } from "./Filter.ts";

export interface EventAction {
  component_groups: string[];
}

export interface EventRandomize {
  add?: EventAction;
  remove?: EventAction;
  trigger?: string | EventTriggerFiltered;
  weight?: number;
}

export interface EventSequence {
  add?: EventAction;
  filters?: Filters;
  remove?: EventAction;
  trigger?: string | EventTriggerFiltered;
}

export interface Event {
  add?: EventAction;
  filters?: Filters;
  randomize?: EventRandomize[];
  remove?: EventAction;
  sequence?: EventSequence[];
  trigger?: string | EventTriggerFiltered;
  set_properties?: Record<string, string | number | boolean>;
}

export type Events = Record<string, Event> & {
  "minecraft:entity_born"?: Event;
  "minecraft:entity_spawned"?: Event;
  "minecraft:entity_transformed"?: Event;
  "minecraft:on_prime"?: Event;
};
