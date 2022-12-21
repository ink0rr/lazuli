import { StringOrRecord } from "../../common/StringOrRecord.ts";
import { SpawnEgg } from "./types/SpawnEgg.ts";

export interface EntityResource {
  format_version: "1.10.0";
  "minecraft:client_entity": {
    description: EntityResourceDescription;
  };
}

export interface EntityResourceDescription {
  identifier: string;
  materials?: Record<string, string>;
  textures?: Record<string, string>;
  geometry?: Record<string, string>;
  animations?: Record<string, string>;
  scripts?: {
    animate?: StringOrRecord[];
    initialize?: string[];
    pre_animation?: string[];
    scale?: string | number | boolean;
    should_update_bones_and_effects_offscreen?: string | number | boolean;
    should_update_effects_offscreen?: string | number | boolean;
    variables?: Record<string, "public">;
  };
  particle_effects?: Record<string, string>;
  particle_emitters?: Record<string, string>;
  sound_effects?: Record<string, string>;
  spawn_egg?: SpawnEgg;
  render_controllers?: StringOrRecord[];
  enable_attachables?: boolean;
  hide_armor?: boolean;
}
