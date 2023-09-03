import { LiteralUnion } from "../../common/LiteralUnion.ts";

export type Filters = Filter | Filter[];

export interface Filter {
  all_of?: Filter[];
  any_of?: Filter[];
  domain?: FilterDomain;
  none_of?: Filter[];
  operator?: FilterOperator;
  subject?: FilterSubject;
  test?: FilterTest;
  value?: boolean | number | string;
}

export type FilterDomain = LiteralUnion<
  | "any"
  | "armor"
  | "feet"
  | "hand"
  | "head"
  | "leg"
  | "torso"
>;

export type FilterOperator =
  | "!="
  | "<"
  | "<="
  | "<>"
  | "="
  | "=="
  | ">"
  | ">="
  | "equals"
  | "not";

export type FilterSubject =
  | "baby"
  | "block"
  | "damager"
  | "holder"
  | "other"
  | "parent"
  | "player"
  | "self"
  | "target";

export type FilterTest =
  | "actor_health"
  | "all_slots_empty"
  | "any_slot_empty"
  | "bool_property"
  | "clock_time"
  | "distance_to_nearest_player"
  | "enum_property"
  | "float_property"
  | "has_ability"
  | "has_biome_tag"
  | "has_component"
  | "has_container_open"
  | "has_damage"
  | "has_equipment"
  | "has_mob_effect"
  | "has_nametag"
  | "has_property"
  | "has_ranged_weapon"
  | "has_silk_touch"
  | "has_tag"
  | "has_target"
  | "has_trade_supply"
  | "hourly_clock_time"
  | "in_block"
  | "in_caravan"
  | "in_clouds"
  | "in_contact_with_water"
  | "in_lava"
  | "in_nether"
  | "in_water_or_rain"
  | "in_water"
  | "inactivity_timer"
  | "int_property"
  | "is_altitude"
  | "is_avoiding_mobs"
  | "is_baby"
  | "is_biome"
  | "is_block"
  | "is_brightness"
  | "is_climbing"
  | "is_color"
  | "is_daytime"
  | "is_difficulty"
  | "is_family"
  | "is_game_rule"
  | "is_humid"
  | "is_immobile"
  | "is_in_village"
  | "is_leashed"
  | "is_leashed_to"
  | "is_mark_variant"
  | "is_missing_health"
  | "is_moving"
  | "is_owner"
  | "is_persistent"
  | "is_raider"
  | "is_riding"
  | "is_skin_id"
  | "is_sleeping"
  | "is_sneak_held"
  | "is_sneaking"
  | "is_snow_covered"
  | "is_target"
  | "is_temperature_type"
  | "is_temperature_value"
  | "is_underground"
  | "is_underwater"
  | "is_variant"
  | "is_visible"
  | "is_waterlogged"
  | "light_level"
  | "moon_intensity"
  | "moon_phase"
  | "on_fire"
  | "on_ground"
  | "on_hot_block"
  | "on_ladder"
  | "random_chance"
  | "rider_count"
  | "surface_mob"
  | "target_distance"
  | "trusts"
  | "weather_at_position"
  | "weather";
