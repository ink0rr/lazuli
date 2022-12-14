import { StringOrRecord } from "../../common/StringOrRecord.ts";

export interface AnimationController {
  format_version: "1.10.0";
  animation_controllers: Record<string, AnimationControllerItem>;
}

export interface AnimationControllerItem {
  initial_state?: string;
  states: Record<string, AnimationControllerState>;
}

export interface AnimationControllerState {
  animations?: StringOrRecord[];
  on_entry?: string[];
  on_exit?: string[];
  transitions?: Record<string, string>[];
}
