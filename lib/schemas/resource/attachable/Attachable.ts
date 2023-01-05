import { ItemIdentifier } from "../../common/ItemIdentifier.ts";
import { StringOrRecord } from "../../common/StringOrRecord.ts";

export interface Attachable {
  format_version: "1.10.0";
  "minecraft:attachable": {
    description: AttachableDescription;
  };
}

export interface AttachableDescription {
  identifier: string;
  item?: ItemIdentifier;
  materials?: Record<string, string>;
  textures?: Record<string, string>;
  geometry?: Record<string, string>;
  animations?: Record<string, string>;
  scripts?: {
    animate?: StringOrRecord[];
    parent_setup?: string;
    pre_animation?: string[];
    should_update_bones_and_effects_offscreen?: string | number | boolean;
    should_update_effects_offscreen?: string | number | boolean;
  };
  render_controllers?: StringOrRecord[];
  queryable_geometry?: string;
}
