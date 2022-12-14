import { ItemIdentifier } from "../../../common/ItemIdentifier.ts";
import { SpellEffects } from "../../../common/SpellEffects.ts";

export interface ItemBehaviorComponents {
  /**
   * Foil or enchantment glint on the item.
   */
  "minecraft:foil"?: boolean;
  /**
   * When an item has a food component, it becomes edible to the player.
   */
  "minecraft:food"?: {
    /**
     * If true you can always eat this item (even when not hungry), defaults to false.
     */
    can_always_eat?: boolean;
    /**
     * Cooldown time in ticks.
     */
    cooldown_time?: number;
    /**
     * Cooldown type. Will share the same cooldown as other items with the same cooldown type.
     */
    cooldown_type?: string;
    /**
     * Effects to apply on eat.
     */
    effects?: {
      /**
       * The amplifier for the effect
       */
      amplifier?: number;
      /**
       * The chance of the effect being applied
       */
      chance?: number;
      /**
       * The time duration in seconds of the effect
       */
      duration?: number;
      /**
       * Mob effect identifier.
       */
      name?: SpellEffects;
    }[];
    /**
     * How much nutrition does this food item give the player when eaten.
     */
    nutrition?: number;
    /**
     * An action to trigger when the food is eaten.
     */
    on_use_action?: "chorus_teleport" | "none" | "suspicious_stew_effect";
    /**
     * The range of the action effect.
     */
    on_use_range?: [number, number, number];
    /**
     * Effects to remove on eat.
     */
    remove_effects?: SpellEffects[];
    /**
     * Saturation Modifier is used in this formula?: (nutrition * saturation_modifier * 2) when appling the saturation buff. Which happens when you eat the item.
     */
    saturation_modifier?:
      | "good"
      | "low"
      | "max"
      | "normal"
      | "poor"
      | "supernatural";
    /**
     * When used, convert the *this* item to the one specified by 'using_converts_to'.
     */
    using_converts_to?: ItemIdentifier;
  };
  /**
   * Is this a hand equipped item.
   */
  "minecraft:hand_equipped"?: boolean;
  /**
   * Max damage item has, this is used like item max health.
   */
  "minecraft:max_damage"?: number;
  /**
   * The max stack size of the item.
   */
  "minecraft:max_stack_size"?: number;
  /**
   * Stacked by data aux value or not.
   */
  "minecraft:stacked_by_data"?: boolean;
  /**
   * How long to use before item is done being used.
   */
  "minecraft:use_duration"?: number;
}
