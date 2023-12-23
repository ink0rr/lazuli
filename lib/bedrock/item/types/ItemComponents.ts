import { ItemIdentifier } from "../../common/ItemIdentifier.ts";
import { Range } from "../../common/Range.ts";
import { EventTrigger } from "../../entity/types/EventTrigger.ts";
import { SoundEvent } from "../../entity/types/components/SoundEvent.ts";

export interface ItemComponents {
  /**
   * Determines whether an item can be placed in the off-hand slot of the inventory.
   */
  "minecraft:allow_off_hand"?: boolean;
  /**
   * Sets the item as a Planter item component for blocks. Planter items are items that can be planted into another block.
   */
  "minecraft:block_placer"?: {
    block?: ItemIdentifier;
    use_on?: ItemIdentifier[];
  };
  /**
   * Determines if an item will break blocks in Creative Mode while swinging.
   */
  "minecraft:can_destroy_in_creative"?: boolean;
  /**
   * Sets an items "Cool down" time. After using an item, it becomes unusable for the duration specified by the 'duration' setting of this component.
   */
  "minecraft:cooldown"?: {
    category?: string;
    duration?: number;
  };
  /**
   * Determines how much extra damage an item does on attack.
   */
  "minecraft:damage"?: number;
  /**
   * Sets the item as a "Digger" item. Component put on items that dig.
   */
  "minecraft:digger"?: {
    /**
     * Destroy speed per block
     */
    destroy_speeds?: {
      /**
       * Blocks/block tags that are broken at the set speed.
       */
      block?: ItemIdentifier | {
        tags?: string;
      };
      /**
       * Destroy speed of the block.
       */
      speed?: number;
    }[];
    /**
     * Toggles if the item will be used efficiently
     */
    use_efficiency?: boolean;
  };
  /**
   * Sets the item display name
   */
  "minecraft:display_name"?: {
    value?: string;
  };
  /**
   * Sets how much damage the item can take before breaking, and allows the item to be combined at an anvil, grindstone, or crafting table.
   */
  "minecraft:durability"?: {
    /**
     * Damage chance is the percentage chance of this item losing durability. Default is set at 100 to 100.
     */
    damage_chance?: Range;
    /**
     * Max durability is the amount of damage that this item can take before breaking. The minimum value for this parameter is 0.
     */
    max_durability?: number;
  };
  /**
   * Determines what enchantments can be applied to the item. Not all enchantments will have an effect on all item components.
   */
  "minecraft:enchantable"?: {
    /**
     * What enchantments can be applied (ex. Using bow would allow this item to be enchanted as if it were a bow).
     */
    slot?: string;
    /**
     * The value of the enchantment (minimum of 0).
     */
    value?: number;
  };
  /**
   * Allows an item to place entities into the world.
   */
  "minecraft:entity_placer"?: {
    /**
     * List of block descriptors that contain blocks that this item can be dispensed on. If left empty, all blocks will be allowed.
     */
    dispense_on?: ItemIdentifier[];
    /**
     * The entity to be placed in the world. Note that this parameter is required.
     */
    entity?: string;
    /**
     * List of block descriptors that contain blocks that this item can be used on. If left empty, all blocks will be allowed. See Custom Item Use Priority for more information on use behavior.
     */
    use_on?: ItemIdentifier[];
  };
  /**
   * When an item has a food component, it becomes edible to the player.
   */
  "minecraft:food"?: {
    /**
     * If true you can always eat this item (even when not hungry).
     */
    can_always_eat?: boolean;
    /**
     * The value that is added to the actor's nutrition when the item is used.
     */
    nutrition?: number;
    /**
     * Event trigger for when the item is consumed.
     */
    on_consume?: EventTrigger;
    /**
     * Saturation Modifier is used in this formula?: (nutrition * saturation_modifier * 2) when appling the saturation buff. Which happens when you eat the item.
     */
    saturation_modifier?: number;
    /**
     * When used, converts to the item specified by the string in this field.
     */
    using_converts_to?: ItemIdentifier;
  };
  /**
   * Allows this item to be used as fuel in a furnace to 'cook' other items.
   */
  "minecraft:fuel"?: {
    /**
     * How long in seconds will this fuel cook items for. Minimum value: 0.05.
     */
    duration?: number;
  };
  /**
   * Determines whether the item has the enchanted glint render effect on it.
   */
  "minecraft:glint"?: boolean;
  /**
   * Determines if an item is rendered like a tool while in-hand.
   */
  "minecraft:hand_equipped"?: boolean;
  /**
   * Determines the color of the item name when hovering over it.
   */
  "minecraft:hover_text_color"?:
    | "aqua"
    | "black"
    | "blue"
    | "dark_aqua"
    | "dark_blue"
    | "dark_gray"
    | "dark_green"
    | "dark_purple"
    | "dark_red"
    | "gold"
    | "gray"
    | "green"
    | "light_purple"
    | "minecoin_gold"
    | "red"
    | "white"
    | "yellow";
  /**
   * Sets the icon item component. Determines the icon to represent the item in the UI and elsewhere.
   */
  "minecraft:icon"?: string | {
    /**
     * An index or expression for which frame of the icon to display. Default resolves to 0.
     */
    frame?: number;
    /**
     * The key from the resource_pack/textures/item_texture.json 'texture_data' object associated with the texture file.
     */
    texture?: string;
  };
  /**
   * Determines if the interact button is shown in touch controls, and what text is displayed on the button. When set to 'true', the default 'Use Item' text will be used.
   */
  "minecraft:interact_button"?: boolean | string;
  /**
   * Determines whether an item interacts with liquid blocks on use.
   */
  "minecraft:liquid_clipped"?: boolean;
  /**
   * Determines how many of an item can be stacked together.
   */
  "minecraft:max_stack_size"?: number;
  /**
   * Compels the item to shoot, similarly to an arrow. Items with minecraft:projectile can be shot from dispensers or used as ammunition for items with the minecraft:shooter item component. Additionally, this component sets the entity that is spawned for items that also contain the minecraft:throwable component.
   */
  "minecraft:projectile"?: {
    /**
     * Defines the time a projectile needs to charge in order to critically hit.
     */
    minimum_critical_power?: number;
    /**
     * The entity to be fired as a projectile.
     */
    projectile_entity?: string;
  };
  /**
   * Used by record items to play music.
   */
  "minecraft:record"?: {
    /**
     * Signal strength for comparator blocks to use from 1 - 13.
     */
    comparator_signal?: number;
    /**
     * 	Duration of sound event in seconds float value.
     */
    duration?: number;
    /**
     * Sound event types.
     */
    sound_event?: SoundEvent;
  };
  /**
   * Defines the items that can be used to repair a defined item, and the amount of durability each item restores upon repair.
   */
  "minecraft:repairable"?: {
    /**
     * Repairable item component: how much damage can this item repair, what items can repair it.
     */
    on_repaired?: EventTrigger;
    /**
     * List of repair item entries.
     */
    repair_items?: {
      items?: ItemIdentifier[];
      repair_amount?: number;
    }[];
  };
  /**
   * Compels an item to shoot projectiles, similarly to a bow or crossbow.
   */
  "minecraft:shooter"?: {
    /**
     * Sets the entity that is used as ammunition
     */
    ammunition?: {
      /**
       * Denotes the item description identifier
       */
      item?: ItemIdentifier;
      /**
       * Determines whether the inventory can be searched for ammunition to use
       */
      search_inventory?: boolean;
      /**
       * Determines whether the ammunition can be used in Creative mode
       */
      use_in_creative?: boolean;
      /**
       * When set to 'true', ammunition can be used from the offhand
       */
      use_offhand?: boolean;
    }[];
    /**
     * Sets if the item is charged when drawn
     */
    charge_on_draw?: boolean;
    /**
     * Launch power scale. Default is set to 1.0.
     */
    launch_power_scale?: number;
    /**
     * Determines how long can the weapon can be drawn before releasing automatically
     */
    max_draw_duration?: number;
    /**
     * Launch power. Default is set to 1.0.
     */
    max_launch_power?: number;
    /**
     * When set to 'true', the longer the weapon is drawn, the more power it will have when released
     */
    scale_power_by_draw_duration?: boolean;
  };
  /**
   * Determines if an item should despawn while floating in the world.
   */
  "minecraft:should_despawn"?: boolean;
  /**
   * Determines if the same item with different aux values can stack. Additionally, this component defines whether the item actors can merge while floating in the world.
   */
  "minecraft:stacked_by_data"?: boolean;
  /**
   * Determines which tags an item has on it.
   */
  "minecraft:tags"?: string[];
  /**
   * Sets the throwable item component.
   */
  "minecraft:throwable"?: {
    /**
     * Whether the item should use the swing animation when thrown.
     */
    do_swing_animation?: boolean;
    /**
     * The scale at which the power of the throw increases
     */
    launch_power_scale?: number;
    /**
     * The maximum duration to draw a throwable item.
     */
    max_draw_duration?: number;
    /**
     * The maximum power to launch the throwable item.
     */
    max_launch_power?: number;
    /**
     * The minimum duration to draw a throwable item.
     */
    min_draw_duration?: number;
    /**
     * Whether or not the power of the throw increases with duration charged. When true, The longer you hold, the more power it will have when released.
     */
    scale_power_by_draw_duration?: boolean;
  };
  /**
   * Determines which animation plays when using an item.
   */
  "minecraft:use_animation"?:
    | "bow"
    | "camera"
    | "crossbow"
    | "drink"
    | "eat"
    | "none";
  /**
   * Modifies use effects, including how long the item takes to use and the player's speed when used in combination with components like Shooter, Throwable, or Food.
   */
  "minecraft:use_modifiers"?: {
    /**
     * Modifier value to scale the players movement speed when item is in use.
     */
    movement_modifier?: number;
    /**
     * How long the item takes to use in seconds.
     */
    use_duration?: number;
  };
  /**
   * Sets the wearable item component.
   */
  "minecraft:wearable"?: {
    /**
     * UNDOCUMENTED.
     */
    dispenseable?: boolean;
    /**
     * How much protection the wearable has.
     */
    protection?: number;
    /**
     * Determines where the item can be worn. If any non-hand slot is chosen, the max stack size is set to 1.
     */
    slot?:
      | "slot.armor"
      | "slot.armor.head"
      | "slot.armor.chest"
      | "slot.armor.legs"
      | "slot.armor.feet"
      | "slot.weapon.offhand";
  };
}
