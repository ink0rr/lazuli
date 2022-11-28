import { Filters, FilterSubject } from "./Filter.ts";

export interface EventTrigger {
  event: string;
  target?: FilterSubject;
}

export interface EventTriggerFiltered {
  event: string;
  filters?: Filters;
  target?: FilterSubject;
}
