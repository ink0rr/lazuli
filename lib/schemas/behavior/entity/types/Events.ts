import { EventTriggerFiltered } from "./EventTrigger.ts";
import { Filters } from "./Filter.ts";

export interface EventAction {
  component_groups: string[];
}

export type EventRandomize = Event & {
  weight?: number;
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

export type Events = Record<string, Event> & {
  "minecraft:entity_born"?: Event;
  "minecraft:entity_spawned"?: Event;
  "minecraft:entity_transformed"?: Event;
  "minecraft:on_prime"?: Event;
};
