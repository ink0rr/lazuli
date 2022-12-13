import { StringOrRecord } from "../../common/StringOrRecord.ts";
import { ComponentGroups } from "./types/ComponentGroups.ts";
import { EntityComponents } from "./types/components/EntityComponents.ts";
import { Events } from "./types/Events.ts";
import { Property } from "./types/Property.ts";
import { RuntimeIdentifier } from "./types/RuntimeIdentifier.ts";

export interface EntityBehavior {
  format_version: "1.19.50";
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
    component_groups?: ComponentGroups;
    components: EntityComponents;
    events?: Events;
  };
}
