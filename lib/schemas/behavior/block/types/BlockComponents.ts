export interface BlockComponents {
  "minecraft:loot"?: string;
  "minecraft:destroy_time"?: number;
  "minecraft:explosion_resistance"?: number;
  "minecraft:friction"?: number;
  "minecraft:flammable"?: {
    flame_odds?: number;
    burn_odds?: number;
  };
  "minecraft:map_color"?: `#${string}`;
  "minecraft:block_light_absorption"?: number;
  "minecraft:block_light_emission?"?: number;
}
