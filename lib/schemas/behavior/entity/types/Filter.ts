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

export type FilterDomain =
  | "any"
  | "armor"
  | "feet"
  | "hand"
  | "head"
  | "leg"
  | "torso";

export type FilterOperator = "==" | "!=" | ">=" | "<=" | ">" | "<";

export type FilterSubject =
  | "block"
  | "damager"
  | "other"
  | "parent"
  | "player"
  | "self"
  | "target";

export type FilterTest =
  | "clock_time"
  | "distance_to_nearest_player"
  | "has_ability"
  | "has_biome_tag"
  | "has_component"
  | "has_container_open"
  | "has_damage"
  | "has_equipment"
  | "has_mob_effect"
  | "has_nametag"
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
  | "in_water"
  | "in_water_or_rain"
  | "inactivity_timer"
  | "is_altitude"
  | "is_avoiding_mobs"
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
  | "is_riding"
  | "is_skin_id"
  | "is_sleeping"
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
  | "is_weather"
  | "light_level"
  | "moon_intensity"
  | "moon_phase"
  | "on_ground"
  | "on_ladder"
  | "random_chance"
  | "rider_count"
  | "surface_mob"
  | "trusts"
  | "weather"
  | "weather_at_position";
