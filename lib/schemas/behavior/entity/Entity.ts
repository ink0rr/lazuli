import { StringOrRecord } from "../../common/StringOrRecord.ts";
import { ComponentGroups } from "./types/ComponentGroups.ts";
import { Components } from "./types/components/Components.ts";
import { Events } from "./types/Events.ts";
import { RuntimeIdentifier } from "./types/RuntimeIdentifier.ts";

export interface Entity {
  format_version: "1.16.0";
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
    };
    component_groups?: ComponentGroups;
    components: Components;
    events?: Events;
  };
}
