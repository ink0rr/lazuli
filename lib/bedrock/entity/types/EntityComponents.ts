import { ItemIdentifier } from "../../common/ItemIdentifier.ts";
import { SpellEffects } from "../../common/SpellEffects.ts";
import { EventTrigger, EventTriggerFiltered } from "./EventTrigger.ts";
import { Filters } from "./Filter.ts";
import { BlockReference } from "./components/BlockReference.ts";
import { DamageSource } from "./components/DamageSource.ts";
import { EntityType } from "./components/EntityType.ts";
import { SoundEvent } from "./components/SoundEvent.ts";

export interface EntityComponents {
  /**
   * Adds a rider to the entity. Requires `minecraft:rideable.`
   */
  "minecraft:addrider"?: {
    /**
     * The entity type that will be riding this entity.
     */
    entity_type?: string;
    /**
     * The spawn event that will be used when the riding entity is created.
     */
    spawn_event?: string;
  };
  /**
   * Causes the mob to ignore attackable targets for a given duration.
   */
  "minecraft:admire_item"?: {
    /**
     * Duration, in seconds, for which mob won't admire items if it was hurt.
     */
    cooldown_after_being_attacked?: number;
    /**
     * Duration, in seconds, that the mob is pacified.
     */
    duration?: number;
  };
  /**
   * Adds a timer for the entity to grow up. It can be accelerated by giving the entity the items it likes as defined by feedItems.
   */
  "minecraft:ageable"?: {
    /**
     * List of items that the entity drops when it grows up.
     */
    drop_items?:
      | (ItemIdentifier | ItemIdentifier | {
        /**
         * UNDOCUMENTED.
         */
        item?: ItemIdentifier | ItemIdentifier;
      })[]
      | ItemIdentifier
      | ItemIdentifier
      | {
        /**
         * UNDOCUMENTED.
         */
        item?: ItemIdentifier | ItemIdentifier;
      };
    /**
     * Amount of time before the entity grows up, -1 for always a baby.
     */
    duration?: number;
    /**
     * List of items that can be fed to the entity. Includes `item` for the item name and `growth` to define how much time it grows up by
     */
    feed_items?: (ItemIdentifier | {
      /**
       * UNDOCUMENTED.
       */
      growth?: number;
      /**
       * UNDOCUMENTED.
       */
      item?: ItemIdentifier | ItemIdentifier | {
        /**
         * UNDOCUMENTED.
         */
        item?: ItemIdentifier | ItemIdentifier;
      };
    })[] | ItemIdentifier;
    /**
     * Event to run when this entity grows up.
     */
    grow_up?: EventTrigger;
    /**
     * UNDOCUMENTED.
     */
    transform_to_item?: ItemIdentifier | ItemIdentifier | {
      /**
       * UNDOCUMENTED.
       */
      item?: ItemIdentifier | ItemIdentifier;
    };
  };
  /**
   * Sets the entity's delay between playing its ambient sound.
   */
  "minecraft:ambient_sound_interval"?: {
    /**
     * Level sound event to be played as the ambient sound.
     */
    event_name?: string;
    /**
     * List of dynamic level sound events, with conditions for choosing between them. Evaluated in order, first one wins. If none evaluate to true, 'event_name' will take precedence.
     */
    event_names?: ({
      /**
       * The condition that must be satisfied to select the given ambient sound.
       */
      condition?: string;
      /**
       * Level sound event to be played as the ambient sound.
       */
      event_name?: SoundEvent;
    })[];
    /**
     * Maximum time in seconds to randomly add to the ambient sound delay time.
     */
    range?: number;
    /**
     * Minimum time in seconds before the entity plays its ambient sound again.
     */
    value?: number;
  };
  /**
   * Allows this entity to track anger towards a set of nuisances
   */
  "minecraft:anger_level"?: {
    /**
     * Anger level will decay over time. Defines how often anger towards all nuisances will be decreased by one
     */
    anger_decrement_interval?: number;
    /**
     * Anger boost applied to angry threshold when mob gets angry.
     */
    angry_boost?: number;
    /**
     * Threshold that define when the mob is considered angry at a nuisance.
     */
    angry_threshold?: number;
    /**
     * The default amount of annoyingness for any given nuisance. Specifies how much to raise anger level on each provocation
     */
    default_annoyingness?: number;
    /**
     * The default amount of annoyingness for projectile nuisance. Specifies how much to raise anger level on each provocation
     */
    default_projectile_annoyingness?: number;
    /**
     * The maximum anger level that can be reached. Applies to any nuisance
     */
    max_anger?: number;
    /**
     * Filter that is applied to determine if a mob can be a nuisance.
     */
    nuisance_filter?: Filters;
    /**
     * UNDOCUMENTED.
     */
    on_increase_sounds?: Filters;
    /**
     * Defines if the mob should remove target if it falls below 'angry' threshold.
     */
    remove_targets_below_angry_threshold?: boolean;
  };
  /**
   * Defines the entity's 'angry' state using a timer.
   */
  "minecraft:angry"?: {
    /**
     * If true, other entities of the same entity definition within the broadcastRange will also become angry.
     */
    broadcast_anger?: boolean;
    /**
     * Conditions that make this entry in the list valid.
     */
    broadcast_filters?: Filters;
    /**
     * Filter out mob types that it should not attack while angry (other Piglins).
     */
    filters?: Filters;
    /**
     * Distance in blocks within which other entities of the same entity definition will become angry.
     */
    broadcast_range?: number;
    /**
     * A list of entity families to broadcast anger to.
     */
    broadcast_targets?: (string)[];
    /**
     * Event to run after the number of seconds specified in duration expires (when the entity stops being "angry")
     */
    calm_event?: EventTrigger;
    /**
     * The sound event to play when the mob is angry.
     */
    angry_sound?: SoundEvent;
    /**
     * If true, other entities of the same entity definition within the broadcastRange will also become angry whenever this mob attacks.
     */
    broadcast_anger_on_attack?: boolean;
    /**
     * If true, other entities of the same entity definition within the broadcastRange will also become angry whenever this mob is attacked.
     */
    broadcast_anger_on_being_attacked?: boolean;
    /**
     * The amount of time in seconds that the entity will be angry.
     */
    duration?: number;
    /**
     * Variance in seconds added to the duration [-delta, delta].
     */
    duration_delta?: number;
    /**
     * The range of time in seconds to randomly wait before playing the sound again.
     */
    sound_interval?: [number, number] | {
      /**
       * The minimum interval.
       */
      range_min?: number;
      /**
       * The maximum interval.
       */
      range_max?: number;
    };
  };
  /**
   * Allows the actor to break doors assuming that that flags set up for the component to use in navigation.
   */
  "minecraft:annotation.break_door"?: {
    /**
     * The time in seconds required to break through doors.
     */
    break_time?: number;
    /**
     * The minimum difficulty that the world must be on for this entity to break doors.
     */
    min_difficulty?: string;
  };
  /**
   * Allows the actor to open doors assuming that that flags set up for the component to use in navigation.
   */
  "minecraft:annotation.open_door"?: {
    [key: string]: never;
  };
  /**
   * A component that does damage to entities that get within range.
   */
  "minecraft:area_attack"?: {
    /**
     * The type of damage that is applied to entities that enter the damage range.
     */
    cause?: DamageSource;
    /**
     * Attack cooldown (in seconds) for how often this entity can attack a target.
     */
    damage_cooldown?: number;
    /**
     * How much damage per tick is applied to entities that enter the damage range.
     */
    damage_per_tick?: number;
    /**
     * How close a hostile entity must be to have the damage applied.
     */
    damage_range?: number;
    /**
     * The set of entities that are valid to apply the damage to when within range.
     */
    entity_filter?: Filters;
    /**
     * If the entity should play their attack sound when attacking a target.
     */
    play_attack_sound?: boolean;
  };
  /**
   * Adds a cooldown to a mob. The intention of this cooldown is to be used to prevent the mob from attempting to aquire new attack targets.
   */
  "minecraft:attack_cooldown"?: {
    /**
     * Event to be runned when the cooldown is complete.
     */
    attack_cooldown_complete_event?: EventTriggerFiltered;
    /**
     * Amount of time in seconds for the cooldown. Can be specified as a number or a pair of numbers (Minimum and max).
     */
    attack_cooldown_time?: [number, number] | number;
  };
  /**
   * UNDOCUMENTED.
   */
  "minecraft:attack_damage"?: {
    /**
     * UNDOCUMENTED: value.
     */
    value?: number;
  };
  /**
   * Defines an entity's melee attack and any additional effects on it.
   */
  "minecraft:attack"?: {
    /**
     * A described range.
     */
    damage?: number | [number, number] | {
      /**
       * The minimum value of the range.
       */
      range_min?: number;
      /**
       * The maximum value of the range.
       */
      range_max?: number;
    };
    /**
     * Identifier of the status ailment to apply to an entity attacked by this entity's melee attack.
     */
    effect_name?: SpellEffects;
    /**
     * Duration in seconds of the status ailment applied to the damaged entity.
     */
    effect_duration?: number;
  };
  /**
   * UNDOCUMENTED.
   */
  "minecraft:balloonable"?: {
    /**
     * UNDOCUMENTED: mass.
     */
    mass?: number;
  };
  /**
   * Enables the component to drop an item as a barter exchange.
   */
  "minecraft:barter"?: {
    /**
     * Loot table that's used to drop a random item.
     */
    barter_table?: string;
    /**
     * Duration, in seconds, for which mob won't barter items if it was hurt.
     */
    cooldown_after_being_attacked?: number;
  };
  /**
   * Allows the player to detect and manuever on the scaffolding block.
   */
  "minecraft:block_climber"?: {
    [key: string]: never;
  };
  /**
   * Fires off a specified event when a block in the block list is broken within the sensor range.
   */
  "minecraft:block_sensor"?: {
    /**
     * The maximum radial distance in which a specified block can be detected. The biggest radius is 32.0.
     */
    sensor_radius?: number;
    /**
     * Blocks that will trigger the component when broken and what event will trigger.
     */
    on_break?: ({
      /**
       * List of blocks that will trigger the sensor.
       */
      block_list?: (ItemIdentifier)[];
      /**
       * Event to run when a block breaks.
       */
      on_block_broken?: string;
    })[];
    /**
     * List of sources that break the block to listen for. If none are specified, all block breaks will be detected.
     */
    sources?: (Filters)[];
  };
  /**
   * Defines the conditions and behavior of a rideable entity's boost.
   */
  "minecraft:boostable"?: {
    /**
     * Time in seconds for the boost.
     */
    duration?: number;
    /**
     * Factor by which the entity's normal speed increases. E.g. 2.0 means go twice as fast.
     */
    speed_multiplier?: number;
    /**
     * List of items that can be used to boost while riding this entity.
     */
    boost_items?: ({
      /**
       * This is the damage that the item will take each time it is used.
       */
      damage?: number;
      /**
       * UNDOCUMENTED.
       */
      item_damage?: number;
      /**
       * UNDOCUMENTED.
       */
      item?: ItemIdentifier | ItemIdentifier | {
        /**
         * UNDOCUMENTED.
         */
        item?: ItemIdentifier | ItemIdentifier;
      };
      /**
       * UNDOCUMENTED.
       */
      replace_item?: ItemIdentifier | ItemIdentifier | {
        /**
         * UNDOCUMENTED.
         */
        item?: ItemIdentifier | ItemIdentifier;
      };
    })[];
  };
  /**
   * The current state of the boss for updating the boss HUD.
   */
  "minecraft:boss"?: {
    /**
     * The Maximum distance from the boss at which the boss's health bar is present on the players screen.
     */
    hud_range?: number;
    /**
     * The name that will be displayed above the boss's health bar.
     */
    name?: string;
    /**
     * Whether the sky should darken in the presence of the boss.
     */
    should_darken_sky?: boolean;
  };
  /**
   * Specifies the blocks that this entity can break as it moves around.
   */
  "minecraft:break_blocks"?: {
    /**
     * A list of the blocks that can be broken as this entity moves around.
     */
    breakable_blocks?: (string)[];
  };
  /**
   * Defines what blocks this entity can breathe in and gives them the ability to suffocate.
   */
  "minecraft:breathable"?: {
    /**
     * Time in seconds the entity can hold its breath.
     */
    total_supply?: number;
    /**
     * Time in seconds between suffocation damage.
     */
    suffocate_time?: number;
    /**
     * Time in seconds to recover breath to maximum.
     */
    inhale_time?: number;
    /**
     * If true, this entity can breathe in air.
     */
    breathes_air?: boolean;
    /**
     * If true, this entity can breathe in water.
     */
    breathes_water?: boolean;
    /**
     * If true, this entity can breathe in lava.
     */
    breathes_lava?: boolean;
    /**
     * If true, this entity can breathe in solid blocks.
     */
    breathes_solids?: boolean;
    /**
     * If true, this entity will have visible bubbles while in water.
     */
    generates_bubbles?: boolean;
    /**
     * List of blocks this entity can breathe in, in addition to the above.
     */
    breathe_blocks?: (BlockReference)[];
    /**
     * List of blocks this entity can't breathe in, in addition to the above.
     */
    non_breathe_blocks?: (BlockReference)[];
  };
  /**
   * Defines the way an entity can get into the `love` state.
   */
  "minecraft:breedable"?: {
    /**
     * If true, entities can breed while sitting.
     */
    allow_sitting?: boolean;
    /**
     * If true, the entities will blend their attributes in the offspring after they breed. For example, horses blend their health, movement, and jump_strength in their offspring.
     */
    blend_attributes?: boolean;
    /**
     * Time in seconds before the Entity can breed again.
     */
    breed_cooldown?: number;
    /**
     * The list of items that can be used to get the entity into the `love` state.
     */
    breed_items?:
      | (ItemIdentifier | ItemIdentifier | {
        /**
         * UNDOCUMENTED.
         */
        item?: ItemIdentifier | ItemIdentifier;
      })[]
      | ItemIdentifier
      | ItemIdentifier
      | {
        /**
         * UNDOCUMENTED.
         */
        item?: ItemIdentifier | ItemIdentifier;
      };
    /**
     * The list of entity definitions that this entity can breed with.
     */
    breeds_with?: {
      /**
       * The entity definition of this entity's babies.
       */
      baby_type?: string;
      /**
       * Minecraft behavior event.
       */
      breed_event?: {
        /**
         * The event to fire.
         */
        event?: string;
        /**
         * The target of the event.
         */
        target?:
          | "baby"
          | "block"
          | "damager"
          | "other"
          | "parent"
          | "player"
          | "self"
          | "target";
        /**
         * UNDOCUMENTED.
         */
        filters?: Filters;
      };
      /**
       * The entity definition of this entity's mate.
       */
      mate_type?: string;
    } | ({
      /**
       * The entity definition of this entity's babies.
       */
      baby_type?: string;
      /**
       * Minecraft behavior event.
       */
      breed_event?: {
        /**
         * The event to fire.
         */
        event?: string;
        /**
         * The target of the event.
         */
        target?:
          | "baby"
          | "block"
          | "damager"
          | "other"
          | "parent"
          | "player"
          | "self"
          | "target";
        /**
         * UNDOCUMENTED.
         */
        filters?: Filters;
      };
      /**
       * The entity definition of this entity's mate.
       */
      mate_type?: string;
    })[];
    /**
     * Determines how likely the baby of parents with the same variant will deny that variant and take a random variant within the given range instead.
     */
    deny_parents_variant?: {
      /**
       * The percentage chance of denying the parents` variant.
       */
      chance?: number;
      /**
       * The inclusive maximum of the variant range.
       */
      max_variant?: number;
      /**
       * The inclusive minimum of the variant range.
       */
      min_variant?: number;
    };
    /**
     * The list of nearby block requirements to get the entity into the `love` state.
     */
    environment_requirements?: {
      /**
       * The block types required nearby for the entity to breed.
       */
      blocks?: (BlockReference)[] | BlockReference;
      /**
       * The number of the required block types nearby for the entity to breed.
       */
      count?: number;
      /**
       * How many blocks radius from the mob's center to search in for the required blocks. Bounded between 0 and 16.
       */
      radius?: number;
    } | ({
      /**
       * The block types required nearby for the entity to breed.
       */
      blocks?: (BlockReference)[] | BlockReference;
      /**
       * The number of the required block types nearby for the entity to breed.
       */
      count?: number;
      /**
       * How many blocks radius from the mob's center to search in for the required blocks. Bounded between 0 and 16.
       */
      radius?: number;
    })[];
    /**
     * Chance that up to 16 babies will spawn between 0.0 and 1.0, where 1.0 is 100%.
     */
    extra_baby_chance?: number;
    /**
     * The filters to run when attempting to fall in love.
     */
    love_filters?: Filters;
    /**
     * Determines how likely the babies are to NOT inherit one of their parent's variances. Values are between 0.0 and 1.0, with a higher number meaning more likely to mutate.
     */
    mutation_factor?: {
      /**
       * The percentage chance of a mutation on the entity's color.
       */
      color?: number;
      /**
       * The percentage chance of a mutation on the entity's extra variant type.
       */
      extra_variant?: number;
      /**
       * The percentage chance of a mutation on the entity's variant type.
       */
      variant?: number;
    };
    /**
     * If true, the entity will become pregnant instead of spawning a baby.
     */
    causes_pregnancy?: boolean;
    /**
     * If true, the babies will be automatically tamed if its parents are.
     */
    inherit_tamed?: boolean;
    /**
     * If true, the entity needs to be at full health before it can breed.
     */
    require_full_health?: boolean;
    /**
     * If true, the entities need to be tamed first before they can breed.
     */
    require_tame?: boolean;
    /**
     * The feed item used will transform to this item upon successful interaction. Format: itemName:auxValue
     */
    transform_to_item?: string;
  };
  /**
   * Defines the way an entity can get into the 'bribed' state.
   */
  "minecraft:bribeable"?: {
    /**
     * Time in seconds before the Entity can be bribed again.
     */
    bribe_cooldown?: number;
    /**
     * The list of items that can be used to bribe the entity.
     */
    bribe_items?: (ItemIdentifier | ItemIdentifier | {
      /**
       * UNDOCUMENTED.
       */
      item?: ItemIdentifier | ItemIdentifier;
    })[];
  };
  /**
   * Enables an entity to float on the specified liquid blocks.
   */
  "minecraft:buoyant"?: {
    /**
     * Base buoyancy used to calculate how much will a mob float.
     */
    base_buoyancy?: number;
    /**
     * Applies gravity each tick. Causes more of a wave simulation, but will cause more gravity to be applied outside liquids.
     */
    apply_gravity?: boolean;
    /**
     * Base buoyancy used to calculate how much will a mob float.
     */
    buoyancy?: number;
    /**
     * Probability for a big wave hitting the entity. Only used if `simulate_waves` is true.
     */
    big_wave_probability?: number;
    /**
     * Multiplier for the speed to make a big wave. Triggered depending on `big_wave_probability`.
     */
    big_wave_speed?: number;
    /**
     * How much an actor will be dragged down when the Buoyancy Component is removed.
     */
    drag_down_on_buoyancy_removed?: number;
    /**
     * List of blocks this entity can float on. Must be a liquid block.
     */
    liquid_blocks?: (BlockReference)[];
    /**
     * Should the movement simulate waves going through.
     */
    simulate_waves?: boolean;
  };
  /**
   * Specifies if/how a mob burns in daylight.
   */
  "minecraft:burns_in_daylight"?: {
    [key: string]: never;
  };
  /**
   * Allows this entity to climb up ladders.
   */
  "minecraft:can_climb"?: {
    [key: string]: never;
  };
  /**
   * Marks the entity as being able to fly, the pathfinder won't be restricted to paths where a solid block is required underneath it.
   */
  "minecraft:can_fly"?: {
    /**
     * Marks the entity as being able to fly, the pathfinder won't be restricted to paths where a solid block is required underneath it.
     */
    value?: boolean;
  };
  /**
   * Allows the entity to power jump like the horse does in vanilla.
   */
  "minecraft:can_power_jump"?: {
    [key: string]: never;
  };
  /**
   * Specifies hunt celebration behavior.
   */
  "minecraft:celebrate_hunt"?: {
    /**
     * If true, celebration will be broadcasted to other entities in the radius.
     */
    broadcast?: boolean;
    /**
     * The list of conditions that target of hunt must satisfy to initiate celebration.
     */
    celebration_targets?: Filters;
    /**
     * The sound event to play when the mob is celebrating.
     */
    celebrate_sound?: SoundEvent;
    /**
     * Duration, in seconds, of celebration.
     */
    duration?: number;
    /**
     * If broadcast is enabled, specifies the radius in which it will notify other entities for celebration.
     */
    radius?: number;
    /**
     * The range of time in seconds to randomly wait before playing the sound again.
     */
    sound_interval?: [number, number] | number | {
      /**
       * Minimum.
       */
      range_min?: number;
      /**
       * Maximum.
       */
      range_max?: number;
    };
  };
  /**
   * Sets the width and height of the Entity's collision box.
   */
  "minecraft:collision_box"?: {
    /**
     * Height of the collision box in blocks. A negative value will be assumed to be 0
     */
    height?: number;
    /**
     * Width and Depth of the collision box in blocks. A negative value will be assumed to be 0
     */
    width?: number;
  };
  /**
   * Defines the entity's color. Only works on vanilla entities that have predefined color values (sheep, llama, shulker).
   */
  "minecraft:color"?: {
    /**
     * The Palette Color value of the entity.
     */
    value?: number;
  };
  /**
   * Defines the entity's second texture color. Only works on vanilla entities that have a second predefined color values (tropical fish).
   */
  "minecraft:color2"?: {
    /**
     * The second Palette Color value of the entity.
     */
    value?: number;
  };
  /**
   * Gives Regeneration I and removes Mining Fatigue from the mob that kills the Actor`s attack target.
   */
  "minecraft:combat_regeneration"?: {
    /**
     * Determines if the mob will grant mobs of the same type combat buffs if they kill the target.
     */
    apply_to_family?: boolean;
    /**
     * Determines if the mob will grant itself the combat buffs if it kills the target.
     */
    apply_to_self?: boolean;
    /**
     * The duration in seconds of Regeneration I added to the mob.
     */
    regeneration_duration?: number;
  };
  /**
   * Defines the Conditional Spatial Update Bandwidth Optimizations of this entity.
   */
  "minecraft:conditional_bandwidth_optimization"?: {
    /**
     * The object containing the conditional bandwidth optimization values.
     */
    conditional_values?: ({
      /**
       * In relation to the optimization value, determines the maximum ticks spatial update packets can be not sent.
       */
      max_dropped_ticks?: number;
      /**
       * The maximum distance considered during bandwidth optimizations. Any value below the Maximum is interpolated to find optimization, and any value greater than or equal to this Maximum results in Maximum optimization.
       */
      max_optimized_distance?: number;
      /**
       * When set to true, smaller motion packets will be sent during drop packet intervals, resulting in the same amount of packets being sent as without optimizations but with much less data being sent. This should be used when actors are travelling very quickly or teleporting to prevent visual oddities.
       */
      use_motion_prediction_hints?: boolean;
      /**
       * Conditions that must be met for these optimization values to be used.
       */
      conditional_values?: (Filters)[];
    })[];
    /**
     * The object containing the default bandwidth optimization values.
     */
    default_values?: {
      /**
       * In relation to the optimization value, determines the maximum ticks spatial update packets can be not sent.
       */
      max_dropped_ticks?: number;
      /**
       * The maximum distance considered during bandwidth optimizations. Any value below the Maximum is interpolated to find optimization, and any value greater than or equal to this Maximum results in Maximum optimization.
       */
      max_optimized_distance?: number;
      /**
       * When set to true, smaller motion packets will be sent during drop packet intervals, resulting in the same amount of packets being sent as without optimizations but with much less data being sent. This should be used when actors are travelling very quickly or teleporting to prevent visual oddities.
       */
      use_motion_prediction_hints?: boolean;
    };
  };
  /**
   * List of hitboxes for melee and ranged hits against the entity.
   */
  "minecraft:custom_hit_test"?: {
    /**
     * Defines a hitbox size and pivot to test against.
     */
    hitboxes?: ({
      /**
       * Height of the hitbox in blocks. A negative value will be assumed to be 0.
       */
      width?: number;
      /**
       * Width and Depth of the hitbox in blocks. A negative value will be assumed to be 0.
       */
      height?: number;
      /**
       * The offset from the entity's anchor where the hitbox will spawn.
       */
      pivot?: [number, number, number];
    })[];
  };
  /**
   * Applies defined amount of damage to the entity at specified intervals.
   */
  "minecraft:damage_over_time"?: {
    /**
     * Amount of damage caused each hurt.
     */
    damage_per_hurt?: number;
    /**
     * Time in seconds between damage.
     */
    time_between_hurt?: number;
  };
  /**
   * Defines what events to call when this entity is damaged by specific entities or items.
   */
  "minecraft:damage_sensor"?: {
    /**
     * The list of triggers that fire when the environment conditions match the given filter criteria.
     */
    triggers?: ({
      /**
       * Type of damage that triggers the events.
       */
      cause?: DamageSource;
      /**
       * A modifier that adds to/removes from the base damage from the damage cause. It does not reduce damage to less than 0.
       */
      damage_modifier?: number;
      /**
       * A multiplier that modifies the base damage from the damage cause. If deals_damage is true the multiplier can only reduce the damage the entity will take to a minimum of 1.
       */
      damage_multiplier?: number;
      /**
       * If true, the damage dealt to the entity will take away health from it, set to false to make the entity ignore that damage.
       */
      deals_damage?: boolean;
      /**
       * Specifies filters for entity definitions and events.
       */
      on_damage?: EventTriggerFiltered;
      /**
       * Defines what sound to play, if any, when the on_damage filters are met.
       */
      on_damage_sound_event?: SoundEvent;
    })[] | {
      /**
       * Type of damage that triggers the events.
       */
      cause?: DamageSource;
      /**
       * A modifier that adds to/removes from the base damage from the damage cause. It does not reduce damage to less than 0.
       */
      damage_modifier?: number;
      /**
       * A multiplier that modifies the base damage from the damage cause. If deals_damage is true the multiplier can only reduce the damage the entity will take to a minimum of 1.
       */
      damage_multiplier?: number;
      /**
       * If true, the damage dealt to the entity will take away health from it, set to false to make the entity ignore that damage.
       */
      deals_damage?: boolean;
      /**
       * Specifies filters for entity definitions and events.
       */
      on_damage?: EventTriggerFiltered;
      /**
       * Defines what sound to play, if any, when the on_damage filters are met.
       */
      on_damage_sound_event?: SoundEvent;
    };
  };
  /**
   * Ability for a ridable entity to dash.
   */
  "minecraft:dash"?: {
    /**
     * The dash cooldown in seconds.
     */
    cooldown_time?: number;
    /**
     * Horizontal momentum of the dash.
     */
    horizontal_momentum?: number;
    /**
     * Vertical momentum of the dash.
     */
    vertical_momentum?: number;
  };
  /**
   * Sets this entity's default head rotation angle.
   */
  "minecraft:default_look_angle"?: {
    /**
     * Angle in degrees.
     */
    value?: number;
  };
  /**
   * Despawns the Actor when the despawn rules or optional filters evaluate to true.
   */
  "minecraft:despawn"?: {
    /**
     * Determines if `min_range_random_chance` is used in the standard despawn rules.
     */
    despawn_from_chance?: boolean;
    /**
     * Defines the minimum and maximum distance for despawn to occur.
     */
    despawn_from_distance?: {
      /**
       * Maximum distance for standard despawn rules to instantly despawn the mob.
       */
      max_distance?: number;
      /**
       * Minimum distance for standard despawn rules to try to despawn the mob.
       */
      min_distance?: number;
    };
    /**
     * Determines if the `min_range_inactivity_timer` is used in the standard despawn rules.
     */
    despawn_from_inactivity?: boolean;
    /**
     * Determines if the mob is instantly despawned at the edge of simulation distance in the standard despawn rules.
     */
    despawn_from_simulation_edge?: boolean;
    /**
     * The list of conditions that must be satisfied before the Actor is despawned. If a filter is defined then standard despawn rules are ignored.
     */
    filters?: Filters;
    /**
     * The amount of time in seconds that the mob must be inactive.
     */
    min_range_inactivity_timer?: number;
    /**
     * A random chance between 1 and the given value.
     */
    min_range_random_chance?: number;
    /**
     * If true, all entities linked to this entity in a child relationship (eg. leashed) will also be despawned.
     */
    remove_child_entities?: boolean;
  };
  /**
   * Adds a timer for drying out that will count down and fire `dried_out_event` or will stop as soon as the entity will get under rain or water and fire `stopped_drying_out_event`.
   */
  "minecraft:drying_out_timer"?: {
    /**
     * Event to fire when the drying out time runs out.
     */
    dried_out_event?: EventTrigger;
    /**
     * Event to fire when entity was already dried out but received increase in water supply.
     */
    recover_after_dried_out_event?: EventTrigger;
    /**
     * Event to fire when entity stopped drying out, for example got into water or under rain.
     */
    stopped_drying_out_event?: EventTrigger;
    /**
     * Amount of time in seconds to dry out fully.
     */
    total_time?: number;
    /**
     * Optional amount of additional time in seconds given by using splash water bottle on entity.
     */
    water_bottle_refill_time?: number;
  };
  /**
   * Allows a mob to join and migrate between villages and other dwellings.
   */
  "minecraft:dweller"?: {
    /**
     * The type of dwelling the mob wishes to join. Current Types: village
     */
    dwelling_type?: "village";
    /**
     * The role of which the mob plays in the dwelling. Current Roles: inhabitant, defender, hostile, passive.
     */
    dweller_role?: "inhabitant" | "defender" | "hostile" | "passive";
    /**
     * How often the mob checks on their dwelling status in ticks. Positive values only.
     */
    update_interval_base?: number;
    /**
     * The variant value in ticks that will be added to the update_interval_base.
     */
    update_interval_variant?: number;
    /**
     * Whether or not the mob can find and add POI's to the dwelling.
     */
    can_find_poi?: boolean;
    /**
     * How much reputation should the players be rewarded on first founding?.
     */
    first_founding_reward?: number;
    /**
     * Can this mob migrate between dwellings? Or does it only have its initial dwelling?.
     */
    can_migrate?: boolean;
    /**
     * A padding distance for checking if the mob is within the dwelling.
     */
    dwelling_bounds_tolerance?: number;
    /**
     * Allows the user to define a starting profession for this particular Dweller, instead of letting them choose organically. (They still need to gain experience from trading before this takes effect.)
     */
    preferred_profession?: string;
  };
  /**
   * Defines this entity's ability to trade with players.
   */
  "minecraft:economy_trade_table"?: {
    /**
     * Determines when the mob transforms, if the trades should be converted when the new mob has a economy_trade_table. When the trades are converted, the mob will generate a new trade list with their new trade table, but then it will try to convert any of the same trades over to have the same enchantments and user data. For example, if the original has a Emerald to Enchanted Iron Sword (Sharpness 1), and the new trade also has an Emerald for Enchanted Iron Sword, then the enchantment will be Sharpness 1.
     */
    convert_trades_economy?: boolean;
    /**
     * How much should the discount be modified by when the player has cured the Zombie Villager. Can be specified as a pair of numbers (low-tier trade discount and high-tier trade discount)
     */
    cured_discount?: [number, number];
    /**
     * Name to be displayed while trading with this entity.
     */
    display_name?: string;
    /**
     * Used in legacy prices to determine how much should Demand be modified by when the player has the Hero of the Village mob effect.
     */
    hero_demand_discount?: number;
    /**
     * The Maximum the discount can be modified by when the player has cured the Zombie Villager. Can be specified as a pair of numbers (low-tier trade discount and high-tier trade discount)
     */
    max_cured_discount?: [number, number];
    /**
     * The Maximum the discount can be modified by when the player has cured a nearby Zombie Villager.
     */
    max_nearby_cured_discount?: number;
    /**
     * How much should the discount be modified by when the player has cured a nearby Zombie Villager.
     */
    nearby_cured_discount?: number;
    /**
     * Used to determine if trading with entity opens the new trade screen.
     */
    new_screen?: boolean;
    /**
     * Determines if the trades should persist when the mob transforms. This makes it so that the next time the mob is transformed to something with a trade_table or economy_trade_table, then it keeps their trades.
     */
    persist_trades?: boolean;
    /**
     * Show an in game trade screen when interacting with the mob.
     */
    show_trade_screen?: boolean;
    /**
     * File path relative to the resource pack root for this entity's trades.
     */
    table?: string;
    /**
     * Determines whether the legacy formula is used to determines the trade prices.
     */
    use_legacy_price_formula?: boolean;
  };
  /**
   * A component that fires an event when a set of conditions are met by other entities within the defined range.
   */
  "minecraft:entity_sensor"?: {
    /**
     * The maximum number of entities that must pass the filter conditions for the event to send.
     */
    maximum_count?: number;
    /**
     * The minimum number of entities that must pass the filter conditions for the event to send.
     */
    minimum_count?: number;
    /**
     * If true the sensor range is additive on top of the entity's size.
     */
    relative_range?: boolean;
    /**
     * If true requires all nearby entities to pass the filter conditions for the event to send.
     */
    require_all?: boolean;
    /**
     * The maximum distance another entity can be from this and have the filters checked against it.
     */
    sensor_range?: number;
    /**
     * UNDOCUMENTED.
     */
    event_filters?: Filters;
    /**
     * event.
     */
    event?: string;
  };
  /**
   * Creates a trigger based on environment conditions.
   */
  "minecraft:environment_sensor"?: {
    /**
     * The list of triggers that fire when the environment conditions match the given filter criteria.
     */
    triggers?: (EventTriggerFiltered)[] | EventTriggerFiltered;
  };
  /**
   * The entity puts on the desired equipment.
   */
  "minecraft:equip_item"?: {
    [key: string]: never;
  };
  /**
   * Sets the equipment table to use for the entity.
   */
  "minecraft:equipment"?: {
    /**
     * A list of slots with the chance to drop an equipped item from that slot.
     */
    slot_drop_chance?: ({
      /**
       * The chance that the item in this slot will drop.
       */
      drop_chance?: number;
      /**
       * The slot in which the item will drop from.
       */
      slot?: string;
    })[];
    /**
     * The file path to the equipment table, relative to the behavior pack's root.
     */
    table?: string;
  };
  /**
   * Defines an entity's behavior for having items equipped to it.
   */
  "minecraft:equippable"?: {
    /**
     * List of slots and the item that can be equipped.
     */
    slots?: ({
      /**
       * The slot number of this slot.
       */
      slot?: number;
      /**
       * The list of items that can go in this slot.
       */
      accepted_items?: (ItemIdentifier | ItemIdentifier | {
        /**
         * UNDOCUMENTED.
         */
        item?: ItemIdentifier | ItemIdentifier;
      })[];
      /**
       * UNDOCUMENTED.
       */
      item?: ItemIdentifier | ItemIdentifier | {
        /**
         * UNDOCUMENTED.
         */
        item?: ItemIdentifier | ItemIdentifier;
      };
      /**
       * Text to be displayed when the entity can be equipped with this item when playing with Touch-screen controls.
       */
      interact_text?: string;
      /**
       * Event to trigger when this entity is equipped with this item.
       */
      on_equip?: EventTrigger;
      /**
       * Event to trigger when this item is removed from this entity.
       */
      on_unequip?: EventTrigger;
    })[];
  };
  /**
   * Defines how much exhaustion each player action should take.
   */
  "minecraft:exhaustion_values"?: {
    /**
     * Amount of exhaustion applied when attacking.
     */
    attack?: number;
    /**
     * Amount of exhaustion applied when taking damage.
     */
    damage?: number;
    /**
     * Amount of exhaustion applied when healed through food regeneration.
     */
    heal?: number;
    /**
     * Amount of exhaustion applied when jumping.
     */
    jump?: number;
    /**
     * Amount of exhaustion applied when mining.
     */
    mine?: number;
    /**
     * Amount of exhaustion applied when sprinting.
     */
    sprint?: number;
    /**
     * Amount of exhaustion applied when sprint jumping.
     */
    sprint_jump?: number;
    /**
     * Amount of exhaustion applied when swimming.
     */
    swim?: number;
    /**
     * Amount of exhaustion applied when walking.
     */
    walk?: number;
  };
  /**
   * Defines the amount of experience rewarded when the entity dies or is successfully bred.
   */
  "minecraft:experience_reward"?: {
    /**
     * A molang expression defining the amount of experience rewarded when this entity is successfully bred. An array of expressions adds each expression's result together for a final total.
     */
    on_bred?: string | number;
    /**
     * A molang expression defining the amount of experience rewarded when this entity dies. An array of expressions adds each expression's result together for a final total.
     */
    on_death?: string | number;
  };
  /**
   * Defines how the entity explodes.
   */
  "minecraft:explode"?: {
    /**
     * If true, the explosion will destroy blocks in the explosion radius.
     */
    breaks_blocks?: boolean;
    /**
     * If true, blocks in the explosion radius will be set on fire.
     */
    causes_fire?: boolean;
    /**
     * If true, whether the explosion breaks blocks is affected by the mob griefing game rule.
     */
    destroy_affected_by_griefing?: boolean;
    /**
     * If true, whether the explosion causes fire is affected by the mob griefing game rule.
     */
    fire_affected_by_griefing?: boolean;
    /**
     * The range for the random amount of time the fuse will be lit before exploding, a negative value means the explosion will be immediate.
     */
    fuse_length?: [number, number] | number;
    /**
     * If true, the fuse is already lit when this component is added to the entity.
     */
    fuse_lit?: boolean;
    /**
     * A blocks explosion resistance will be capped at this value when an explosion occurs.
     */
    max_resistance?: number;
    /**
     * The radius of the explosion in blocks and the amount of damage the explosion deals.
     */
    power?: number;
  };
  /**
   * UNDOCUMENTED.
   */
  "minecraft:fall_damage"?: {
    /**
     * UNDOCUMENTED: value.
     */
    value?: number;
  };
  /**
   * Sets that this entity doesn't take damage from fire.
   */
  "minecraft:fire_immune"?: {
    [key: string]: never;
  };
  /**
   * Sets that this entity can float in liquid blocks.
   */
  "minecraft:floats_in_liquid"?: {
    [key: string]: never;
  };
  /**
   * Allows entities to flock in groups in water or not.
   */
  "minecraft:flocking"?: {
    /**
     * The amount of blocks away the entity will look at to push away from.
     */
    block_distance?: number;
    /**
     * The weight of the push back away from blocks.
     */
    block_weight?: number;
    /**
     * The amount of push back given to a flocker that breaches out of the water.
     */
    breach_influence?: number;
    /**
     * The threshold in which to start applying cohesion.
     */
    cohesion_threshold?: number;
    /**
     * The weight applied for the cohesion steering of the flock.
     */
    cohesion_weight?: number;
    /**
     * The weight on which to apply on the goal output.
     */
    goal_weight?: number;
    /**
     * Determines the high bound amount of entities that can be allowed in the flock.
     */
    high_flock_limit?: number;
    /**
     * Tells the Flocking Component if the entity exists in water.
     */
    in_water?: boolean;
    /**
     * The area around the entity that allows others to be added to the flock.
     */
    influence_radius?: number;
    /**
     * The distance in which the flocker will stop applying cohesion.
     */
    innner_cohesion_threshold?: number;
    /**
     * The percentage chance between 0-1 that a fish will spawn and not want to join flocks. Invalid values will be capped at the end points.
     */
    loner_chance?: number;
    /**
     * Determines the low bound amount of entities that can be allowed in the flock.
     */
    low_flock_limit?: number;
    /**
     * Tells the flockers that they can only match similar entities that also match the variant, mark variants, and color data of the other potential flockers.
     */
    match_variants?: boolean;
    /**
     * The Maximum height allowable in the air or water.
     */
    max_height?: number;
    /**
     * The Minimum height allowable in the air or water.
     */
    min_height?: number;
    /**
     * The distance that is determined to be to close to another flocking and to start applying separation.
     */
    separation_threshold?: number;
    /**
     * The weight applied to the separation of the flock.
     */
    separation_weight?: number;
    /**
     * Tells the flockers that they will follow flocks based on the center of mass.
     */
    use_center_of_mass?: boolean;
  };
  /**
   * Speed in Blocks that this entity flies at.
   */
  "minecraft:flying_speed"?: {
    /**
     * Flying speed in blocks per tick.
     */
    value?: number;
  };
  /**
   * UNDOCUMENTED.
   */
  "minecraft:follow_range"?: {
    /**
     * UNDOCUMENTED.
     */
    value?: number;
    /**
     * UNDOCUMENTED.
     */
    max?: number;
  };
  /**
   * Defines how much does friction affect this entity.
   */
  "minecraft:friction_modifier"?: {
    /**
     * The higher the number, the more the friction affects this entity. A value of 1.0 means regular friction, while 2.0 means twice as much
     */
    value?: number;
  };
  /**
   * Allows an entity to emit `entityMove`, `swim` and `flap` game events, depending on the block the entity is moving through. It is added by default to every mob. Add it again to override its behavior.
   */
  "minecraft:game_event_movement_tracking"?: {
    /**
     * If true, the `flap` game event will be emitted when the entity moves through air.
     */
    emit_flap?: boolean;
    /**
     * If true, the `entityMove` game event will be emitted when the entity moves on ground or through a solid.
     */
    emit_move?: boolean;
    /**
     * If true, the `swim` game event will be emitted when the entity moves through a liquid.
     */
    emit_swim?: boolean;
  };
  /**
   * Defines the way a mob's genes and alleles are passed on to it's offspring, and how those traits manifest in the child. Compatible parent genes are crossed together, the alleles are handed down from the parents to the child, and any matching genetic variants fire off JSON events to modify the child and express the traits.
   */
  "minecraft:genetics"?: {
    /**
     * Chance that an allele will be replaced with a random one instead of the parent's allele during birth.
     */
    mutation_rate?: number;
    /**
     * The list of genes that this entity has and will cross with a partner during breeding.
     */
    genes?: ({
      /**
       * UNDOCUMENTED.
       */
      allele_range?: number | {
        /**
         * Lower bound of the vaues.
         */
        range_min?: number;
        /**
         * Upper bound of the vaues.
         */
        range_max?: number;
      };
      /**
       * The list of genetic variants for this gene. These check for particular allele combinations and fire events when all of them are satisfied.
       */
      genetic_variants?: ({
        /**
         * Event to run when this mob is created and matches the above allele conditions.
         */
        birth_event?: EventTrigger;
        /**
         * UNDOCUMENTED.
         */
        both_allele?: number | {
          /**
           * Lower bound of the vaues.
           */
          range_min?: number;
          /**
           * Upper bound of the vaues.
           */
          range_max?: number;
        };
        /**
         * If this value is non-negative, compare both the mob's main and hidden alleles with this value for a match with either. Can also be a range of integers.
         */
        either_allele?: number;
        /**
         * If this value is non-negative, compare the mob's hidden allele with this value for a match. Can also be a range of integers.
         */
        hidden_allele?: number;
        /**
         * UNDOCUMENTED.
         */
        main_allele?: number | {
          /**
           * Lower bound of the vaues.
           */
          range_min?: number;
          /**
           * Upper bound of the vaues.
           */
          range_max?: number;
        };
        /**
         * If this value is non-negative, overrides the chance for this gene that an allele will be replaced with a random one instead of the parent's allele during birth. Non-negative values greater than 1 will be the same as the value 1.
         */
        mutation_rate?: number;
      })[];
      /**
       * The name of the gene.
       */
      name?: string;
    })[];
  };
  /**
   * Defines sets of items that can be used to trigger events when used on this entity. The item will also be taken and placed in the entity's inventory.
   */
  "minecraft:giveable"?: {
    /**
     * Defines sets of items that can be used to trigger events when used on this entity. The item will also be taken and placed in the entity's inventory.
     */
    triggers?: {
      /**
       * An optional cool down in seconds to prevent spamming interactions.
       */
      cooldown?: number;
      /**
       * The list of items that can be given to the entity to place in their inventory.
       */
      items?: (ItemIdentifier | ItemIdentifier | {
        /**
         * UNDOCUMENTED.
         */
        item?: ItemIdentifier | ItemIdentifier;
      })[];
      /**
       * Event to fire when the correct item is given.
       */
      on_give?: EventTrigger;
    };
  };
  /**
   * Sets the offset from the ground that the entity is actually at.
   */
  "minecraft:ground_offset"?: {
    /**
     * The value of the entity's offset from the terrain, in blocks.
     */
    value?: number;
  };
  /**
   * Keeps track of entity group size in the given radius.
   */
  "minecraft:group_size"?: {
    /**
     * The list of conditions that must be satisfied for other entities to be counted towards group size.
     */
    filters?: Filters;
    /**
     * Radius from center of entity.
     */
    radius?: number;
  };
  /**
   * Could increase crop growth when entity walks over crop.
   */
  "minecraft:grows_crop"?: {
    /**
     * Value between 0-1. Chance of success per tick.
     */
    chance?: number;
    /**
     * Number of charges.
     */
    charges?: number;
  };
  /**
   * Defines the interactions with this entity for healing it.
   */
  "minecraft:healable"?: {
    /**
     * UNDOCUMENTED.
     */
    filters?: Filters;
    /**
     * Determines if item can be used regardless of entity being at full health.
     */
    force_use?: boolean;
    /**
     * The array of items that can be used to heal this entity.
     */
    items?: ({
      /**
       * The filter group that defines the conditions for using this item to heal the entity.
       */
      filters?: Filters;
      /**
       * The amount of health this entity gains when fed this item.
       */
      heal_amount?: number;
      /**
       * UNDOCUMENTED.
       */
      item?: ItemIdentifier | ItemIdentifier | {
        /**
         * UNDOCUMENTED.
         */
        item?: ItemIdentifier | ItemIdentifier;
      };
      /**
       * UNDOCUMENTED.
       */
      effects?: {
        /**
         * UNDOCUMENTED.
         */
        name?: string;
        /**
         * The duration of the effect.
         */
        duration?: number;
        /**
         * The amplifier of the effect.
         */
        amplifier?: number;
      } | ({
        /**
         * UNDOCUMENTED.
         */
        name?: string;
        /**
         * The duration of the effect.
         */
        duration?: number;
        /**
         * The amplifier of the effect.
         */
        amplifier?: number;
      })[];
    })[];
  };
  /**
   * Specifies how much life an entity has when spawned.
   */
  "minecraft:health"?: {
    /**
     * The maximum starting health an entity has.
     */
    max?: number;
    /**
     * The amount of health an entity to start with by default.
     */
    value?: number | {
      /**
       * The minimum amount of health this mob could have.
       */
      range_min?: number;
      /**
       * The maximum amount of health this mob could have.
       */
      range_max?: number;
    };
  };
  /**
   * defines the entity's heartbeat..
   */
  "minecraft:heartbeat"?: {
    /**
     * The minecraft molang definition that results in a float.
     */
    interval?: string | number;
    /**
     * Level sound event to be played as the heartbeat sound.
     */
    sound_event?: string;
  };
  /**
   * UNDOCUMENTED.
   */
  "minecraft:hide"?: {
    [key: string]: never;
  };
  /**
   * Saves a home pos for when the the entity is spawned.
   */
  "minecraft:home"?: {
    /**
     * The radius that the entity will be restricted to in relation to its home.
     */
    restriction_radius?: number;
    /**
     * Optional block list that the home position will be associated with. If any of the blocks no longer exist at that position, the home restriction is removed. Example syntax: minecraft:sand. Not supported: minecraft:sand:1
     */
    home_block_list?: (ItemIdentifier)[];
  };
  /**
   * Allows this mob to jump higher when being ridden by a player.
   */
  "minecraft:horse.jump_strength"?: {
    /**
     * The multiplier to apply to the jumping height.
     */
    value?: {
      /**
       * UNDOCUMENTED.
       */
      range_min?: number;
      /**
       * UNDOCUMENTED.
       */
      range_max?: number;
    } | number;
  };
  /**
   * Defines a set of conditions under which an entity should take damage.
   */
  "minecraft:hurt_on_condition"?: {
    /**
     * An array of conditions used to compare the event to.
     */
    damage_conditions?: ({
      /**
       * UNDOCUMENTED.
       */
      filters?: Filters;
      /**
       * Damage cause.
       */
      cause?: DamageSource;
      /**
       * Amount of damage done each tick that the conditions are met.
       */
      damage_per_tick?: number;
    })[];
  };
  /**
   * Specifies if an actor is hurt when wet.
   */
  "minecraft:hurt_when_wet"?: {
    [key: string]: never;
  };
  /**
   * When configured as a rideable entity, the entity will be controlled using WASD controls.
   */
  "minecraft:input_ground_controlled"?: {
    [key: string]: never;
  };
  /**
   * Verifies whether the entity is inside any of the listed blocks.
   */
  "minecraft:inside_block_notifier"?: {
    /**
     * List of blocks, with certain block states, that we are monitoring to see if the entity is inside.
     */
    block_list?: ({
      /**
       * UNDOCUMENTED.
       */
      block?: {
        /**
         * The block id, for example: `minecraft:air'.
         */
        name?: string;
        /**
         * The block states.
         */
        states?: {
          [key: string]: never;
        };
      };
      /**
       * Event to run when this mob enters a valid block.
       */
      entered_block_event?: EventTrigger;
      /**
       * Event to run when this mob leaves a valid block.
       */
      exited_block_event?: EventTrigger;
    })[];
  };
  /**
   * Adds a timer since last rested to see if phantoms should spawn.
   */
  "minecraft:insomnia"?: {
    /**
     * Number of days the mob has to stay up until the insomnia effect begins.
     */
    days_until_insomnia?: number;
  };
  /**
   * Despawns the Actor immediately.
   */
  "minecraft:instant_despawn"?: {
    /**
     * If true, all entities linked to this entity in a child relationship (eg. leashed) will also be despawned.
     */
    remove_child_entities?: boolean;
  };
  /**
   * Defines interactions with this entity.
   */
  "minecraft:interact"?: {
    /**
     * The interactions.
     */
    interactions?: {
      /**
       * Loot table with items to add to the player's inventory upon successful interaction.
       */
      add_items?: {
        /**
         * File path, relative to the Behavior Pack's path, to the loot table file.
         */
        table?: string;
      };
      /**
       * Time in seconds before this entity can be interacted with again.
       */
      cooldown?: number;
      /**
       * Allows entity to admire the item. Requires "minecraft:admire_item" and "minecraft:behavior.admire_item" to work.
       */
      admire?: boolean;
      /**
       * Allows entity to barter with the item. Requires "minecraft:barter" to work.
       */
      barter?: boolean;
      /**
       * Time in seconds before this entity can be interacted with after being attacked.
       */
      cooldown_after_being_attacked?: number;
      /**
       * The amount of health this entity will recover or hurt when interacting with this item. Negative values will harm the entity.
       */
      health_amount?: number;
      /**
       * The amount of damage the item will take when used to interact with this entity. A value of 0 means the item won't lose durability.
       */
      hurt_item?: number;
      /**
       * Text to show when the player is able to interact in this way with this entity when playing with Touch-screen controls.
       */
      interact_text?: string;
      /**
       * Event to fire when the interaction occurs.
       */
      on_interact?: EventTriggerFiltered;
      /**
       * Particle effect that will be triggered at the start of the interaction.
       */
      particle_on_start?: {
        /**
         * Whether or not the particle will appear closer to who performed the interaction.
         */
        particle_offset_towards_interactor?: boolean;
        /**
         * The type of particle that will be spawned.
         */
        particle_type?: string;
        /**
         * Will offset the particle this amount in the y direction.
         */
        particle_y_offset?: number;
      };
      /**
       * List of sounds to play when the interaction occurs.
       */
      play_sounds?: SoundEvent;
      /**
       * List of entities to spawn when the interaction occurs.
       */
      spawn_entities?: string;
      /**
       * Loot table with items to drop on the ground upon successful interaction.
       */
      spawn_items?: {
        /**
         * File path, relative to the Behavior Pack's path, to the loot table file.
         */
        table?: string;
      };
      /**
       * If true, the player will do the "swing" animation when interacting with this entity.
       */
      swing?: boolean;
      /**
       * The feed item used will transform to this item upon successful interaction. Format: itemName:auxValue
       */
      transform_to_item?: string;
      /**
       * If true, the interaction will use an item.
       */
      use_item?: boolean;
      /**
       * Vibration to emit when the interaction occurs. Admitted values are entity_interact (used by default), shear, and none (no vibration emitted).
       */
      vibration?: string;
      /**
       * UNDOCUMENTED Item to give to the player upon successful interaction.
       */
      give_item?: boolean;
      /**
       * UNDOCUMENTED Takes an item from the player.
       */
      take_item?: boolean;
    } | ({
      /**
       * Loot table with items to add to the player's inventory upon successful interaction.
       */
      add_items?: {
        /**
         * File path, relative to the Behavior Pack's path, to the loot table file.
         */
        table?: string;
      };
      /**
       * Time in seconds before this entity can be interacted with again.
       */
      cooldown?: number;
      /**
       * Allows entity to admire the item. Requires "minecraft:admire_item" and "minecraft:behavior.admire_item" to work.
       */
      admire?: boolean;
      /**
       * Allows entity to barter with the item. Requires "minecraft:barter" to work.
       */
      barter?: boolean;
      /**
       * Time in seconds before this entity can be interacted with after being attacked.
       */
      cooldown_after_being_attacked?: number;
      /**
       * The amount of health this entity will recover or hurt when interacting with this item. Negative values will harm the entity.
       */
      health_amount?: number;
      /**
       * The amount of damage the item will take when used to interact with this entity. A value of 0 means the item won't lose durability.
       */
      hurt_item?: number;
      /**
       * Text to show when the player is able to interact in this way with this entity when playing with Touch-screen controls.
       */
      interact_text?: string;
      /**
       * Event to fire when the interaction occurs.
       */
      on_interact?: EventTriggerFiltered;
      /**
       * Particle effect that will be triggered at the start of the interaction.
       */
      particle_on_start?: {
        /**
         * Whether or not the particle will appear closer to who performed the interaction.
         */
        particle_offset_towards_interactor?: boolean;
        /**
         * The type of particle that will be spawned.
         */
        particle_type?: string;
        /**
         * Will offset the particle this amount in the y direction.
         */
        particle_y_offset?: number;
      };
      /**
       * List of sounds to play when the interaction occurs.
       */
      play_sounds?: SoundEvent;
      /**
       * List of entities to spawn when the interaction occurs.
       */
      spawn_entities?: string;
      /**
       * Loot table with items to drop on the ground upon successful interaction.
       */
      spawn_items?: {
        /**
         * File path, relative to the Behavior Pack's path, to the loot table file.
         */
        table?: string;
      };
      /**
       * If true, the player will do the "swing" animation when interacting with this entity.
       */
      swing?: boolean;
      /**
       * The feed item used will transform to this item upon successful interaction. Format: itemName:auxValue
       */
      transform_to_item?: string;
      /**
       * If true, the interaction will use an item.
       */
      use_item?: boolean;
      /**
       * Vibration to emit when the interaction occurs. Admitted values are entity_interact (used by default), shear, and none (no vibration emitted).
       */
      vibration?: string;
      /**
       * UNDOCUMENTED Item to give to the player upon successful interaction.
       */
      give_item?: boolean;
      /**
       * UNDOCUMENTED Takes an item from the player.
       */
      take_item?: boolean;
    })[];
  };
  /**
   * Defines this entity's inventory properties.
   */
  "minecraft:inventory"?: {
    /**
     * Number of slots that this entity can gain per extra strength.
     */
    additional_slots_per_strength?: number;
    /**
     * If true, the contents of this inventory can be removed by a hopper.
     */
    can_be_siphoned_from?: boolean;
    /**
     * Type of container this entity has. Can be horse, minecart_chest, chest_boat, minecart_hopper, inventory, container or hopper
     */
    container_type?:
      | "horse"
      | "minecart_chest"
      | "chest_boat"
      | "minecart_hopper"
      | "inventory"
      | "container"
      | "hopper";
    /**
     * Number of slots the container has.
     */
    inventory_size?: number;
    /**
     * If true, only the entity can access the inventory.
     */
    private?: boolean;
    /**
     * If true, the entity's inventory can only be accessed by its owner or itself.
     */
    restrict_to_owner?: boolean;
  };
  /**
   * Sets that this entity is a baby.
   */
  "minecraft:is_baby"?: {
    [key: string]: never;
  };
  /**
   * Sets that this entity is charged.
   */
  "minecraft:is_charged"?: {
    [key: string]: never;
  };
  /**
   * Sets that this entity is currently carrying a chest.
   */
  "minecraft:is_chested"?: {
    [key: string]: never;
  };
  /**
   * Allows dyes to be used on this entity to change its color.
   */
  "minecraft:is_dyeable"?: {
    /**
     * The text that will display when interacting with this entity with a dye when playing with Touch-screen controls.
     */
    interact_text?: string;
  };
  /**
   * Sets that this entity can hide from hostile mobs while invisible.
   */
  "minecraft:is_hidden_when_invisible"?: {
    [key: string]: never;
  };
  /**
   * Sets that this entity is currently on fire.
   */
  "minecraft:is_ignited"?: {
    [key: string]: never;
  };
  /**
   * Sets that this entity is an illager captain.
   */
  "minecraft:is_illager_captain"?: {
    [key: string]: never;
  };
  /**
   * Sets that this entity is currently saddled.
   */
  "minecraft:is_saddled"?: {
    [key: string]: never;
  };
  /**
   * Sets that this entity is currently shaking.
   */
  "minecraft:is_shaking"?: {
    [key: string]: never;
  };
  /**
   * Sets that this entity is currently sheared.
   */
  "minecraft:is_sheared"?: {
    [key: string]: never;
  };
  /**
   * Sets that this entity can be stacked.
   */
  "minecraft:is_stackable"?: {
    /**
     * UNDOCUMENTED.
     */
    value?: boolean;
  };
  /**
   * Sets that this entity is currently stunned.
   */
  "minecraft:is_stunned"?: {
    [key: string]: never;
  };
  /**
   * Sets that this entity is currently tamed.
   */
  "minecraft:is_tamed"?: {
    [key: string]: never;
  };
  /**
   * Efines what items can be used to control this entity while ridden.
   */
  "minecraft:item_controllable"?: {
    /**
     * List of items that can be used to control this entity.
     */
    control_items?: (string)[] | string;
  };
  /**
   * Determines that this entity is an item hopper.
   */
  "minecraft:item_hopper"?: {
    [key: string]: never;
  };
  /**
   * Defines a dynamic type jump control that will change jump properties based on the speed modifier of the mob.
   */
  "minecraft:jump.dynamic"?: {
    [key: string]: never;
  };
  /**
   * Gives the entity the ability to jump.
   */
  "minecraft:jump.static"?: {
    /**
     * The initial vertical velocity for the jump.
     */
    jump_power?: number;
  };
  /**
   * Allows an entity to resist being knocked backwards by a melee attack.
   */
  "minecraft:knockback_resistance"?: {
    /**
     * Percentage of knockback to reduce with 1.0 being 100% reduction.
     */
    value?: number;
    /**
     * The maximum amount of knockback resistance that can be applied to the entity.
     */
    maximum?: number;
  };
  /**
   * UNDOCUMENTED.
   */
  "minecraft:lava_movement"?: {
    /**
     * UNDOCUMENTED.
     */
    value?: number;
  };
  /**
   * Allows this entity to be leashed and defines the conditions and events for this entity when is leashed.
   */
  "minecraft:leashable"?: {
    /**
     * If true, players can leash this entity even if it is already leashed to another mob.
     */
    can_be_stolen?: boolean;
    /**
     * Distance in blocks at which the leash stiffens, restricting movement.
     */
    hard_distance?: number;
    /**
     * Distance in blocks at which the leash breaks.
     */
    max_distance?: number;
    /**
     * Event to call when this entity is leashed.
     */
    on_leash?: EventTrigger;
    /**
     * Event to call when this entity is unleashed.
     */
    on_unleash?: EventTrigger;
    /**
     * Distance in blocks at which the `spring` effect starts acting to keep this entity close to the entity that leashed it.
     */
    soft_distance?: number;
  };
  /**
   * Defines the behavior when another entity looks at this entity.
   */
  "minecraft:lookat"?: {
    /**
     * If true, invulnerable entities (e.g. Players in creative mode) are considered valid targets.
     */
    allow_invulnerable?: boolean;
    /**
     * Defines the entities that can trigger this component.
     */
    filters?: Filters;
    /**
     * A described range.
     */
    look_cooldown?: number | [number, number] | {
      /**
       * The minimum value of the range.
       */
      range_min?: number;
      /**
       * The maximum value of the range.
       */
      range_max?: number;
    };
    /**
     * The event identifier to run when the entities specified in filters look at this entity.
     */
    look_event?: EventTrigger;
    /**
     * Maximum distance this entity will look for another entity looking at it.
     */
    search_radius?: number;
    /**
     * If true, this entity will set the attack target as the entity that looked at it.
     */
    set_target?: boolean;
  };
  /**
   * sets the loot table for what items this entity drops upon death.
   */
  "minecraft:loot"?: {
    /**
     * The path to the loot table, relative to the Behavior Pack's root.
     */
    table?: string;
  };
  /**
   * This component is used to implement part of the Wandering Trader behavior.
   */
  "minecraft:managed_wandering_trader"?: {
    [key: string]: never;
  };
  /**
   * Additional variant value. Can be used to further differentiate variants.
   */
  "minecraft:mark_variant"?: {
    /**
     * The ID of the variant. By convention, 0 is the ID of the base entity
     */
    value?: number;
  };
  /**
   * A component that applies a mob effect to entities that get within range.
   */
  "minecraft:mob_effect"?: {
    /**
     * Time in seconds to wait between each application of the effect.
     */
    cooldown_time?: number;
    /**
     * How close a hostile entity must be to have the mob effect applied.
     */
    effect_range?: number;
    /**
     * How long the applied mob effect lasts in seconds.
     */
    effect_time?: number;
    /**
     * Filter to use for conditions.
     */
    entity_filter?: Filters;
    /**
     * The mob effect that is applied to entities that enter this entities effect range.
     */
    mob_effect?: SpellEffects;
  };
  /**
   * Sets the offset used to determine the next step distance for playing a movement sound.
   */
  "minecraft:movement_sound_distance_offset"?: {
    /**
     * The higher the number, the less often the movement sound will be played.
     */
    value?: number;
  };
  /**
   * This move control allows the mob to swim in water and walk on land.
   */
  "minecraft:movement.amphibious"?: {
    /**
     * The maximum number in degrees the mob can turn per tick.
     */
    max_turn?: number;
  };
  /**
   * defines the movement of an entity.
   */
  "minecraft:movement.basic"?: {
    /**
     * The maximum number in degrees the mob can turn per tick.
     */
    max_turn?: number;
  };
  /**
   * This move control causes the mob to fly.
   */
  "minecraft:movement.fly"?: {
    /**
     * The maximum number in degrees the mob can turn per tick.
     */
    max_turn?: number;
  };
  /**
   * This move control allows a mob to fly, swim, climb, etc.
   */
  "minecraft:movement.generic"?: {
    /**
     * The maximum number in degrees the mob can turn per tick.
     */
    max_turn?: number;
  };
  /**
   * This is the move control for a flying mob that has a gliding movement.
   */
  "minecraft:movement.glide"?: {
    /**
     * The maximum number in degrees the mob can turn per tick.
     */
    max_turn?: number;
    /**
     * UNDOCUMENTED.
     */
    start_speed?: number;
    /**
     * UNDOCUMENTED.
     */
    speed_when_turning?: number;
  };
  /**
   * This move control causes the mob to hover.
   */
  "minecraft:movement.hover"?: {
    /**
     * The maximum number in degrees the mob can turn per tick.
     */
    max_turn?: number;
  };
  /**
   * Move control that causes the mob to jump as it moves with a specified delay between jumps.
   */
  "minecraft:movement.jump"?: {
    /**
     * Delay after landing when using the slime move control.
     */
    jump_delay?: [number, number];
    /**
     * The maximum number in degrees the mob can turn per tick.
     */
    max_turn?: number;
  };
  /**
   * This move control causes the mob to hop as it moves.
   */
  "minecraft:movement.skip"?: {
    /**
     * The maximum number in degrees the mob can turn per tick.
     */
    max_turn?: number;
  };
  /**
   * This move control causes the mob to sway side to side giving the impression it is swimming.
   */
  "minecraft:movement.sway"?: {
    /**
     * The maximum number in degrees the mob can turn per tick.
     */
    max_turn?: number;
    /**
     * Strength of the sway movement.
     */
    sway_amplitude?: number;
    /**
     * Multiplier for the frequency of the sway movement.
     */
    sway_frequency?: number;
  };
  /**
   * UNDOCUMENTED.
   */
  "minecraft:movement"?: {
    /**
     * UNDOCUMENTED.
     */
    value?: [number, number] | number | {
      /**
       * UNDOCUMENTED.
       */
      range_min?: number;
      /**
       * UNDOCUMENTED.
       */
      range_max?: number;
    };
    /**
     * UNDOCUMENTED.
     */
    max?: number;
  };
  /**
   * Allows this entity to be named (e.g. using a name tag).
   */
  "minecraft:nameable"?: {
    /**
     * If true, this entity can be renamed with name tags.
     */
    allow_name_tag_renaming?: boolean;
    /**
     * If true, the name will always be shown.
     */
    always_show?: boolean;
    /**
     * Trigger to run when the entity gets named.
     */
    default_trigger?: EventTriggerFiltered;
    /**
     * Describes the special names for this entity and the events to call when the entity acquires those names.
     */
    name_actions?: ({
      /**
       * List of special names that will cause the events defined in `on_named` to fire.
       */
      name_filter?: string;
      /**
       * Event to be called when this entity acquires the name specified in `name_filter'.
       */
      on_named?: EventTrigger;
    })[] | {
      /**
       * List of special names that will cause the events defined in `on_named` to fire.
       */
      name_filter?: string;
      /**
       * Event to be called when this entity acquires the name specified in `name_filter'.
       */
      on_named?: EventTrigger;
    };
  };
  /**
   * Allows this entity to generate paths that include vertical walls like the vanilla Spiders do.
   */
  "minecraft:navigation.climb"?: {
    /**
     * Tells the pathfinder to avoid blocks that cause damage when finding a path.
     */
    avoid_damage_blocks?: boolean;
    /**
     * Tells the pathfinder to avoid portals (like nether portals) when finding a path.
     */
    avoid_portals?: boolean;
    /**
     * Whether or not the pathfinder should avoid tiles that are exposed to the sun when creating paths.
     */
    avoid_sun?: boolean;
    /**
     * Tells the pathfinder to avoid water when creating a path.
     */
    avoid_water?: boolean;
    /**
     * Tells the pathfinder which blocks to avoid when creating a path.
     */
    blocks_to_avoid?: (BlockReference)[];
    /**
     * Tells the pathfinder whether or not it can jump out of water (like a dolphin).
     */
    can_breach?: boolean;
    /**
     * Tells the pathfinder that it can path through a closed door and break it.
     */
    can_break_doors?: boolean;
    /**
     * Tells the pathfinder whether or not it can jump up blocks.
     */
    can_jump?: boolean;
    /**
     * Tells the pathfinder that it can path through a closed door assuming the AI will open the door.
     */
    can_open_doors?: boolean;
    /**
     * Tells the pathfinder that it can path through a closed iron door assuming the AI will open the door.
     */
    can_open_iron_doors?: boolean;
    /**
     * Whether a path can be created through a door.
     */
    can_pass_doors?: boolean;
    /**
     * Tells the pathfinder that it can start pathing when in the air.
     */
    can_path_from_air?: boolean;
    /**
     * Tells the pathfinder whether or not it can travel on the surface of the lava.
     */
    can_path_over_lava?: boolean;
    /**
     * Tells the pathfinder whether or not it can travel on the surface of the water.
     */
    can_path_over_water?: boolean;
    /**
     * Tells the pathfinder whether or not it will be pulled down by gravity while in water.
     */
    can_sink?: boolean;
    /**
     * Tells the pathfinder whether or not it can path anywhere through water and plays swimming animation along that path.
     */
    can_swim?: boolean;
    /**
     * Tells the pathfinder whether or not it can walk on the ground outside water.
     */
    can_walk?: boolean;
    /**
     * Tells the pathfinder whether or not it can travel in lava like walking on ground.
     */
    can_walk_in_lava?: boolean;
    /**
     * Tells the pathfinder whether or not it can walk on the ground underwater.
     */
    is_amphibious?: boolean;
  };
  /**
   * Allows this entity to generate paths by flying around the air like the regular Ghast.
   */
  "minecraft:navigation.float"?: {
    /**
     * Tells the pathfinder to avoid blocks that cause damage when finding a path.
     */
    avoid_damage_blocks?: boolean;
    /**
     * Tells the pathfinder to avoid portals (like nether portals) when finding a path.
     */
    avoid_portals?: boolean;
    /**
     * Whether or not the pathfinder should avoid tiles that are exposed to the sun when creating paths.
     */
    avoid_sun?: boolean;
    /**
     * Tells the pathfinder to avoid water when creating a path.
     */
    avoid_water?: boolean;
    /**
     * Tells the pathfinder which blocks to avoid when creating a path.
     */
    blocks_to_avoid?: (BlockReference)[];
    /**
     * Tells the pathfinder whether or not it can jump out of water (like a dolphin).
     */
    can_breach?: boolean;
    /**
     * Tells the pathfinder that it can path through a closed door and break it.
     */
    can_break_doors?: boolean;
    /**
     * Tells the pathfinder whether or not it can jump up blocks.
     */
    can_jump?: boolean;
    /**
     * Tells the pathfinder that it can path through a closed door assuming the AI will open the door.
     */
    can_open_doors?: boolean;
    /**
     * Tells the pathfinder that it can path through a closed iron door assuming the AI will open the door.
     */
    can_open_iron_doors?: boolean;
    /**
     * Whether a path can be created through a door.
     */
    can_pass_doors?: boolean;
    /**
     * Tells the pathfinder that it can start pathing when in the air.
     */
    can_path_from_air?: boolean;
    /**
     * Tells the pathfinder whether or not it can travel on the surface of the lava.
     */
    can_path_over_lava?: boolean;
    /**
     * Tells the pathfinder whether or not it can travel on the surface of the water.
     */
    can_path_over_water?: boolean;
    /**
     * Tells the pathfinder whether or not it will be pulled down by gravity while in water.
     */
    can_sink?: boolean;
    /**
     * Tells the pathfinder whether or not it can path anywhere through water and plays swimming animation along that path.
     */
    can_swim?: boolean;
    /**
     * Tells the pathfinder whether or not it can walk on the ground outside water.
     */
    can_walk?: boolean;
    /**
     * Tells the pathfinder whether or not it can travel in lava like walking on ground.
     */
    can_walk_in_lava?: boolean;
    /**
     * Tells the pathfinder whether or not it can walk on the ground underwater.
     */
    is_amphibious?: boolean;
  };
  /**
   * Allows this entity to generate paths in the air like the vanilla Parrots do.
   */
  "minecraft:navigation.fly"?: {
    /**
     * Tells the pathfinder to avoid blocks that cause damage when finding a path.
     */
    avoid_damage_blocks?: boolean;
    /**
     * Tells the pathfinder to avoid portals (like nether portals) when finding a path.
     */
    avoid_portals?: boolean;
    /**
     * Whether or not the pathfinder should avoid tiles that are exposed to the sun when creating paths.
     */
    avoid_sun?: boolean;
    /**
     * Tells the pathfinder to avoid water when creating a path.
     */
    avoid_water?: boolean;
    /**
     * Tells the pathfinder which blocks to avoid when creating a path.
     */
    blocks_to_avoid?: (BlockReference)[];
    /**
     * Tells the pathfinder whether or not it can jump out of water (like a dolphin).
     */
    can_breach?: boolean;
    /**
     * Tells the pathfinder that it can path through a closed door and break it.
     */
    can_break_doors?: boolean;
    /**
     * Tells the pathfinder whether or not it can jump up blocks.
     */
    can_jump?: boolean;
    /**
     * Tells the pathfinder that it can path through a closed door assuming the AI will open the door.
     */
    can_open_doors?: boolean;
    /**
     * Tells the pathfinder that it can path through a closed iron door assuming the AI will open the door.
     */
    can_open_iron_doors?: boolean;
    /**
     * Whether a path can be created through a door.
     */
    can_pass_doors?: boolean;
    /**
     * Tells the pathfinder that it can start pathing when in the air.
     */
    can_path_from_air?: boolean;
    /**
     * Tells the pathfinder whether or not it can travel on the surface of the lava.
     */
    can_path_over_lava?: boolean;
    /**
     * Tells the pathfinder whether or not it can travel on the surface of the water.
     */
    can_path_over_water?: boolean;
    /**
     * Tells the pathfinder whether or not it will be pulled down by gravity while in water.
     */
    can_sink?: boolean;
    /**
     * Tells the pathfinder whether or not it can path anywhere through water and plays swimming animation along that path.
     */
    can_swim?: boolean;
    /**
     * Tells the pathfinder whether or not it can walk on the ground outside water.
     */
    can_walk?: boolean;
    /**
     * Tells the pathfinder whether or not it can travel in lava like walking on ground.
     */
    can_walk_in_lava?: boolean;
    /**
     * Tells the pathfinder whether or not it can walk on the ground underwater.
     */
    is_amphibious?: boolean;
  };
  /**
   * Allows this entity to generate paths by walking, swimming, flying and/or climbing around and jumping up and down a block.
   */
  "minecraft:navigation.generic"?: {
    /**
     * Tells the pathfinder to avoid blocks that cause damage when finding a path.
     */
    avoid_damage_blocks?: boolean;
    /**
     * Tells the pathfinder to avoid portals (like nether portals) when finding a path.
     */
    avoid_portals?: boolean;
    /**
     * Whether or not the pathfinder should avoid tiles that are exposed to the sun when creating paths.
     */
    avoid_sun?: boolean;
    /**
     * Tells the pathfinder to avoid water when creating a path.
     */
    avoid_water?: boolean;
    /**
     * Tells the pathfinder which blocks to avoid when creating a path.
     */
    blocks_to_avoid?: (BlockReference)[];
    /**
     * Tells the pathfinder whether or not it can jump out of water (like a dolphin).
     */
    can_breach?: boolean;
    /**
     * Tells the pathfinder that it can path through a closed door and break it.
     */
    can_break_doors?: boolean;
    /**
     * Tells the pathfinder whether or not it can jump up blocks.
     */
    can_jump?: boolean;
    /**
     * Tells the pathfinder that it can path through a closed door assuming the AI will open the door.
     */
    can_open_doors?: boolean;
    /**
     * Tells the pathfinder that it can path through a closed iron door assuming the AI will open the door.
     */
    can_open_iron_doors?: boolean;
    /**
     * Whether a path can be created through a door.
     */
    can_pass_doors?: boolean;
    /**
     * Tells the pathfinder that it can start pathing when in the air.
     */
    can_path_from_air?: boolean;
    /**
     * Tells the pathfinder whether or not it can travel on the surface of the lava.
     */
    can_path_over_lava?: boolean;
    /**
     * Tells the pathfinder whether or not it can travel on the surface of the water.
     */
    can_path_over_water?: boolean;
    /**
     * Tells the pathfinder whether or not it will be pulled down by gravity while in water.
     */
    can_sink?: boolean;
    /**
     * Tells the pathfinder whether or not it can path anywhere through water and plays swimming animation along that path.
     */
    can_swim?: boolean;
    /**
     * Tells the pathfinder whether or not it can walk on the ground outside water.
     */
    can_walk?: boolean;
    /**
     * Tells the pathfinder whether or not it can travel in lava like walking on ground.
     */
    can_walk_in_lava?: boolean;
    /**
     * Tells the pathfinder whether or not it can walk on the ground underwater.
     */
    is_amphibious?: boolean;
  };
  /**
   * Allows this entity to generate paths in the air like the vanilla Bees do. Keeps them from falling out of the skies and doing predictive movement.
   */
  "minecraft:navigation.hover"?: {
    /**
     * Tells the pathfinder to avoid blocks that cause damage when finding a path.
     */
    avoid_damage_blocks?: boolean;
    /**
     * Tells the pathfinder to avoid portals (like nether portals) when finding a path.
     */
    avoid_portals?: boolean;
    /**
     * Whether or not the pathfinder should avoid tiles that are exposed to the sun when creating paths.
     */
    avoid_sun?: boolean;
    /**
     * Tells the pathfinder to avoid water when creating a path.
     */
    avoid_water?: boolean;
    /**
     * Tells the pathfinder which blocks to avoid when creating a path.
     */
    blocks_to_avoid?: (BlockReference)[];
    /**
     * Tells the pathfinder whether or not it can jump out of water (like a dolphin).
     */
    can_breach?: boolean;
    /**
     * Tells the pathfinder that it can path through a closed door and break it.
     */
    can_break_doors?: boolean;
    /**
     * Tells the pathfinder whether or not it can jump up blocks.
     */
    can_jump?: boolean;
    /**
     * Tells the pathfinder that it can path through a closed door assuming the AI will open the door.
     */
    can_open_doors?: boolean;
    /**
     * Tells the pathfinder that it can path through a closed iron door assuming the AI will open the door.
     */
    can_open_iron_doors?: boolean;
    /**
     * Whether a path can be created through a door.
     */
    can_pass_doors?: boolean;
    /**
     * Tells the pathfinder that it can start pathing when in the air.
     */
    can_path_from_air?: boolean;
    /**
     * Tells the pathfinder whether or not it can travel on the surface of the lava.
     */
    can_path_over_lava?: boolean;
    /**
     * Tells the pathfinder whether or not it can travel on the surface of the water.
     */
    can_path_over_water?: boolean;
    /**
     * Tells the pathfinder whether or not it will be pulled down by gravity while in water.
     */
    can_sink?: boolean;
    /**
     * Tells the pathfinder whether or not it can path anywhere through water and plays swimming animation along that path.
     */
    can_swim?: boolean;
    /**
     * Tells the pathfinder whether or not it can walk on the ground outside water.
     */
    can_walk?: boolean;
    /**
     * Tells the pathfinder whether or not it can travel in lava like walking on ground.
     */
    can_walk_in_lava?: boolean;
    /**
     * Tells the pathfinder whether or not it can walk on the ground underwater.
     */
    is_amphibious?: boolean;
  };
  /**
   * Allows this entity to generate paths that include water.
   */
  "minecraft:navigation.swim"?: {
    /**
     * Tells the pathfinder to avoid blocks that cause damage when finding a path.
     */
    avoid_damage_blocks?: boolean;
    /**
     * Tells the pathfinder to avoid portals (like nether portals) when finding a path.
     */
    avoid_portals?: boolean;
    /**
     * Whether or not the pathfinder should avoid tiles that are exposed to the sun when creating paths.
     */
    avoid_sun?: boolean;
    /**
     * Tells the pathfinder to avoid water when creating a path.
     */
    avoid_water?: boolean;
    /**
     * Tells the pathfinder which blocks to avoid when creating a path.
     */
    blocks_to_avoid?: (BlockReference)[];
    /**
     * Tells the pathfinder whether or not it can jump out of water (like a dolphin).
     */
    can_breach?: boolean;
    /**
     * Tells the pathfinder that it can path through a closed door and break it.
     */
    can_break_doors?: boolean;
    /**
     * Tells the pathfinder whether or not it can jump up blocks.
     */
    can_jump?: boolean;
    /**
     * Tells the pathfinder that it can path through a closed door assuming the AI will open the door.
     */
    can_open_doors?: boolean;
    /**
     * Tells the pathfinder that it can path through a closed iron door assuming the AI will open the door.
     */
    can_open_iron_doors?: boolean;
    /**
     * Whether a path can be created through a door.
     */
    can_pass_doors?: boolean;
    /**
     * Tells the pathfinder that it can start pathing when in the air.
     */
    can_path_from_air?: boolean;
    /**
     * Tells the pathfinder whether or not it can travel on the surface of the lava.
     */
    can_path_over_lava?: boolean;
    /**
     * Tells the pathfinder whether or not it can travel on the surface of the water.
     */
    can_path_over_water?: boolean;
    /**
     * Tells the pathfinder whether or not it will be pulled down by gravity while in water.
     */
    can_sink?: boolean;
    /**
     * Tells the pathfinder whether or not it can path anywhere through water and plays swimming animation along that path.
     */
    can_swim?: boolean;
    /**
     * Tells the pathfinder whether or not it can walk on the ground outside water.
     */
    can_walk?: boolean;
    /**
     * Tells the pathfinder whether or not it can travel in lava like walking on ground.
     */
    can_walk_in_lava?: boolean;
    /**
     * Tells the pathfinder whether or not it can walk on the ground underwater.
     */
    is_amphibious?: boolean;
  };
  /**
   * Allows this entity to generate paths by walking around and jumping up and down a block like regular mobs.
   */
  "minecraft:navigation.walk"?: {
    /**
     * Tells the pathfinder to avoid blocks that cause damage when finding a path.
     */
    avoid_damage_blocks?: boolean;
    /**
     * Tells the pathfinder to avoid portals (like nether portals) when finding a path.
     */
    avoid_portals?: boolean;
    /**
     * Whether or not the pathfinder should avoid tiles that are exposed to the sun when creating paths.
     */
    avoid_sun?: boolean;
    /**
     * Tells the pathfinder to avoid water when creating a path.
     */
    avoid_water?: boolean;
    /**
     * Tells the pathfinder which blocks to avoid when creating a path.
     */
    blocks_to_avoid?: (BlockReference)[];
    /**
     * Tells the pathfinder whether or not it can jump out of water (like a dolphin).
     */
    can_breach?: boolean;
    /**
     * Tells the pathfinder that it can path through a closed door and break it.
     */
    can_break_doors?: boolean;
    /**
     * Tells the pathfinder whether or not it can jump up blocks.
     */
    can_jump?: boolean;
    /**
     * Tells the pathfinder whether or not it float.
     */
    can_float?: boolean;
    /**
     * Tells the pathfinder that it can path through a closed door assuming the AI will open the door.
     */
    can_open_doors?: boolean;
    /**
     * Tells the pathfinder that it can path through a closed iron door assuming the AI will open the door.
     */
    can_open_iron_doors?: boolean;
    /**
     * Whether a path can be created through a door.
     */
    can_pass_doors?: boolean;
    /**
     * Tells the pathfinder that it can start pathing when in the air.
     */
    can_path_from_air?: boolean;
    /**
     * Tells the pathfinder whether or not it can travel on the surface of the lava.
     */
    can_path_over_lava?: boolean;
    /**
     * Tells the pathfinder whether or not it can travel on the surface of the water.
     */
    can_path_over_water?: boolean;
    /**
     * Tells the pathfinder whether or not it will be pulled down by gravity while in water.
     */
    can_sink?: boolean;
    /**
     * Tells the pathfinder whether or not it can path anywhere through water and plays swimming animation along that path.
     */
    can_swim?: boolean;
    /**
     * Tells the pathfinder whether or not it can walk on the ground outside water.
     */
    can_walk?: boolean;
    /**
     * Tells the pathfinder whether or not it can travel in lava like walking on ground.
     */
    can_walk_in_lava?: boolean;
    /**
     * Tells the pathfinder whether or not it can walk on the ground underwater.
     */
    is_amphibious?: boolean;
  };
  /**
   * Sets this entity as an NPC
   */
  "minecraft:npc"?: {
    /**
     * The data belonging to this npc.
     */
    npc_data?: {
      /**
       * UNDOCUMENTED.
       */
      portrait_offsets?: {
        /**
         * UNDOCUMENTED.
         */
        translate?: [number, number, number];
        /**
         * UNDOCUMENTED.
         */
        scale?: [number, number, number];
      };
      /**
       * UNDOCUMENTED.
       */
      picker_offsets?: {
        /**
         * UNDOCUMENTED.
         */
        translate?: [number, number, number];
        /**
         * UNDOCUMENTED.
         */
        scale?: [number, number, number];
      };
      /**
       * UNDOCUMENTED.
       */
      skin_list?: ({
        /**
         * UNDOCUMENTED.
         */
        variant?: number;
        /**
         * UNDOCUMENTED.
         */
        mark_variant?: number;
      })[];
    };
  };
  /**
   * Adds a trigger to call on this entity's death. minecraft:on_death can only be used by the `ender_dragon` entity.
   */
  "minecraft:on_death"?: {
    [key: string]: never;
  };
  /**
   * Adds a trigger that will run when a nearby entity of the same type as this entity becomes Angry.
   */
  "minecraft:on_friendly_anger"?: {
    [key: string]: never;
  };
  /**
   * Adds a trigger to call when this entity is attacked by the player.
   */
  "minecraft:on_hurt_by_player"?: {
    [key: string]: never;
  };
  /**
   * Adds a trigger to call when this entity takes damage.
   */
  "minecraft:on_hurt"?: {
    [key: string]: never;
  };
  /**
   * Adds a trigger to call when this entity is set on fire.
   */
  "minecraft:on_ignite"?: {
    [key: string]: never;
  };
  /**
   * Only usable by the Ender Dragon. Adds a trigger to call when this entity lands.
   */
  "minecraft:on_start_landing"?: {
    [key: string]: never;
  };
  /**
   * Only usable by the Ender Dragon. Adds a trigger to call when this entity starts flying.
   */
  "minecraft:on_start_takeoff"?: {
    [key: string]: never;
  };
  /**
   * Adds a trigger to call when this entity finds a target.
   */
  "minecraft:on_target_acquired"?: {
    [key: string]: never;
  };
  /**
   * Adds a trigger to call when this entity loses the target it currently has.
   */
  "minecraft:on_target_escape"?: {
    [key: string]: never;
  };
  /**
   * Adds a trigger to call when this pet's owner awakes after sleeping with the pet.
   */
  "minecraft:on_wake_with_owner"?: {
    [key: string]: never;
  };
  /**
   * defines the entity's `out of control` state.
   */
  "minecraft:out_of_control"?: {
    [key: string]: never;
  };
  /**
   * Defines the entity's `peek` behavior, defining the events that should be called during it.
   */
  "minecraft:peek"?: {
    /**
     * Event to call when the entity is done peeking.
     */
    on_close?: EventTrigger;
    /**
     * Event to call when the entity starts peeking.
     */
    on_open?: EventTrigger;
    /**
     * Event to call when the entity's target entity starts peeking.
     */
    on_target_open?: EventTrigger;
  };
  /**
   * Defines whether an entity should be persistent in the game world.
   */
  "minecraft:persistent"?: {
    [key: string]: never;
  };
  /**
   * Defines the physical properties of an actor, including whether it is affected by gravity, whether it collides with objects, or whether it is pushed to the closest space.
   */
  "minecraft:physics"?: {
    /**
     * Whether or not the entity collides with things.
     */
    has_collision?: boolean;
    /**
     * Whether or not the entity is affected by gravity.
     */
    has_gravity?: boolean;
    /**
     * Whether or not the entity is pushed to the closest space.
     */
    push_towards_closest_space?: boolean;
  };
  /**
   * Defines the player's need for food.
   */
  "minecraft:player.exhaustion"?: {
    /**
     * The maximum player saturation value.
     */
    value?: number;
    /**
     * The maximum player saturation value.
     */
    max?: number;
  };
  /**
   * UNDOCUMENTED.
   */
  "minecraft:player.experience"?: {
    /**
     * UNDOCUMENTED.
     */
    value?: number;
    /**
     * UNDOCUMENTED.
     */
    max?: number;
  };
  /**
   * UNDOCUMENTED.
   */
  "minecraft:player.level"?: {
    /**
     * UNDOCUMENTED.
     */
    value?: number;
    /**
     * UNDOCUMENTED.
     */
    max?: number;
  };
  /**
   * UNDOCUMENTED.
   */
  "minecraft:player.saturation"?: {
    /**
     * UNDOCUMENTED.
     */
    value?: number;
  };
  /**
   * Specifies costing information for mobs that prefer to walk on preferred paths.
   */
  "minecraft:preferred_path"?: {
    /**
     * Cost for non-preferred blocks.
     */
    default_block_cost?: number;
    /**
     * Added cost for jumping up a node.
     */
    jump_cost?: number;
    /**
     * Distance mob can fall without taking damage.
     */
    max_fall_blocks?: number;
    /**
     * A list of blocks with their associated cost.
     */
    preferred_path_blocks?: ({
      /**
       * UNDOCUMENTED.
       */
      cost?: number;
      /**
       * UNDOCUMENTED.
       */
      blocks?: (BlockReference)[];
    })[];
  };
  /**
   * Allows the entity to be a thrown entity.
   */
  "minecraft:projectile"?: {
    /**
     * Allows you to choose an anchor point for where the projectile is fired from. 0 = Original point, 1 = EyeHeight, and 2 = Middle or body height.
     */
    anchor?: number;
    /**
     * Alters the angle at which a projectile is vertically shot. Many splash potions in the game use this to offset their angles by -20 degrees.
     */
    angle_offset?: number;
    /**
     * If true, the entity hit will be set on fire.
     */
    catch_fire?: boolean;
    /**
     * If true, when a projectile deals damage, whether or not to spawn in the critical damage particles.
     */
    crit_particle_on_hurt?: boolean;
    /**
     * When this projectile deals damage, whether or not to immediately destroy this projectile.
     */
    destroy_on_hurt?: boolean;
    /**
     * Entity Definitions defined here can't be hurt by the projectile.
     */
    filter?: string;
    /**
     * If true, whether the projectile causes fire is affected by the mob griefing game rule.
     */
    fire_affected_by_griefing?: boolean;
    /**
     * The gravity applied to this entity when thrown. When this actor is not on the ground, subtracts this amount from the actors change in vertical position every tick. The higher the value, the faster the entity falls.
     */
    gravity?: number;
    /**
     * The sound that plays when the projectile hits the ground.
     */
    hit_ground_sound?: SoundEvent;
    /**
     * The sound that plays when the projectile hits something.
     */
    hit_sound?: SoundEvent;
    /**
     * If true, the projectile homes in to the nearest entity.
     */
    homing?: boolean;
    /**
     * The fraction of the projectile's speed maintained every frame while traveling in air.
     */
    inertia?: number;
    /**
     * If true, the projectile will be treated as dangerous to the players.
     */
    is_dangerous?: boolean;
    /**
     * If true, the projectile will knock back the entity it hits.
     */
    knockback?: boolean;
    /**
     * If true, the entity hit will be struck by lightning.
     */
    lightning?: boolean;
    /**
     * The fraction of the projectile's speed maintained every frame while traveling in water.
     */
    liquid_inertia?: number;
    /**
     * If true, the projectile can hit multiple entities per flight.
     */
    multiple_targets?: boolean;
    /**
     * SEE on_hit/mob_effect.
     */
    mob_effect?: SpellEffects;
    /**
     * An vector of 3 number.
     */
    offset?: [number, number, number];
    /**
     * Time in seconds that the entity hit will be on fire for.
     */
    on_fire_time?: number;
    /**
     * Defines the behaviors that may execute on a projectile's hit, including impact damage, impact effect, and stuck in ground. See more on these parameters below.
     */
    on_hit?: {
      /**
       * Determines if the struck object is set on fire.
       */
      catch_fire?: boolean;
      /**
       * The event that is triggered on a hit. See the table below for all definition event parameters.
       */
      definition_event?: {
        /**
         * The projectile that will be affected by this event.
         */
        affect_projectile?: boolean;
        /**
         * The shooter that will be affected by this event.
         */
        affect_shooter?: boolean;
        /**
         * All entities in the splash area will be affected by this event.
         */
        affect_splash_area?: boolean;
        /**
         * The target will be affected by this event.
         */
        affect_target?: boolean;
        /**
         * The event triggered. Also has an option filters parameter to limit affected targets.
         */
        event_trigger?: string | EventTrigger;
        /**
         * The splash area that will be affected.
         */
        splash_area?: number;
      };
      /**
       * If the target is on fire, then douse hte fire.
       */
      douse_fire?: boolean;
      /**
       * An area of entities that is frozen to block on hits. Has shape of either sphere or cube, snap_to_block boolean ,and size decimal properties.
       */
      freeze_on_hit?: {
        /**
         * The shape of the area that is frozen.
         */
        shape?: "sphere" | "cube";
        /**
         * If true, the area will snap to the nearest block.
         */
        snap_to_block?: boolean;
        /**
         * The size of the area that is frozen.
         */
        size?: number;
      };
      /**
       * Grants XP on hit. Has minXP for minimum XP granted, maxXp for maximum, or simply flat xp properties.
       */
      grant_xp?: {
        /**
         * The minimum XP granted.
         */
        minXP?: number;
        /**
         * The maximum XP granted.
         */
        maxXP?: number;
      };
      /**
       * Determines if the owner of the entity is hurt on hit. Contains decimal owner_damage, knockback boolean, and ignite boolean.
       */
      hurt_owner?: {
        /**
         * The amount of damage the owner will take.
         */
        owner_damage?: number;
        /**
         * If true, the owner will be knocked back.
         */
        knockback?: boolean;
        /**
         * If true, the owner will be set on fire.
         */
        ignite?: boolean;
      };
      /**
       * Determines if a fire may be started on a flammable target.
       */
      ignite?: boolean;
      /**
       * Defines the damage that an entity may receive on being hit by this projectile. See the table below for all impact_damage parameters.
       */
      impact_damage?: {
        /**
         * Determines if the struck object is set on fire.
         */
        catch_fire?: boolean;
        /**
         * Whether lightning can be channeled through hte weapon.
         */
        channeling?: boolean;
        /**
         * The damage dealt on impact.
         */
        damage?: number;
        /**
         * Projectile is removed on hit.
         */
        destroy_on_hit?: boolean;
        /**
         * If true, then the hit must cause damage to destroy the projectile.
         */
        destroy_on_hit_requires_damage?: boolean;
        /**
         * The identifier of an entity that can be hit.
         */
        filter?: string;
        /**
         * If true, the projectile will knock back the entity it hits.
         */
        knockback?: boolean;
        /**
         * Maximum critical damage.
         */
        max_critical_damage?: number;
        /**
         * Minimum critical damage.
         */
        min_critical_damage?: number;
        /**
         * How much the base damage is multiplied.
         */
        power_multiplier?: number;
        /**
         * If true, damage will be randomized based on damage and speed.
         */
        semi_random_diff_damage?: boolean;
        /**
         * If true, then the hit must cause damage to update the last hurt property.
         */
        set_last_hurt_requires_damage?: boolean;
      };
      /**
       * The target receives a mob effect. See the table below for all mob_effect parameters.
       */
      mob_effect?: {
        /**
         * If true, a mob will spawn that is not hostile, like the bat entity in Minecraft.
         */
        ambient?: boolean;
        /**
         * The multiplier of the amplification of this effect.
         */
        amplifier?: number;
        /**
         * The effect's duration.
         */
        duration?: number;
        /**
         * The effect's duration on easy mode.
         */
        durationeasy?: number;
        /**
         * The effect's duration on hard mode.
         */
        durationhard?: number;
        /**
         * The effect's duration on normal mode.
         */
        durationnormal?: number;
        /**
         * The identifier of the mob entity to affect.
         */
        effect?: SpellEffects;
        /**
         * Does the entity's look change.
         */
        visible?: boolean;
      };
      /**
       * The amount of time a target will remain on fire.
       */
      on_fire_time?: number;
      /**
       * The particles that spawn on hit. See the table below for all particle_on_hit parameters.
       */
      particle_on_hit?: {
        /**
         * The number of particles to spawn.
         */
        num_particles?: number;
        /**
         * If true, spawns particles on an entity hit.
         */
        on_entity_hit?: boolean;
        /**
         * If true, spawns particles on any other hit.
         */
        on_other_hit?: boolean;
        /**
         * The id of the particle to spawn on hit.
         */
        particle_type?: string;
      };
      /**
       * Defines the effect the arrow will apply to the entity it hits.
       */
      potion_effect?: number;
      /**
       * Removes the projectile.
       */
      remove_on_hit?: {
        [key: string]: never;
      };
      /**
       * Potion spawns an area of effect cloud. See the table below for all spawn_aoe_cloud parameters.
       */
      spawn_aoe_cloud?: {
        /**
         * Determines if the projectile shooter is affected.
         */
        affect_owner?: boolean;
        /**
         * An vector of 3 number.
         */
        color?: [number, number, number];
        /**
         * How long the particle emits.
         */
        duration?: number;
        /**
         * The particle emitter.
         */
        particle?: number;
        /**
         * The id of the potion.
         */
        potion?: number;
        /**
         * Defines the affected area.
         */
        radius?: number;
        /**
         * Defines the affected area when potion is used.
         */
        radius_on_use?: number;
        /**
         * Delay before the potion can affect the area again.
         */
        reapplication_delay?: number;
      };
      /**
       * Contains information on the chance of spawning an entity on hit. See parameters below.
       */
      spawn_chance?: {
        /**
         * The amount of new entities spawned.
         */
        first_spawn_count?: number;
        /**
         * The chance that a spawn occurs when a projectile hits the entity.
         */
        first_spawn_percent_chance?: number;
        /**
         * The chance that a first spawn occurs when a projectile hits the entity.
         */
        first_spawn_chance?: number;
        /**
         * The chance that a second spawn occurs when a projectile hits the entity.
         */
        second_spawn_chance?: number;
        /**
         * The amount of new entities spawned in teh second spawn.
         */
        second_spawn_count?: number;
        /**
         * Determines if a baby spawns.
         */
        spawn_baby?: boolean;
        /**
         * The entity that will spawn.
         */
        spawn_definition?: string;
      };
      /**
       * Decides if the object sticks in ground and contains shake_time integer parameter to determine how long it will shake.
       */
      stick_in_ground?: {
        [key: string]: never;
      };
      /**
       * Determines if the owner is transported on hit.
       */
      teleport_owner?: boolean;
      /**
       * Creates a splash area for effects caused by a thrown potion.
       */
      thrown_potion_effect?: {
        [key: string]: never;
      };
    };
    /**
     * Particle to use upon collision.
     */
    particle?: string;
    /**
     * Defines the effect the arrow will apply to the entity it hits.
     */
    potion_effect?: number;
    /**
     * Determines the velocity of the projectile.
     */
    power?: number;
    /**
     * If true, this entity will be reflected back when hit.
     */
    reflect_on_hurt?: boolean;
    /**
     * If true, damage will be randomized based on damage and speed.
     */
    semi_random_diff_damage?: boolean;
    /**
     * The sound that plays when the projectile is shot.
     */
    shoot_sound?: SoundEvent;
    /**
     * If true, the projectile will be shot towards the target of the entity firing it.
     */
    shoot_target?: boolean;
    /**
     * If true, the projectile will bounce upon hit.
     */
    should_bounce?: boolean;
    /**
     * If true, the projectile will be treated like a splash potion.
     */
    splash_potion?: boolean;
    /**
     * Radius in blocks of the 'splash' effect.
     */
    splash_range?: number;
    /**
     * Determines if the projectile stops when the target is hurt.
     */
    stop_on_hurt?: boolean;
    /**
     * The base accuracy. Accuracy is determined by the formula uncertaintyBase - difficultyLevel * uncertaintyMultiplier.
     */
    uncertainty_base?: number;
    /**
     * Determines how much difficulty affects accuracy. Accuracy is determined by the formula uncertaintyBase - difficultyLevel * uncertaintyMultiplier.
     */
    uncertainty_multiplier?: number;
  };
  /**
   * Sets the distance through which the entity can push through.
   */
  "minecraft:push_through"?: {
    /**
     * The value of the entity's push-through, in blocks.
     */
    value?: number;
  };
  /**
   * Defines what can push an entity between other entities and pistons.
   */
  "minecraft:pushable"?: {
    /**
     * Whether the entity can be pushed by other entities.
     */
    is_pushable?: boolean;
    /**
     * Whether the entity can be pushed by pistons safely.
     */
    is_pushable_by_piston?: boolean;
  };
  /**
   * Attempts to trigger a raid at the entity's location.
   */
  "minecraft:raid_trigger"?: {
    /**
     * Event to run we attempt to trigger a raid on the village.
     */
    triggered_event?: string | EventTrigger;
  };
  /**
   * Defines the entity's movement on the rails. An entity with this component is only allowed to move on the rail.
   */
  "minecraft:rail_movement"?: {
    /**
     * Maximum speed that this entity will move at when on the rail.
     */
    max_speed?: number;
  };
  /**
   * Defines the behavior of the entity when the rail gets activated or deactivated.
   */
  "minecraft:rail_sensor"?: {
    /**
     * If true, on tick this entity will trigger its on_deactivate behavior.
     */
    check_block_types?: boolean;
    /**
     * If true, this entity will eject all of its riders when it passes over an activated rail.
     */
    eject_on_activate?: boolean;
    /**
     * If true, this entity will eject all of its riders when it passes over a deactivated rail.
     */
    eject_on_deactivate?: boolean;
    /**
     * Event to call when the rail is activated.
     */
    on_activate?: EventTrigger;
    /**
     * Event to call when the rail is deactivated.
     */
    on_deactivate?: EventTrigger;
    /**
     * If true, command blocks will start ticking when passing over an activated rail.
     */
    tick_command_block_on_activate?: boolean;
    /**
     * If false, command blocks will stop ticking when passing over a deactivated rail.
     */
    tick_command_block_on_deactivate?: boolean;
  };
  /**
   * Defines the ravager's response to their melee attack being blocked.
   */
  "minecraft:ravager_blocked"?: {
    /**
     * The strength with which blocking entities should be knocked back.
     */
    knockback_strength?: number;
    /**
     * A list of weighted responses to the melee attack being blocked.
     */
    reaction_choices?: ({
      /**
       * The chance of this reaction being picked.
       */
      weight?: number;
      /**
       * An event that runs when this reaction is picked.
       */
      value?: string | EventTrigger;
    })[];
  };
  /**
   * Determines whether this entity can be ridden. Allows specifying the different seat positions and quantity.
   */
  "minecraft:rideable"?: {
    /**
     * The seat that designates the driver of the entity.
     */
    controlling_seat?: number;
    /**
     * If true, this entity can't be interacted with if the entity interacting with it is crouching.
     */
    crouching_skip_interact?: boolean;
    /**
     * List of entities that can ride this entity.
     */
    family_types?: (string)[];
    /**
     * The text to display when the player can interact with the entity when playing with Touch-screen controls.
     */
    interact_text?: string;
    /**
     * If true, this entity will pull in entities that are in the correct family_types into any available seats.
     */
    pull_in_entities?: boolean;
    /**
     * If true, this entity will be picked when looked at by the rider.
     */
    rider_can_interact?: boolean;
    /**
     * The number of entities that can ride this entity at the same time.
     */
    seat_count?: number;
    /**
     * The list of positions and number of riders for each position for entities riding this entity.
     */
    seats?: {
      /**
       * Angle in degrees that a rider is allowed to rotate while riding this entity. Omit this property for no limit
       */
      lock_rider_rotation?: number;
      /**
       * Defines the maximum number of riders that can be riding this entity for this seat to be valid.
       */
      max_rider_count?: number;
      /**
       * Defines the minimum number of riders that need to be riding this entity before this seat can be used.
       */
      min_rider_count?: number;
      /**
       * An vector of 3 number.
       */
      position?: [number, number, number];
      /**
       * The minecraft molang definition that results in a float.
       */
      rotate_rider_by?: string | number;
    } | ({
      /**
       * Angle in degrees that a rider is allowed to rotate while riding this entity. Omit this property for no limit
       */
      lock_rider_rotation?: number;
      /**
       * Defines the maximum number of riders that can be riding this entity for this seat to be valid.
       */
      max_rider_count?: number;
      /**
       * Defines the minimum number of riders that need to be riding this entity before this seat can be used.
       */
      min_rider_count?: number;
      /**
       * An vector of 3 number.
       */
      position?: [number, number, number];
      /**
       * The minecraft molang definition that results in a float.
       */
      rotate_rider_by?: string | number;
    })[];
  };
  /**
   * Defines the entity's size interpolation based on the entity's age.
   */
  "minecraft:scale_by_age"?: {
    /**
     * Ending scale of the entity when it's fully grown.
     */
    end_scale?: number;
    /**
     * Initial scale of the newborn entity.
     */
    start_scale?: number;
  };
  /**
   * Sets the entity's visual size.
   */
  "minecraft:scale"?: {
    /**
     * The value of the scale. 1.0 means the entity will appear at the scale they are defined in their model. Higher numbers make the entity bigger
     */
    value?: number;
  };
  /**
   * fires off scheduled mob events at time of day events.
   */
  "minecraft:scheduler"?: {
    /**
     * The minimum the scheduler will be delayed.
     */
    min_delay_secs?: number;
    /**
     * The maximum the scheduler will be delayed.
     */
    max_delay_secs?: number;
    /**
     * The list of triggers that fire when the conditions match the given filter criteria. If any filter criteria overlap the first defined event will be picked.
     */
    scheduled_events?: ({
      /**
       * UNDOCUMENTED.
       */
      filters?: Filters;
      /**
       * UNDOCUMENTED.
       */
      event?: string | EventTrigger;
    })[];
  };
  /**
   * Defines a list of items the mob wants to share or pick up. Each item must have the following parameters:
   */
  "minecraft:shareables"?: {
    /**
     * A bucket for all other items in the game. Note this category is always least priority items.
     */
    all_items?: boolean;
    /**
     * Maximum number of this item the mob will hold.
     */
    all_items_max_amount?: number;
    /**
     * Number of this item considered extra that the entity wants to share.
     */
    all_items_surplus_amount?: number;
    /**
     * Number of this item this entity wants to share.
     */
    all_items_want_amount?: number;
    /**
     * List of items that the entity wants to share.
     */
    items?: ({
      /**
       * Mob will admire the item after picking up by looking at it. For this to happen the mob needs to have an Admire component and an Admire goal.
       */
      admire?: boolean;
      /**
       * Mob will barter for the item after picking it up. For this to work the mob needs to have a Barter component and a Barter goal.
       */
      barter?: boolean;
      /**
       * Determines whether the mob will consume the item or not.
       */
      consume_item?: boolean;
      /**
       * Defines the item this entity wants to craft with the item defined above. Should be an item name.
       */
      craft_into?: string;
      /**
       * The name of the item.
       */
      item?: ItemIdentifier;
      /**
       * Aux value for the item.
       */
      item_aux?: number;
      /**
       * Maximum number of this item the mob will hold.
       */
      max_amount?: number;
      /**
       * Maximum number of this item the mob will pick up during a single goal tick.
       */
      pickup_limit?: number;
      /**
       * Prioritizes which items the entity prefers. 0 is the highest priority.
       */
      priority?: number;
      /**
       * Determines whether the mob will try to put the item in its inventory if it has the inventory component and if it can't be equipped.
       */
      stored_in_inventory?: boolean;
      /**
       * Number of this item considered extra that the entity wants to share.
       */
      surplus_amount?: number;
      /**
       * Number of this item this entity wants to have.
       */
      want_amount?: number;
      /**
       * Determines whether the mob can only pickup the item and not drop it.
       */
      pickup_only?: boolean;
    })[];
  };
  /**
   * Defines the entity's ranged attack behavior.
   */
  "minecraft:shooter"?: {
    /**
     * ID of the Potion effect to be applied on hit.
     */
    aux_val?: number;
    /**
     * Actor definition to use as projectile for the ranged attack. The actor definition must have the projectile component to be able to be shot as a projectile
     */
    def?: string;
    /**
     * UNDOCUMENTED.
     */
    type?: string;
  };
  /**
   * Defines the entity's `sit` state.
   */
  "minecraft:sittable"?: {
    /**
     * Event to run when the entity enters the `sit` state.
     */
    sit_event?: EventTrigger;
    /**
     * Event to run when the entity exits the `sit` state.
     */
    stand_event?: EventTrigger;
  };
  /**
   * Skin ID value. Can be used to differentiate skins, such as base skins for villagers.
   */
  "minecraft:skin_id"?: {
    /**
     * The ID of the skin. By convention, 0 is the ID of the base skin
     */
    value?: number;
  };
  /**
   * Sets the entity's base volume for sound effects.
   */
  "minecraft:sound_volume"?: {
    /**
     * The value of the volume the entity uses for sound effects.
     */
    value?: number;
  };
  /**
   * Adds a timer after which this entity will spawn another entity or item (similar to vanilla's chicken's egg-laying behavior).
   */
  "minecraft:spawn_entity"?: {
    /**
     * The entities to spawn.
     */
    entities?: {
      /**
       * If present, the specified entity will only spawn if the filter evaluates to true.
       */
      filters?: Filters;
      /**
       * Maximum amount of time to randomly wait in seconds before another entity is spawned.
       */
      max_wait_time?: number;
      /**
       * Minimum amount of time to randomly wait in seconds before another entity is spawned.
       */
      min_wait_time?: number;
      /**
       * The number of entities of this type to spawn each time that this triggers.
       */
      num_to_spawn?: number;
      /**
       * If true, this the spawned entity will be leashed to the parent.
       */
      should_leash?: boolean;
      /**
       * If true, this component will only ever spawn the specified entity once.
       */
      single_use?: boolean;
      /**
       * Identifier of the entity to spawn, leave empty to spawn the item defined above instead.
       */
      spawn_entity?: string;
      /**
       * Event to call when the entity is spawned.
       */
      spawn_event?: string;
      /**
       * UNDOCUMENTED.
       */
      spawn_item?: ItemIdentifier | ItemIdentifier | {
        /**
         * UNDOCUMENTED.
         */
        item?: ItemIdentifier | ItemIdentifier;
      };
      /**
       * Method to use to spawn the entity.
       */
      spawn_method?: string;
      /**
       * Identifier of the sound effect to play when the entity is spawned.
       */
      spawn_sound?: SoundEvent;
    } | ({
      /**
       * If present, the specified entity will only spawn if the filter evaluates to true.
       */
      filters?: Filters;
      /**
       * Maximum amount of time to randomly wait in seconds before another entity is spawned.
       */
      max_wait_time?: number;
      /**
       * Minimum amount of time to randomly wait in seconds before another entity is spawned.
       */
      min_wait_time?: number;
      /**
       * The number of entities of this type to spawn each time that this triggers.
       */
      num_to_spawn?: number;
      /**
       * If true, this the spawned entity will be leashed to the parent.
       */
      should_leash?: boolean;
      /**
       * If true, this component will only ever spawn the specified entity once.
       */
      single_use?: boolean;
      /**
       * Identifier of the entity to spawn, leave empty to spawn the item defined above instead.
       */
      spawn_entity?: string;
      /**
       * Event to call when the entity is spawned.
       */
      spawn_event?: string;
      /**
       * UNDOCUMENTED.
       */
      spawn_item?: ItemIdentifier | ItemIdentifier | {
        /**
         * UNDOCUMENTED.
         */
        item?: ItemIdentifier | ItemIdentifier;
      };
      /**
       * Method to use to spawn the entity.
       */
      spawn_method?: string;
      /**
       * Identifier of the sound effect to play when the entity is spawned.
       */
      spawn_sound?: SoundEvent;
    })[];
  };
  /**
   * Defines what mob effects to add and remove to the entity when adding this component.
   */
  "minecraft:spell_effects"?: {
    /**
     * List of effects to add to this entity after adding this component.
     */
    add_effects?: (SpellEffects | {
      /**
       * The level of the effect, same as used in the /effect command (0 for level I, 1 for level II, etc). Defaults to 0. NOTE: Values can be negative but its not an intentional feature
       */
      amplifier?: number;
      /**
       * Boolean value that should cause the particles emitted by the entity to be partially transparent. This does not work properly, resulting in this property having no effect. Defaults to false.
       */
      ambient?: boolean;
      /**
       * The amount of time in seconds the effect should last. This allows for fractional numbers. For example, instant effects should be set to 0.05 seconds (one tick).
       */
      duration?: number;
      /**
       * Boolean value. When set to true, applying this effect displays an animated graphic on-screen similar to the totem of undying effect. Obviously, this only works for players. Defaults to false.
       */
      display_on_screen_animation?: boolean;
      /**
       * The string identifier of the status effect to add. These are the same as used in the /effect command.
       */
      effect?: SpellEffects;
      /**
       * Boolean value. When set to true, the effect will be visible to the player. Defaults to true.
       */
      visible?: boolean;
    })[];
    /**
     * List of identifiers of effects to be removed from this entity after adding this component.
     */
    remove_effects?: (SpellEffects)[] | SpellEffects;
  };
  /**
   * Defines the entity's strength to carry items.
   */
  "minecraft:strength"?: {
    /**
     * The maximum strength of this entity.
     */
    max?: number;
    /**
     * The initial value of the strength.
     */
    value?: number;
  };
  /**
   * Allows this entity to remember suspicious locations.
   */
  "minecraft:suspect_tracking"?: {
    [key: string]: never;
  };
  /**
   * Defines the rules for a mob to be tamed by the player.
   */
  "minecraft:tameable"?: {
    /**
     * The chance of taming the entity with each item use between 0.0 and 1.0, where 1.0 is 100%
     */
    probability?: number;
    /**
     * Event to run when this entity becomes tamed.
     */
    tame_event?: EventTrigger;
    /**
     * The list of items that can be used to tame this entity.
     */
    tame_items?: (ItemIdentifier)[] | ItemIdentifier;
  };
  /**
   * Allows the Entity to be tamed by mounting it.
   */
  "minecraft:tamemount"?: {
    /**
     * The amount the entity's temper will increase when mounted.
     */
    attempt_temper_mod?: number;
    /**
     * The list of items that, if carried while interacting with the entity, will anger it.
     */
    auto_reject_items?: {
      /**
       * UNDOCUMENTED.
       */
      item?: ItemIdentifier | ItemIdentifier | {
        /**
         * UNDOCUMENTED.
         */
        item?: ItemIdentifier | ItemIdentifier;
      };
    } | ({
      /**
       * UNDOCUMENTED.
       */
      item?: ItemIdentifier | ItemIdentifier | {
        /**
         * UNDOCUMENTED.
         */
        item?: ItemIdentifier | ItemIdentifier;
      };
    })[];
    /**
     * The text that shows in the feeding interact button.
     */
    feed_text?: string;
    /**
     * The list of items that can be used to increase the entity's temper and speed up the taming process.
     */
    feed_items?: {
      /**
       * UNDOCUMENTED.
       */
      item?: ItemIdentifier | ItemIdentifier | {
        /**
         * UNDOCUMENTED.
         */
        item?: ItemIdentifier | ItemIdentifier;
      };
      /**
       * The amount of temper this entity gains when fed this item.
       */
      temper_mod?: number;
    } | ({
      /**
       * UNDOCUMENTED.
       */
      item?: ItemIdentifier | ItemIdentifier | {
        /**
         * UNDOCUMENTED.
         */
        item?: ItemIdentifier | ItemIdentifier;
      };
      /**
       * The amount of temper this entity gains when fed this item.
       */
      temper_mod?: number;
    })[];
    /**
     * The maximum value for the entity's random starting temper.
     */
    max_temper?: number;
    /**
     * The minimum value for the entity's random starting temper.
     */
    min_temper?: number;
    /**
     * The text that shows in the riding interact button.
     */
    ride_text?: string;
    /**
     * Event that triggers when the entity becomes tamed.
     */
    tame_event?: EventTrigger;
  };
  /**
   * Defines the entity's range within which it can see or sense other entities to target them.
   */
  "minecraft:target_nearby_sensor"?: {
    /**
     * Whether the other entity needs to be visible to trigger `inside` events.
     */
    must_see?: boolean;
    /**
     * Maximum distance in blocks that another entity will be considered in the `inside` range.
     */
    inside_range?: number;
    /**
     * Event to call when an entity gets in the inside range. Can specify `event` for the name of the event and `target` for the target of the event
     */
    on_inside_range?: EventTrigger;
    /**
     * Event to call when an entity gets in the outside range. Can specify `event` for the name of the event and `target` for the target of the event
     */
    on_outside_range?: EventTrigger;
    /**
     * Event to call when an entity exits visual range. Can specify `event` for the name of the event and `target` for the target of the event
     */
    on_vision_lost_inside_range?: EventTrigger;
    /**
     * Maximum distance in blocks that another entity will be considered in the `outside` range.
     */
    outside_range?: number;
  };
  /**
   * Defines an entity's teleporting behavior.
   */
  "minecraft:teleport"?: {
    /**
     * Modifies the chance that the entity will teleport if the entity is in darkness.
     */
    dark_teleport_chance?: number;
    /**
     * Modifies the chance that the entity will teleport if the entity is in daylight.
     */
    light_teleport_chance?: number;
    /**
     * Maximum amount of time in seconds between random teleports.
     */
    max_random_teleport_time?: number;
    /**
     * Minimum amount of time in seconds between random teleports.
     */
    min_random_teleport_time?: number;
    /**
     * Entity will teleport to a random position within the area defined by this cube.
     */
    random_teleport_cube?: [number, number, number];
    /**
     * If true, the entity will teleport randomly.
     */
    random_teleports?: boolean;
    /**
     * Maximum distance the entity will teleport when chasing a target.
     */
    target_distance?: number;
    /**
     * The chance that the entity will teleport between 0.0 and 1.0. 1.0 means 100%
     */
    target_teleport_chance?: number;
  };
  /**
   * Defines if the entity ticks the world and the radius around it to tick.
   */
  "minecraft:tick_world"?: {
    /**
     * The distance at which the closest player has to be before this entity despawns. This option will be ignored if never_despawn is true. Min: 128 blocks.
     */
    distance_to_players?: number;
    /**
     * If true, this entity will not despawn even if players are far away. If false, distance_to_players will be used to determine when to despawn.
     */
    never_despawn?: boolean;
    /**
     * The area around the entity to tick. Default: 2. Allowed range: 2-6.
     */
    radius?: number;
  };
  /**
   * Adds a timer after which an event will fire.
   */
  "minecraft:timer"?: {
    /**
     * If true, the timer will restart every time after it fires.
     */
    looping?: boolean;
    /**
     * If true, the amount of time on the timer will be random between the Minimum and Maximum values specified in time.
     */
    randomInterval?: boolean;
    /**
     * Amount of time in seconds for the timer. Can be specified as a number or a pair of numbers (Minimum and max). Incompatible with random_time_choices.
     */
    time?: [number, number] | number;
    /**
     * Event to fire when the time on the timer runs out.
     */
    time_down_event?: EventTrigger;
    /**
     * This is a list of objects, representing one value in seconds that can be picked before firing the event and an optional weight. Incompatible with time.
     */
    random_time_choices?: ({
      /**
       * The weight on how likely this section is to trigger.
       */
      weight?: number;
      /**
       * The value in seconds that would be used if this section was picked.
       */
      value?: number;
    })[];
  };
  /**
   * Resupplies an entity's trade.
   */
  "minecraft:trade_resupply"?: {
    [key: string]: never;
  };
  /**
   * Defines this entity's ability to trade with players.
   */
  "minecraft:trade_table"?: {
    /**
     * Determines when the mob transforms, if the trades should be converted when the new mob has a economy_trade_table. When the trades are converted, the mob will generate a new trade list with their new trade table, but then it will try to convert any of the same trades over to have the same enchantments and user data. For example, if the original has a Emerald to Enchanted Iron Sword (Sharpness 1), and the new trade also has an Emerald for Enchanted Iron Sword, then the enchantment will be Sharpness 1.
     */
    convert_trades_economy?: boolean;
    /**
     * Name to be displayed while trading with this entity.
     */
    display_name?: string;
    /**
     * Used to determine if trading with entity opens the new trade screen.
     */
    new_screen?: boolean;
    /**
     * Determines if the trades should persist when the mob transforms. This makes it so that the next time the mob is transformed to something with a trade_table or economy_trade_table, then it keeps their trades.
     */
    persist_trades?: boolean;
    /**
     * File path relative to the resource pack root for this entity's trades.
     */
    table?: string;
  };
  /**
   * Defines the entity's trail to carry items.
   */
  "minecraft:trail"?: {
    /**
     * The type of block you wish to be spawned by the entity as it move about the world. Solid blocks may not be spawned at an offset of ().
     */
    block_type?: string;
    /**
     * One or more conditions that must be met in order to cause the chosen block type to spawn.
     */
    spawn_filter?: Filters;
    /**
     * The distance from the entities current position to spawn the block. Capped at up to 16 blocks away. The X value is left/right(-/+), the Z value is backward/forward(-/+), the Y value is below/above(-/+).
     */
    spawn_offset?: [number, number, number];
  };
  /**
   * Defines an entity's transformation from the current definition into another
   */
  "minecraft:transformation"?: {
    /**
     * List of components to add to the entity after the transformation.
     */
    add?: {
      /**
       * Names of component groups to add.
       */
      component_groups?: (string)[];
    };
    /**
     * Sound to play when the transformation starts.
     */
    begin_transform_sound?: SoundEvent;
    /**
     * Defines the properties of the delay for the transformation.
     */
    delay?: number | {
      /**
       * Chance that the entity will look for nearby blocks that can speed up the transformation. Value must be between 0.0 and 1.0
       */
      block_assist_chance?: number;
      /**
       * Chance that, once a block is found, will help speed up the transformation.
       */
      block_chance?: number;
      /**
       * Maximum number of blocks the entity will look for to aid in the transformation. If not defined or set to 0, it will be set to the block radius
       */
      block_max?: number;
      /**
       * Distance in Blocks that the entity will search for blocks that can help the transformation.
       */
      block_radius?: number;
      /**
       * List of blocks that can help the transformation of this entity.
       */
      block_types?: (ItemIdentifier)[];
      /**
       * Time in seconds before the entity transforms.
       */
      value?: number;
    };
    /**
     * Cause the entity to drop all equipment upon transformation.
     */
    drop_equipment?: boolean;
    /**
     * Cause the entity to drop all items in inventory upon transformation.
     */
    drop_inventory?: boolean;
    /**
     * Entity Definition that this entity will transform into.
     */
    into?: string;
    /**
     * If this entity has trades and has leveled up, it should maintain that level after transformation.
     */
    keep_level?: boolean;
    /**
     * If this entity is owned by another entity, it should remain owned after transformation.
     */
    keep_owner?: boolean;
    /**
     * Cause the entity to keep equipment after going through transformation.
     */
    preserve_equipment?: boolean;
    /**
     * Sound to play when the entity is done transforming.
     */
    transformation_sound?: SoundEvent;
  };
  /**
   * Allows this entity to trust multiple players.
   */
  "minecraft:trust"?: {
    [key: string]: never;
  };
  /**
   * Defines the rules for a mob to trust players.
   */
  "minecraft:trusting"?: {
    /**
     * The chance of the entity trusting with each item use between 0.0 and 1.0, where 1.0 is 100%
     */
    probability?: number;
    /**
     * Event to run when this entity becomes trusting.
     */
    trust_event?: EventTrigger;
    /**
     * The list of items that can be used to get the entity to trust players.
     */
    trust_items?: (ItemIdentifier)[];
  };
  /**
   * Defines the families this entity belongs to.
   */
  "minecraft:type_family"?: {
    /**
     * List of family names.
     */
    family?: (string)[];
  };
  /**
   * UNDOCUMENTED.
   */
  "minecraft:underwater_movement"?: {
    /**
     * UNDOCUMENTED.
     */
    value?: number;
  };
  /**
   * Entities with this component will have a maximum auto step height that is different depending on wether they are on a block that prevents jumping. Incompatible with "runtime_identifier": "minecraft:horse".
   */
  "minecraft:variable_max_auto_step"?: {
    /**
     * The maximum auto step height when on any other block.
     */
    base_value?: number;
    /**
     * The maximum auto step height when on a block that prevents jumping.
     */
    jump_prevented_value?: number;
  };
  /**
   * Used to differentiate the component group of a variant of an entity from others (e.g. ocelot, villager) Parameters
   */
  "minecraft:variant"?: {
    /**
     * The ID of the variant. By convention, 0 is the ID of the base entity
     */
    value?: number;
  };
  /**
   * Vibrations emitted by this entity will be ignored.
   */
  "minecraft:vibration_damper"?: {
    [key: string]: never;
  };
  /**
   * This entity will respond to vibrations.
   */
  "minecraft:vibration_listener"?: {
    [key: string]: never;
  };
  /**
   * Sets the speed multiplier for this entity's walk animation speed.
   */
  "minecraft:walk_animation_speed"?: {
    /**
     * The higher the number, the faster the animation for walking plays. A value of 1.0 means normal speed, while 2.0 means twice as fast
     */
    value?: number;
  };
  /**
   * Sets that this entity wants to become a jockey.
   */
  "minecraft:wants_jockey"?: {
    [key: string]: never;
  };
  /**
   * Defines the speed with which an entity can move through water.
   */
  "minecraft:water_movement"?: {
    /**
     * Drag factor to determine movement speed when in water.
     */
    drag_factor?: number;
  };
  /**
   * Enables the mob to admire items that have been configured as admirable. Must be used in combination with the admire_item component.
   */
  "minecraft:behavior.admire_item"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * The sound event to play when admiring the item.
     */
    admire_item_sound?: SoundEvent;
    /**
     * The event to run when admiring the item.
     */
    on_admire_item_start?: string | EventTrigger;
    /**
     * The event to run when no longer admiring the item.
     */
    on_admire_item_stop?: string | EventTrigger;
    /**
     * The range of time in seconds to randomly wait before playing the sound again.
     */
    sound_interval?: [number, number] | number | {
      /**
       * UNDOCUMENTED.
       */
      range_min?: number;
      /**
       * UNDOCUMENTED.
       */
      range_max?: number;
    };
  };
  /**
   * Allows this entity to avoid certain blocks.
   */
  "minecraft:behavior.avoid_block"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Should start tick interval.
     */
    tick_interval?: number;
    /**
     * Maximum distance to look for a block in xz.
     */
    search_range?: number;
    /**
     * Maximum distance to look for a block in y.
     */
    search_height?: number;
    /**
     * Modifier for sprint speed. 1.0 means keep the regular speed, while higher numbers make the sprint speed faster.
     */
    sprint_speed_modifier?: number;
    /**
     * Block search method.
     */
    target_selection_method?: "random" | "nearest";
    /**
     * List of block types this mob avoids.
     */
    target_blocks?: (ItemIdentifier | ItemIdentifier | {
      /**
       * UNDOCUMENTED.
       */
      item?: ItemIdentifier | ItemIdentifier;
    })[];
    /**
     * The sound event to play when the mob is avoiding a block.
     */
    avoid_block_sound?: SoundEvent;
    /**
     * Modifier for walking speed. 1.0 means keep the regular speed, while higher numbers make the walking speed faster.
     */
    walk_speed_modifier?: number;
    /**
     * Escape trigger.
     */
    on_escape?: (string | EventTrigger)[];
    /**
     * The range of time in seconds to randomly wait before playing the sound again.
     */
    sound_interval?: [number, number] | number | {
      /**
       * UNDOCUMENTED.
       */
      range_min?: number;
      /**
       * UNDOCUMENTED.
       */
      range_max?: number;
    };
  };
  /**
   * Allows the entity to run away from other entities that meet the criteria specified.
   */
  "minecraft:behavior.avoid_mob_type"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * The sound event to play when the mob is avoiding another mob.
     */
    avoid_mob_sound?: SoundEvent;
    /**
     * The next target position the entity chooses to avoid another entity will be chosen within this XZ Distance.
     */
    avoid_target_xz?: number;
    /**
     * The next target position the entity chooses to avoid another entity will be chosen within this Y Distance.
     */
    avoid_target_y?: number;
    /**
     * Whether or not to ignore direct line of sight while this entity is running away from other specified entities.
     */
    ignore_visibilty?: boolean;
    /**
     * Maximum distance to look for an avoid target for the entity.
     */
    max_dist?: number;
    /**
     * How many blocks away from its avoid target the entity must be for it to stop fleeing from the avoid target.
     */
    max_flee?: number;
    /**
     * Percent chance this entity will stop avoiding another entity based on that entity's strength, where 1.0 = 100%.
     */
    probability_per_strength?: number;
    /**
     * Determine if we should remove target when fleeing or not.
     */
    remove_target?: boolean;
    /**
     * How many blocks within range of its avoid target the entity must be for it to begin sprinting away from the avoid target.
     */
    sprint_distance?: number;
    /**
     * Multiplier for sprint speed. 1.0 means keep the regular speed, while higher numbers make the sprint speed faster.
     */
    sprint_speed_multiplier?: number;
    /**
     * Multiplier for walking speed. 1.0 means keep the regular speed, while higher numbers make the walking speed faster.
     */
    walk_speed_multiplier?: number;
    /**
     * If true, visbility between this entity and the mob type will not be checked.
     */
    ignore_visibility?: boolean;
    /**
     * The list of conditions another entity must meet to be a valid target to avoid.
     */
    entity_types?: EntityType[] | EntityType;
    /**
     * Event that is triggered when escaping from a mob.
     */
    on_escape_event?: string | EventTrigger;
    /**
     * The range of time in seconds to randomly wait before playing the sound again.
     */
    sound_interval?: [number, number] | number | {
      /**
       * UNDOCUMENTED.
       */
      range_min?: number;
      /**
       * UNDOCUMENTED.
       */
      range_max?: number;
    };
  };
  /**
   * Enables the mob to barter for items that have been configured as barter currency. Must be used in combination with the barter component
   */
  "minecraft:behavior.barter"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
  };
  /**
   * Allows this mob to look at and follow the player that holds food they like.
   */
  "minecraft:behavior.beg"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * List of items that this mob likes.
     */
    items?: (ItemIdentifier | ItemIdentifier | {
      /**
       * UNDOCUMENTED.
       */
      item?: ItemIdentifier | ItemIdentifier;
    })[];
    /**
     * Distance in blocks the mob will beg from.
     */
    look_distance?: number;
    /**
     * A described range.
     */
    look_time?: number | [number, number] | {
      /**
       * The minimum value of the range.
       */
      range_min?: number;
      /**
       * The maximum value of the range.
       */
      range_max?: number;
    };
  };
  /**
   * Allows this mob to break doors.
   */
  "minecraft:behavior.break_door"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
  };
  /**
   * Allows this mob to breed with other mobs.
   */
  "minecraft:behavior.breed"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
  };
  /**
   * Allows this entity to celebrate surviving a raid by shooting fireworks.
   */
  "minecraft:behavior.celebrate_survive"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * A described range.
     */
    fireworks_interval?: number | [number, number] | {
      /**
       * The minimum value of the range.
       */
      range_min?: number;
      /**
       * The maximum value of the range.
       */
      range_max?: number;
    };
    /**
     * The duration in seconds that the celebration lasts for.
     */
    duration?: number;
    /**
     * The event to trigger when the goal's duration expires.
     */
    on_celebration_end_event?: string | EventTrigger;
  };
  /**
   * Allows this entity to celebrate surviving a raid by making celebration sounds and jumping.
   */
  "minecraft:behavior.celebrate"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * The sound event to trigger during the celebration.
     */
    celebration_sound?: SoundEvent;
    /**
     * The duration in seconds that the celebration lasts for.
     */
    duration?: number;
    /**
     * Minimum and maximum time between jumping (positive, in seconds).
     */
    jump_interval?: [number, number] | number | {
      /**
       * UNDOCUMENTED.
       */
      range_min?: number;
      /**
       * UNDOCUMENTED.
       */
      range_max?: number;
    };
    /**
     * The event to trigger when the goal's duration expires.
     */
    on_celebration_end_event?: EventTriggerFiltered;
    /**
     * A described range.
     */
    sound_interval?: number | [number, number] | {
      /**
       * The minimum value of the range.
       */
      range_min?: number;
      /**
       * The maximum value of the range.
       */
      range_max?: number;
    };
  };
  /**
   * Allows this entity to damage a target by using a running attack.
   */
  "minecraft:behavior.charge_attack"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * A charge attack cannot start if the entity is farther than this distance to the target.
     */
    max_distance?: number;
    /**
     * A charge attack cannot start if the entity is closer than this distance to the target.
     */
    min_distance?: number;
    /**
     * Percent chance this entity will start a charge attack, if not already attacking (1.0 = 100%)
     */
    success_rate?: number;
  };
  /**
   * Allows an entity to charge and use their held item.
   */
  "minecraft:behavior.charge_held_item"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * The list of items that can be used to charge the held item. This list is required and must have at least one item in it.
     */
    items?: (ItemIdentifier | ItemIdentifier | {
      /**
       * UNDOCUMENTED.
       */
      item?: ItemIdentifier | ItemIdentifier;
    })[];
  };
  /**
   * Causes an entity to circle around an anchor point placed near a point or target.
   */
  "minecraft:behavior.circle_around_anchor"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * A described range.
     */
    radius_range?: number | [number, number] | {
      /**
       * The minimum value of the range.
       */
      range_min?: number;
      /**
       * The maximum value of the range.
       */
      range_max?: number;
    };
    /**
     * A random value to determine when to increase the size of the radius up to the maximum. This has a 1/value chance every tick to do so.
     */
    radius_change_chance?: number;
    /**
     * A described range.
     */
    height_above_target_range?: number | [number, number] | {
      /**
       * The minimum value of the range.
       */
      range_min?: number;
      /**
       * The maximum value of the range.
       */
      range_max?: number;
    };
    /**
     * A described range.
     */
    height_offset_range?: number | [number, number] | {
      /**
       * The minimum value of the range.
       */
      range_min?: number;
      /**
       * The maximum value of the range.
       */
      range_max?: number;
    };
    /**
     * A random value to determine when to change the height of the mob from the anchor point. This has a 1/value chance every tick to do so.
     */
    height_change_chance?: number;
    /**
     * Maximum distance from the anchor-point in which this entity considers itself to have reached the anchor point. This is to prevent the entity from bouncing back and forth trying to reach a specific spot.
     */
    goal_radius?: number;
    /**
     * The number of blocks to increase the current movement radius by, upon successful `radius_adjustment_chance`. If the current radius increases over the range maximum, the current radius will be set back to the range minimum and the entity will change between clockwise and counter-clockwise movement.
     */
    radius_change?: number;
    /**
     * Percent chance to determine how often to increase the size of the current movement radius around the anchor point. 1 = 100%. `radius_change_chance` is deprecated and has been replaced with `radius_adjustment_chance`.
     */
    radius_adjustment_chance?: number;
    /**
     * Percent chance to determine how often to increase or decrease the current height around the anchor point. 1 = 100%. `height_change_chance` is deprecated and has been replaced with `height_adjustment_chance`.
     */
    height_adjustment_chance?: number;
    /**
     * Number of degrees to change this entity's facing by, when the entity selects its next anchor point.
     */
    angle_change?: number;
  };
  /**
   * Allows the entity to be controlled by the player using an item in the item_controllable property (required). Also requires the minecraft:movement property, and the minecraft:rideable property. On every tick, the entity will attempt to rotate towards where the player is facing with the control item whilst simultaneously moving forward.
   */
  "minecraft:behavior.controlled_by_player"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * The entity will attempt to rotate to face where the player is facing each tick. The entity will target this percentage of their difference in their current facing angles each tick (from 0.0 to 1.0 where 1.0 = 100%). This is limited by FractionalRotationLimit. A value of 0.0 will result in the entity no longer turning to where the player is facing.
     */
    fractional_rotation?: number;
    /**
     * Limits the total degrees the entity can rotate to face where the player is facing on each tick.
     */
    fractional_rotation_limit?: number;
    /**
     * Speed multiplier of mount when controlled by player.
     */
    mount_speed_multiplier?: number;
  };
  /**
   * [EXPERIMENTAL BEHAVIOR] Allows the entity to croak at a random time interval with configurable conditions.
   */
  "minecraft:behavior.croak"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Random range in seconds after which the croaking stops. Can also be a constant.
     */
    duration?: [number, number] | number;
    /**
     * Conditions for the behavior to start and keep running. The interval between runs only starts after passing the filters.
     */
    filters?: Filters;
    /**
     * Random range in seconds between runs of this behavior. Can also be a constant.
     */
    interval?: [number, number] | number;
  };
  /**
   * Allows the mob to target another mob that hurts an entity it trusts.
   */
  "minecraft:behavior.defend_trusted_target"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Sound to occasionally play while defending.
     */
    aggro_sound?: SoundEvent;
    /**
     * Time in seconds between attacks.
     */
    attack_interval?: number;
    /**
     * If true, only entities in this mob's viewing range can be selected as targets.
     */
    must_see?: boolean;
    /**
     * Determines the amount of time in seconds that this mob will look for a target before forgetting about it and looking for a new one when the target isn't visible any more.
     */
    must_see_forget_duration?: number;
    /**
     * The event to run when this mob starts to defend the entity it trusts.
     */
    on_defend_start?: string | EventTrigger;
    /**
     * Distance in blocks that the target can be within to launch an attack.
     */
    within_radius?: number;
    /**
     * List of entity types that this mob considers valid targets.
     */
    entity_types?: EntityType[] | EntityType;
    /**
     * Probability that a sound will play.
     */
    sound_chance?: number;
  };
  /**
   * Allows the entity to stay in a village and defend the village from aggressors. If a player is in bad standing with the village this goal will cause the entity to attack the player regardless of filter conditions.
   */
  "minecraft:behavior.defend_village_target"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * List of entity types this mob considers a threat to the village.
     */
    entity_types?: EntityType[] | EntityType;
    /**
     * The entity must be able to reach attacker.
     */
    must_reach?: boolean;
    /**
     * The percentage chance that the entity has to attack aggressors of its village, where 1.0 = 100%.
     */
    attack_chance?: number;
  };
  /**
   * Allows an entity to attack, while also delaying the damage-dealt until a specific time in the attack animation.
   */
  "minecraft:behavior.delayed_attack"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * The entity's attack animation will play out over this duration (in seconds). Also controls attack cooldown.
     */
    attack_duration?: number;
    /**
     * Allows the entity to use this attack behavior, only once EVER.
     */
    attack_once?: boolean;
    /**
     * Defines the entity types this entity will attack.
     */
    attack_types?: string;
    /**
     * Cooldown time (in seconds) between attacks.
     */
    cooldown_time?: number;
    /**
     * The percentage into the attack animation to apply the damage of the attack (1.0 = 100%).
     */
    hit_delay_pct?: number;
    /**
     * Time (in seconds) to add to attack path recalculation when the target is beyond the "path_inner_boundary".
     */
    inner_boundary_time_increase?: number;
    /**
     * Unused. No effect on "minecraft:behavior.melee_attack".
     */
    max_dist?: number;
    /**
     * Maximum base time (in seconds) to recalculate new attack path to target (before increases applied).
     */
    max_path_time?: number;
    /**
     * Field of view (in degrees) when using the sensing component to detect an attack target.
     */
    melee_fov?: number;
    /**
     * Minimum base time (in seconds) to recalculate new attack path to target (before increases applied).
     */
    min_path_time?: number;
    /**
     * Defines the event to trigger when this entity successfully attacks.
     */
    on_attack?: EventTriggerFiltered;
    /**
     * Time (in seconds) to add to attack path recalculation when the target is beyond the "path_outer_boundary".
     */
    outer_boundary_time_increase?: number;
    /**
     * Time (in seconds) to add to attack path recalculation when this entity cannot move along the current path.
     */
    path_fail_time_increase?: number;
    /**
     * Distance at which to increase attack path recalculation by "inner_boundary_tick_increase".
     */
    path_inner_boundary?: number;
    /**
     * Distance at which to increase attack path recalculation by "outer_boundary_tick_increase".
     */
    path_outer_boundary?: number;
    /**
     * This entity will have a 1 in N chance to stop it's current attack, where N = "random_stop_interval".
     */
    random_stop_interval?: number;
    /**
     * Used with the base size of the entity to determine minimum target-distance before trying to deal attack damage.
     */
    reach_multiplier?: number;
    /**
     * Toggles (on/off) the need to have a full path from the entity to the target when using this melee attack behavior.
     */
    require_complete_path?: boolean;
    /**
     * Allows the actor to be set to persist upon targeting a player.
     */
    set_persistent?: boolean;
    /**
     * Unused. No effect on "minecraft:behavior.melee_attack".
     */
    target_dist?: number;
    /**
     * Allows the entity to track the attack target, even if the entity has no sensing.
     */
    track_target?: boolean;
    /**
     * Maximum rotation (in degrees), on the X-axis, this entity can rotate while trying to look at the target.
     */
    x_max_rotation?: number;
    /**
     * Maximum rotation (in degrees), on the Y-axis, this entity can rotate its head while trying to look at the target.
     */
    y_max_head_rotation?: number;
  };
  /**
   * [EXPERIMENTAL BEHAVIOR] Activates the `DIGGING` actor flag during the specified duration. Currently only Warden can use the Dig goal
   */
  "minecraft:behavior.dig"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * If true, this behavior can run when this entity is named. Otherwise not.
     */
    allow_dig_when_named?: boolean;
    /**
     * Indicates that the actor should start digging when it sees daylight.
     */
    digs_in_daylight?: boolean;
    /**
     * Goal duration in seconds.
     */
    duration?: number;
    /**
     * The minimum idle time in seconds between the last detected disturbance to the start of digging.
     */
    idle_time?: number;
    /**
     * If true, finding new suspicious locations count as disturbances that may delay the start of this goal.
     */
    suspicion_is_disturbance?: boolean;
    /**
     * If true, vibrations count as disturbances that may delay the start of this goal.
     */
    vibration_is_disturbance?: boolean;
  };
  /**
   * Allows the mob to open and close doors.
   */
  "minecraft:behavior.door_interact"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
  };
  /**
   * Allows this entity to attack a player by charging at them. The player is chosen by the "minecraft:behavior.dragonscanning". Note: This behavior can only be used by the ender_dragon entity type.
   */
  "minecraft:behavior.dragonchargeplayer"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * The speed this entity moves when this behavior has started or while it's active.
     */
    active_speed?: number;
    /**
     * If the dragon is outside the "target_zone" for longer than "continue_charge_threshold_time" seconds, the charge is canceled.
     */
    continue_charge_threshold_time?: number;
    /**
     * The speed this entity moves while this behavior is not active.
     */
    flight_speed?: number;
    /**
     * A described range.
     */
    target_zone?: number | [number, number] | {
      /**
       * The minimum value of the range.
       */
      range_min?: number;
      /**
       * The maximum value of the range.
       */
      range_max?: number;
    };
    /**
     * The speed at which this entity turns while using this behavior.
     */
    turn_speed?: number;
  };
  /**
   * Controls the entity's death state and animation. Note: This behavior can only be used by the ender_dragon entity type.
   */
  "minecraft:behavior.dragondeath"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
  };
  /**
   * Allows this entity to use a flame-breath attack. Note: This behavior can only be used by the ender_dragon entity type.
   */
  "minecraft:behavior.dragonflaming"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Time (in seconds), after roar, to breath flame.
     */
    cooldown_time?: number;
    /**
     * Time (in seconds), after roar, to breath flame.
     */
    flame_time?: number;
    /**
     * Number of ground flame-breath attacks to use before flight-takeoff.
     */
    ground_flame_count?: number;
    /**
     * Time (in seconds) to roar, before breathing flame.
     */
    roar_time?: number;
  };
  /**
   * Allows the Dragon to fly around in a circle around the center podium. Note: This behavior can only be used by the ender_dragon entity type.
   */
  "minecraft:behavior.dragonholdingpattern"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
  };
  /**
   * Allows the Dragon to stop flying and transition into perching mode. Note: This behavior can only be used by the ender_dragon entity type.
   */
  "minecraft:behavior.dragonlanding"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
  };
  /**
   * Allows an entity to look around for a player to attack while in perch mode. Note: This behavior can only be used by the ender_dragon entity type.
   */
  "minecraft:behavior.dragonscanning"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
  };
  /**
   * Allows this entity to fly around looking for a player to shoot fireballs at. Note: This behavior can only be used by the ender_dragon entity type.
   */
  "minecraft:behavior.dragonstrafeplayer"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * The speed this entity moves when this behavior has started or while it's active.
     */
    active_speed?: number;
    /**
     * Maximum distance of this entity's fireball attack while strafing.
     */
    fireball_range?: number;
    /**
     * The speed this entity moves while this behavior is not active.
     */
    flight_speed?: number;
    /**
     * Percent chance to to switch this entity's strafe direction between clockwise and counterclockwise. Switch direction chance occurs each time a new target is chosen (1.0 = 100%).
     */
    switch_direction_probability?: number;
    /**
     * Time (in seconds) the target must be in fireball range, and in view [ie, no solid terrain in-between the target and this entity], before a fireball can be shot.
     */
    target_in_range_and_in_view_time?: number;
    /**
     * A described range.
     */
    target_zone?: number | [number, number] | {
      /**
       * The minimum value of the range.
       */
      range_min?: number;
      /**
       * The maximum value of the range.
       */
      range_max?: number;
    };
    /**
     * The speed at which this entity turns while using this behavior.
     */
    turn_speed?: number;
    /**
     * The target must be within "view_angle" degrees of the dragon's current rotation before a fireball can be shot.
     */
    view_angle?: number;
  };
  /**
   * Allows an entity to leave perch mode and go back to flying around. Note: This behavior can only be used by the ender_dragon entity type.
   */
  "minecraft:behavior.dragontakeoff"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
  };
  /**
   * Allows the mob to drink milk based on specified environment conditions.
   */
  "minecraft:behavior.drink_milk"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Time (in seconds) that the goal is on cooldown before it can be used again.
     */
    cooldown_seconds?: number;
    /**
     * Conditions that need to be met for the behavior to start.
     */
    filters?: Filters;
  };
  /**
   * Allows the mob to drink potions based on specified environment conditions.
   */
  "minecraft:behavior.drink_potion"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * Movement speed modifier of the mob when using this AI Goal.
     */
    speed_modifier?: number;
    /**
     * A list of potions that this entity can drink.
     */
    potions?: ({
      /**
       * The registry ID of the potion to use.
       */
      id?: number;
      /**
       * The percent chance (from 0.0 to 1.0) of this potion being selected when searching for a potion to use.
       */
      chance?: number;
      /**
       * The filters to use when determining if this potion can be selected.
       */
      filters?: Filters;
    })[];
  };
  /**
   * Allows the entity to move toward a target, and drop an item near the target. This goal requires a "minecraft:navigation" to execute.
   */
  "minecraft:behavior.drop_item_for"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * The list of conditions another entity must meet to be a valid target to drop an item for.
     */
    entity_types?: EntityType[] | EntityType;
    /**
     * Total time that the goal is on cooldown before it can be used again.
     */
    cooldown?: number;
    /**
     * The percent chance the entity will drop an item when using this goal.
     */
    drop_item_chance?: number;
    /**
     * Distance in blocks within the entity considers it has reached it's target position.
     */
    goal_radius?: number;
    /**
     * The loot table that contains the possible loot the entity can drop with this goal.
     */
    loot_table?: string;
    /**
     * The maximum height the entities head will look at when dropping the item. The entity will always be looking at its target.
     */
    max_head_look_at_height?: number;
    /**
     * If the target position is farther away than this distance on any tick, the entity will teleport to the target position.
     */
    minimum_teleport_distance?: number;
    /**
     * The preferred distance the entity tries to be from the target it is dropping an item for.
     */
    offering_distance?: number;
    /**
     * The event to trigger when the entity attempts to drop an item.
     */
    on_drop_attempt?: EventTriggerFiltered;
    /**
     * The number of blocks each tick that the entity will check within its search range and height for a valid block to move to. A value of 0 will have the mob check every block within range in one tick.
     */
    search_count?: number;
    /**
     * The Height in blocks the entity will search within to find a valid target position.
     */
    search_height?: number;
    /**
     * The distance in blocks the entity will search within to find a valid target position.
     */
    search_range?: number;
    /**
     * The numbers of seconds that will pass before the dropped entity can be picked up from the ground.
     */
    seconds_before_pickup?: number;
    /**
     * An vector of 3 number.
     */
    target_range?: [number, number, number];
    /**
     * An vector of 3 number.
     */
    teleport_offset?: [number, number, number];
    /**
     * A described range.
     */
    time_of_day_range?: number | [number, number] | {
      /**
       * The minimum value of the range.
       */
      range_min?: number;
      /**
       * The maximum value of the range.
       */
      range_max?: number;
    };
  };
  /**
   * Allows the entity to consume a block, replace the eaten block with another block, and trigger an event as a result.
   */
  "minecraft:behavior.eat_block"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * The event to trigger when the block eating animation has completed.
     */
    on_eat?: EventTriggerFiltered;
    /**
     * The minecraft molang definition that results in a float.
     */
    success_chance?: string | number;
    /**
     * The amount of time (in seconds) it takes for the block to be eaten upon a successful eat attempt.
     */
    time_until_eat?: number;
    /**
     * A collection of pairs of blocks; the first ("eat_block")is the block the entity should eat, the second ("replace_block") is the block that should replace the eaten block.
     */
    eat_and_replace_block_pairs?: ({
      /**
       * The block to eat.
       */
      eat_block?: ItemIdentifier;
      /**
       * The block to replace the eaten block with.
       */
      replace_block?: ItemIdentifier;
    })[];
  };
  /**
   * If the mob is carrying a food item, the mob will eat it and the effects will be applied to the mob.
   */
  "minecraft:behavior.eat_carried_item"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Time in seconds the mob should wait before eating the item.
     */
    delay_before_eating?: number;
  };
  /**
   * [EXPERIMENTAL BEHAVIOR] Allows the entity to eat a specified Mob.
   */
  "minecraft:behavior.eat_mob"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Sets the time in seconds the eat animation should play for.
     */
    eat_animation_time?: number;
    /**
     * Sets the sound that should play when eating a mob.
     */
    eat_mob_sound?: SoundEvent;
    /**
     * The loot table for loot to be dropped when eating a mob.
     */
    loot_table?: string;
    /**
     * Sets the force which the mob-to-be-eaten is pulled towards the eating mob.
     */
    pull_in_force?: number;
    /**
     * Sets the desired distance to be reached before eating the mob.
     */
    reach_mob_distance?: number;
    /**
     * Sets the entity's speed when running toward the target.
     */
    run_speed?: number;
  };
  /**
   * [EXPERIMENTAL BEHAVIOR] Allows the entity to eat a specified Mob.
   */
  "minecraft:behavior.emerge"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Sets the time in seconds the eat animation should play for.
     */
    eat_animation_time?: number;
    /**
     * Sets the sound that should play when eating a mob.
     */
    eat_mob_sound?: SoundEvent;
    /**
     * The loot table for loot to be dropped when eating a mob.
     */
    loot_table?: string;
    /**
     * Sets the force which the mob-to-be-eaten is pulled towards the eating mob.
     */
    pull_in_force?: number;
    /**
     * Sets the desired distance to be reached before eating the mob.
     */
    reach_mob_distance?: number;
    /**
     * Sets the entity's speed when running toward the target.
     */
    run_speed?: number;
  };
  /**
   * Allows the enderman to drop a block they are carrying. Can only be used by Endermen.
   */
  "minecraft:behavior.enderman_leave_block"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
  };
  /**
   * Allows the enderman to take a block and carry it around. Can only be used by Endermen.
   */
  "minecraft:behavior.enderman_take_block"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
  };
  /**
   * The entity puts on the desired equipment.
   */
  "minecraft:behavior.equip_item"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
  };
  /**
   * Allows the entity to first travel to a random point on the outskirts of the village, and then explore random points within a small distance. This goal requires "minecraft:dweller" and "minecraft:navigation" to execute.
   */
  "minecraft:behavior.explore_outskirts"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * An vector of 3 number.
     */
    dist_from_boundary?: [number, number, number];
    /**
     * Total distance in blocks the the entity will explore beyond the village bounds when choosing its travel point.
     */
    explore_dist?: number;
    /**
     * This is the maximum amount of time an entity will attempt to reach it's travel point on the outskirts of the village before the goal exits.
     */
    max_travel_time?: number;
    /**
     * The wait time in seconds between choosing new explore points will be chosen on a random interval between this value and the minimum wait time. This value is also the total amount of time the entity will explore random points before the goal stops.
     */
    max_wait_time?: number;
    /**
     * The entity must be within this distance for it to consider it has successfully reached its target.
     */
    min_dist_from_target?: number;
    /**
     * The minimum perimeter of the village required to run this goal.
     */
    min_perimeter?: number;
    /**
     * The wait time in seconds between choosing new explore points will be chosen on a random interval between this value and the maximum wait time.
     */
    min_wait_time?: number;
    /**
     * A new explore point will randomly be chosen within this XZ distance of the current target position when navigation has finished and the wait timer has elapsed.
     */
    next_xz?: number;
    /**
     * A new explore point will randomly be chosen within this Y distance of the current target position when navigation has finished and the wait timer has elapsed.
     */
    next_y?: number;
    /**
     * Each new explore point will be chosen on a random interval between the minimum and the maximum wait time, divided by this value. This does not apply to the first explore point chosen when the goal runs.
     */
    timer_ratio?: number;
  };
  /**
   * Allows the mob to search within an area for a growable crop block. If found, the mob will use any available fertilizer in their inventory on the crop. This goal will not execute if the mob does not have a fertilizer item in its inventory.
   */
  "minecraft:behavior.fertilize_farm_block"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * Distance in blocks within the mob considers it has reached it's target position.
     */
    goal_radius?: number;
    /**
     * The maximum number of times the mob will use fertilzer on the target block.
     */
    max_fertilizer_usage?: number;
    /**
     * The maximum amount of time in seconds that the goal can take before searching again. The time is chosen between 0 and this number.
     */
    search_cooldown_max_seconds?: number;
    /**
     * The number of randomly selected blocks each tick that the mob will check within its search range and height for a valid block to move to. A value of 0 will have the mob check every block within range in one tick.
     */
    search_count?: number;
    /**
     * The Height in blocks the mob will search within to find a valid target position.
     */
    search_height?: number;
    /**
     * The distance in blocks the mob will search within to find a valid target position.
     */
    search_range?: number;
  };
  /**
   * Allows the mob to seek shade.
   */
  "minecraft:behavior.find_cover"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * Time in seconds the mob has to wait before using the goal again.
     */
    cooldown_time?: number;
  };
  /**
   * Allows the mob to look around for another mob to ride atop it.
   */
  "minecraft:behavior.find_mount"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * If true, the mob will not go into water blocks when going towards a mount.
     */
    avoid_water?: boolean;
    /**
     * This is the distance the mob needs to be, in blocks, from the desired mount to mount it. If the value is below 0, the mob will use its default attack distance
     */
    mount_distance?: number;
    /**
     * Time the mob will wait before starting to move towards the mount.
     */
    start_delay?: number;
    /**
     * If true, the mob will only look for a mount if it has a target.
     */
    target_needed?: boolean;
    /**
     * Distance in blocks within which the mob will look for a mount.
     */
    within_radius?: number;
    /**
     * The number of failed attempts to make before this goal is no longer used.
     */
    max_failed_attempts?: number;
  };
  /**
   * Allows the mob to move towards the nearest underwater ruin or shipwreck.
   */
  "minecraft:behavior.find_underwater_treasure"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * The range that the mob will search for a treasure chest within a ruin or shipwreck to move towards.
     */
    search_range?: number;
    /**
     * The distance the mob will move before stopping.
     */
    stop_distance?: number;
  };
  /**
   * Allows the mob to run away from direct sunlight and seek shade.
   */
  "minecraft:behavior.flee_sun"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
  };
  /**
   * Allows the mob to float around like the Ghast.
   */
  "minecraft:behavior.float_wander"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Distance in blocks on ground that the mob will look for a new spot to move to. Must be at least 1
     */
    xz_dist?: number;
    /**
     * Distance in blocks that the mob will look up or down for a new spot to move to. Must be at least 1
     */
    y_dist?: number;
    /**
     * Height in blocks to add to the selected target position.
     */
    y_offset?: number;
    /**
     * If true, the point has to be reachable to be a valid target.
     */
    must_reach?: boolean;
    /**
     * If true, the mob will randomly pick a new point while moving to the previously selected one.
     */
    random_reselect?: boolean;
    /**
     * A described range.
     */
    float_duration?: number | [number, number] | {
      /**
       * The minimum value of the range.
       */
      range_min?: number;
      /**
       * The maximum value of the range.
       */
      range_max?: number;
    };
  };
  /**
   * Allows the mob to stay afloat while swimming.
   */
  "minecraft:behavior.float"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
  };
  /**
   * Allows the mob to follow mobs that are in a caravan.
   */
  "minecraft:behavior.follow_caravan"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * List of entity types that this mob can follow in a caravan.
     */
    entity_types?: EntityType[] | EntityType;
    /**
     * Number of entities that can be in the caravan.
     */
    entity_count?: number;
  };
  /**
   * Allows the mob to follow other mobs.
   */
  "minecraft:behavior.follow_mob"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * The distance in blocks it will look for a mob to follow.
     */
    search_range?: number;
    /**
     * The distance in blocks this mob stops from the mob it is following.
     */
    stop_distance?: number;
  };
  /**
   * Allows the mob to follow the player that owns them.
   */
  "minecraft:behavior.follow_owner"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * Specify if the mob can teleport to the player if it is too far away.
     */
    can_teleport?: boolean;
    /**
     * Specify if the mob will follow the owner if it has heard a vibration lately.
     */
    ignore_vibration?: boolean;
    /**
     * The maximum distance in blocks this mob can be from its owner to start following, only used when canTeleport is false.
     */
    max_distance?: number;
    /**
     * The distance in blocks that the owner can be away from this mob before it starts following it.
     */
    start_distance?: number;
    /**
     * The distance in blocks this mob will stop from its owner while following it.
     */
    stop_distance?: number;
  };
  /**
   * Allows the mob to follow their parent around.
   */
  "minecraft:behavior.follow_parent"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
  };
  /**
   * Allows mob to move towards its current target captain.
   */
  "minecraft:behavior.follow_target_captain"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * Defines the distance in blocks the mob will stay from its target while following.
     */
    follow_distance?: number;
    /**
     * Defines the maximum distance in blocks a mob can get from its target captain before giving up trying to follow it.
     */
    within_radius?: number;
  };
  /**
   * [EXPERIMENTAL BEHAVIOR] The entity will attempt to toss the items from its inventory to a nearby recently played noteblock.
   */
  "minecraft:behavior.go_and_give_items_to_noteblock"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Sets the time an entity should continue delivering items to a noteblock after hearing it.
     */
    listen_time?: number;
    /**
     * Event(s) to run when this mob throws items.
     */
    on_item_throw?: EventTriggerFiltered | (EventTriggerFiltered)[];
    /**
     * Sets the desired distance to be reached before throwing the items towards the block.
     */
    reach_block_distance?: number;
    /**
     * Sets the entity's speed when running toward the block.
     */
    run_speed?: number;
    /**
     * Sets the throw force.
     */
    throw_force?: number;
    /**
     * Sound to play when this mob throws an item.
     */
    throw_sound?: SoundEvent;
    /**
     * Sets the vertical throw multiplier that is applied on top of the throw force in the vertical direction.
     */
    vertical_throw_mul?: number;
  };
  /**
   * [EXPERIMENTAL BEHAVIOR] The entity will attempt to toss the items from its inventory to its owner.
   */
  "minecraft:behavior.go_and_give_items_to_owner"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Event(s) to run when this mob throws items.
     */
    on_item_throw?: EventTriggerFiltered;
    /**
     * Sets the desired distance to be reached before giving items to owner.
     */
    reach_mob_distance?: number;
    /**
     * Sets the entity's speed when running toward the owner.
     */
    run_speed?: number;
    /**
     * Sets the throw force.
     */
    throw_force?: number;
    /**
     * Sound to play when this mob throws an item.
     */
    throw_sound?: SoundEvent;
    /**
     * Sets the vertical throw multiplier that is applied on top of the throw force in the vertical direction.
     */
    vertical_throw_mul?: number;
  };
  /**
   * Allows the mob to move back to the position they were spawned.
   */
  "minecraft:behavior.go_home"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * Distance in blocks within the mob considers it has reached the goal. This is the `wiggle room` to stop the AI from bouncing back and forth trying to reach a specific spot
     */
    goal_radius?: number;
    /**
     * A random value to determine when to randomly move somewhere. This has a 1/interval chance to choose this goal
     */
    interval?: number;
    /**
     * Event(s) to run when this mob gets home.
     */
    on_home?: (EventTriggerFiltered)[];
    /**
     * Event(s) to run when this goal fails.
     */
    on_failed?: (string | EventTrigger)[];
    /**
     * Distance in blocks that the mob is considered close enough to the end of the current path. A new path will then be calculated to continue toward home.
     */
    calculate_new_path_radius?: number;
  };
  /**
   * Allows this entity to use a laser beam attack. Can only be used by Guardians and Elder Guardians.
   */
  "minecraft:behavior.guardian_attack"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Amount of additional damage dealt from an elder guardian's magic attack.
     */
    elder_extra_magic_damage?: number;
    /**
     * In hard difficulty, amount of additional damage dealt from a guardian's magic attack.
     */
    hard_mode_extra_magic_damage?: number;
    /**
     * Amount of damage dealt from a guardian's magic attack. Magic attack damage is added to the guardian's base attack damage.
     */
    magic_damage?: number;
    /**
     * Guardian attack behavior stops if the target is closer than this distance (doesn't apply to elders).
     */
    min_distance?: number;
    /**
     * Time (in seconds) to wait after starting an attack before playing the guardian attack sound.
     */
    sound_delay_time?: number;
    /**
     * Maximum rotation (in degrees), on the X-axis, this entity can rotate while trying to look at the target.
     */
    x_max_rotation?: number;
    /**
     * Maximum rotation (in degrees), on the Y-axis, this entity can rotate its head while trying to look at the target.
     */
    y_max_head_rotation?: number;
  };
  /**
   * Allows the entity to search within an area for farmland with air above it. If found, the entity will replace the air block by planting a seed item from its inventory on the farmland block. This goal requires "minecraft:inventory" and "minecraft:navigation" to execute. This goal will not execute if the entity does not have an item in its inventory.
   */
  "minecraft:behavior.harvest_farm_block"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * The maximum amount of time in seconds that the goal can take before searching for the first harvest block. The time is chosen between 0 and this number.
     */
    max_seconds_before_search?: number;
    /**
     * The maximum amount of time in seconds that the goal can take before searching again, after failing to find a a harvest block already. The time is chosen between 0 and this number.
     */
    search_cooldown_max_seconds?: number;
    /**
     * The number of randomly selected blocks each tick that the entity will check within its search range and height for a valid block to move to. A value of 0 will have the mob check every block within range in one tick.
     */
    search_count?: number;
    /**
     * The height in blocks the entity will search within to find a valid target position.
     */
    search_height?: number;
    /**
     * The distance in blocks the entity will search within to find a valid target position.
     */
    search_range?: number;
    /**
     * The amount of time in seconds that the goal will cooldown after a successful reap/sow, before it can start again.
     */
    seconds_until_new_task?: number;
  };
  /**
   * Allows a mob with the hide component to attempt to move to - and hide at - an owned or nearby POI.
   */
  "minecraft:behavior.hide"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * Amount of time in seconds that the mob reacts.
     */
    duration?: number;
    /**
     * Defines what POI type to hide at.
     */
    poi_type?: string;
    /**
     * The cooldown time in seconds before the goal can be reused after a internal failure or timeout condition.
     */
    timeout_cooldown?: number;
  };
  /**
   * The mob freezes and looks at the mob they are targeting.
   */
  "minecraft:behavior.hold_ground"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Whether to broadcast out the mob's target to other mobs of the same type.
     */
    broadcast?: boolean;
    /**
     * Range in blocks for how far to broadcast.
     */
    broadcast_range?: number;
    /**
     * Minimum distance the target must be for the mob to run this goal.
     */
    min_radius?: number;
    /**
     * Event to run when target is within the radius. This event is broadcasted if broadcast is true.
     */
    within_radius_event?: string | EventTrigger;
  };
  /**
   * Allows the mob to target another mob that hurts them.
   */
  "minecraft:behavior.hurt_by_target"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * List of entity types that this mob can target if they hurt their owner.
     */
    entity_types?: EntityType[] | EntityType;
    /**
     * If true, nearby mobs of the same type will be alerted about the damage.
     */
    alert_same_type?: boolean;
    /**
     * If true, the mob will hurt its owner and other mobs with the same owner as itself.
     */
    hurt_owner?: boolean;
  };
  /**
   * Allows the mob to inspect bookshelves.
   */
  "minecraft:behavior.inspect_bookshelf"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * Distance in blocks within the mob considers it has reached the goal. This is the `wiggle room` to stop the AI from bouncing back and forth trying to reach a specific spot
     */
    goal_radius?: number;
    /**
     * The number of blocks each tick that the mob will check within it's search range and height for a valid block to move to. A value of 0 will have the mob check every block within range in one tick
     */
    search_count?: number;
    /**
     * The height that the mob will search for bookshelves.
     */
    search_height?: number;
    /**
     * Distance in blocks the mob will look for books to inspect.
     */
    search_range?: number;
  };
  /**
   * Allows an entity to jump to another random block.
   */
  "minecraft:behavior.jump_to_block"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * An vector of 2 number.
     */
    cooldown_range?: [number, number];
    /**
     * Blocks that the mob can't jump to.
     */
    forbidden_blocks?: (ItemIdentifier | ItemIdentifier | {
      /**
       * UNDOCUMENTED.
       */
      item?: ItemIdentifier | ItemIdentifier;
    })[];
    /**
     * The maximum velocity with which the mob can jump.
     */
    max_velocity?: number;
    /**
     * The minimum distance (in blocks) from the mob to a block, in order to consider jumping to it.
     */
    minimum_distance?: number;
    /**
     * The minimum length (in blocks) of the mobs path to a block, in order to consider jumping to it.
     */
    minimum_path_length?: number;
    /**
     * Blocks that the mob prefers jumping to.
     */
    preferred_blocks?: (ItemIdentifier | ItemIdentifier | {
      /**
       * UNDOCUMENTED.
       */
      item?: ItemIdentifier | ItemIdentifier;
    })[];
    /**
     * Chance (between 0.0 and 1.0) that the mob will jump to a preferred block, if in range. Only matters if preferred blocks are defined.
     */
    preferred_blocks_chance?: number;
    /**
     * The scalefactor of the bounding box of the mob while it is jumping.
     */
    scale_factor?: number;
    /**
     * The height (in blocks, in range [2, 15]) of the search box, centered around the mob.
     */
    search_height?: number;
    /**
     * The width (in blocks, in range [2, 15]) of the search box, centered around the mob.
     */
    search_width?: number;
  };
  /**
   * Allows the mob to perform a damaging knockback that affects all nearby entities.
   */
  "minecraft:behavior.knockback_roar"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * The delay after which the knockback occurs (in seconds).
     */
    attack_time?: number;
    /**
     * Time in seconds the mob has to wait before using the goal again.
     */
    cooldown_time?: number;
    /**
     * The list of conditions another entity must meet to be a valid target to apply damage to.
     */
    damage_filters?: Filters;
    /**
     * The duration of the roar (in seconds).
     */
    duration?: number;
    /**
     * The damage dealt by the knockback roar.
     */
    knockback_damage?: number;
    /**
     * The strength of the knockback.
     */
    knockback_strength?: number;
    /**
     * The list of conditions another entity must meet to be a valid target to apply knockback to.
     */
    knockback_filters?: Filters;
    /**
     * The strength of the horizontal knockback.
     */
    knockback_horizontal_strength?: number;
    /**
     * The radius (in blocks) of the knockback effect.
     */
    knockback_range?: number;
    /**
     * The strength of the vertical knockback.
     */
    knockback_vertical_strength?: number;
    /**
     * The maximum height for vertical knockback.
     */
    knockback_height_cap?: number;
    /**
     * If true, this mob will chase after the target as long as it's a valid target.
     */
    track_target?: boolean;
    /**
     * Event that is triggered when the roar ends.
     */
    on_roar_end?: string | EventTrigger;
  };
  /**
   * Allows mobs to lay down at times.
   */
  "minecraft:behavior.lay_down"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * A random value to determine at what intervals something can occur. This has a 1/interval chance to choose this goal
     */
    interval?: number;
    /**
     * A random value in which the goal can use to pull out of the behavior. This is a 1/interval chance to play the sound
     */
    random_stop_interval?: number;
  };
  /**
   * Allows the mob to lay an egg block on a sand block if the mob is pregnant.
   */
  "minecraft:behavior.lay_egg"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * [EXPERIMENTAL] Allows the mob to lay its eggs from below the target if it can't get there. This is useful if the target block is water with air above, since mobs may not be able to get to the air block above water.
     */
    allow_laying_from_below?: boolean;
    /**
     * UNDOCUMENTED.
     */
    egg_type?: ItemIdentifier | ItemIdentifier | {
      /**
       * UNDOCUMENTED.
       */
      item?: ItemIdentifier | ItemIdentifier;
    };
    /**
     * Distance in blocks within the mob considers it has reached the goal. This is the "wiggle room" to stop the AI from bouncing back and forth trying to reach a specific spot
     */
    goal_radius?: number;
    /**
     * [EXPERIMENTAL] Sound event name for laying egg. Defaulted to lay_egg which is used for Turtles.
     */
    lay_egg_sound?: SoundEvent;
    /**
     * [EXPERIMENTAL] Duration of the laying egg process in seconds.
     */
    lay_seconds?: number;
    /**
     * Event to run when this mob lays the egg.
     */
    on_lay?: EventTriggerFiltered;
    /**
     * Height in blocks the mob will look for a target block to move towards.
     */
    search_height?: number;
    /**
     * The distance in blocks it will look for a target block to move towards.
     */
    search_range?: number;
    /**
     * [EXPERIMENTAL] Blocks that the mob can lay its eggs on top of.
     */
    target_blocks?: (ItemIdentifier | ItemIdentifier | {
      /**
       * UNDOCUMENTED.
       */
      item?: ItemIdentifier | ItemIdentifier;
    })[];
    /**
     * [EXPERIMENTAL] Types of materials that can exist above the target block. Valid types are Air, Water, and Lava.
     */
    target_materials_above_block?: "Air" | "Any" | "Lava" | "Water";
    /**
     * [EXPERIMENTAL] Specifies if the default lay-egg animation should be played when the egg is placed or not.
     */
    use_default_animation?: boolean;
  };
  /**
   * Allows monsters to jump at and attack their target. Can only be used by hostile mobs.
   */
  "minecraft:behavior.leap_at_target"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * If true, the mob will only jump at its target if its on the ground. Setting it to false will allow it to jump even if its already in the air
     */
    must_be_on_ground?: boolean;
    /**
     * Allows the actor to be set to persist upon targeting a player.
     */
    set_persistent?: boolean;
    /**
     * The height in blocks the mob jumps when leaping at its target.
     */
    yd?: number;
    /**
     * Distance in blocks the mob jumps when leaping at its target.
     */
    target_dist?: number;
  };
  /**
   * Allows the mob to look at nearby entities.
   */
  "minecraft:behavior.look_at_entity"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * The distance in blocks from which the entity will look at.
     */
    look_distance?: number;
    /**
     * The probability of looking at the target. A value of 1.00 is 100%
     */
    probability?: number;
    /**
     * A described range.
     */
    look_time?: number | [number, number] | {
      /**
       * The minimum value of the range.
       */
      range_min?: number;
      /**
       * The maximum value of the range.
       */
      range_max?: number;
    };
    /**
     * The angle in degrees that the mob can see in the X-axis (left-right).
     */
    angle_of_view_vertical?: number;
    /**
     * The angle in degrees that the mob can see in the Y-axis (up-down).
     */
    angle_of_view_horizontal?: number;
    /**
     * Filter to determine the conditions for this mob to look at the entity.
     */
    filters?: Filters;
  };
  /**
   * Allows the mob to look at the player when the player is nearby.
   */
  "minecraft:behavior.look_at_player"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * The angle in degrees that the mob can see in the X-axis (left-right).
     */
    angle_of_view_vertical?: number;
    /**
     * The angle in degrees that the mob can see in the Y-axis (up-down).
     */
    angle_of_view_horizontal?: number;
    /**
     * The distance in blocks from which the entity will look at.
     */
    look_distance?: number;
    /**
     * The probability of looking at the target. A value of 1.00 is 100%
     */
    probability?: number;
    /**
     * Time range to look at the entity.
     */
    look_time?: [number, number];
    /**
     * The distance in blocks from which the entity will choose a target.
     */
    target_distance?: number;
  };
  /**
   * Allows the mob to look at the entity they are targetting.
   */
  "minecraft:behavior.look_at_target"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * The distance in blocks from which the entity will look at.
     */
    look_distance?: number;
    /**
     * The probability of looking at the target. A value of 1.00 is 100%
     */
    probability?: number;
    /**
     * A described range.
     */
    look_time?: number | [number, number] | {
      /**
       * The minimum value of the range.
       */
      range_min?: number;
      /**
       * The maximum value of the range.
       */
      range_max?: number;
    };
    /**
     * The angle in degrees that the mob can see in the X-axis (left-right).
     */
    angle_of_view_vertical?: number;
    /**
     * The angle in degrees that the mob can see in the Y-axis (up-down).
     */
    angle_of_view_horizontal?: number;
  };
  /**
   * Allows the mob to look at the player they are trading with.
   */
  "minecraft:behavior.look_at_trading_player"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * The distance in blocks from which the entity will look at.
     */
    look_distance?: number;
    /**
     * The probability of looking at the target. A value of 1.00 is 100%
     */
    probability?: number;
    /**
     * A described range.
     */
    look_time?: number | [number, number] | {
      /**
       * The minimum value of the range.
       */
      range_min?: number;
      /**
       * The maximum value of the range.
       */
      range_max?: number;
    };
    /**
     * The angle in degrees that the mob can see in the X-axis (left-right).
     */
    angle_of_view_vertical?: number;
    /**
     * The angle in degrees that the mob can see in the Y-axis (up-down).
     */
    angle_of_view_horizontal?: number;
  };
  /**
   * Allows the villager to look for a mate to spawn other villagers with. Can only be used by Villagers.
   */
  "minecraft:behavior.make_love"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
  };
  /**
   * Allows the mob to use close combat melee attacks.
   */
  "minecraft:behavior.melee_attack"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * Allows the entity to use this attack behavior, only once EVER.
     */
    attack_once?: boolean;
    /**
     * Defines the entity types this entity will attack.
     */
    attack_types?: string;
    /**
     * Cooldown time (in seconds) between attacks.
     */
    cooldown_time?: number;
    /**
     * Time (in seconds) to add to attack path recalculation when the target is beyond the "path_inner_boundary".
     */
    inner_boundary_time_increase?: number;
    /**
     * Unused. No effect on "minecraft:behavior.melee_attack".
     */
    max_dist?: number;
    /**
     * Maximum base time (in seconds) to recalculate new attack path to target (before increases applied).
     */
    max_path_time?: number;
    /**
     * Field of view (in degrees) when using the sensing component to detect an attack target.
     */
    melee_fov?: number;
    /**
     * Minimum base time (in seconds) to recalculate new attack path to target (before increases applied).
     */
    min_path_time?: number;
    /**
     * Defines the event to trigger when this entity successfully attacks.
     */
    on_attack?: EventTriggerFiltered;
    /**
     * Defines the event to trigger when this entity successfully kills.
     */
    on_kill?: EventTriggerFiltered;
    /**
     * Time (in seconds) to add to attack path recalculation when the target is beyond the "path_outer_boundary".
     */
    outer_boundary_time_increase?: number;
    /**
     * Time (in seconds) to add to attack path recalculation when this entity cannot move along the current path.
     */
    path_fail_time_increase?: number;
    /**
     * Distance at which to increase attack path recalculation by "inner_boundary_tick_increase".
     */
    path_inner_boundary?: number;
    /**
     * Distance at which to increase attack path recalculation by "outer_boundary_tick_increase".
     */
    path_outer_boundary?: number;
    /**
     * This entity will have a 1 in N chance to stop it's current attack, where N = "random_stop_interval".
     */
    random_stop_interval?: number;
    /**
     * Used with the base size of the entity to determine minimum target-distance before trying to deal attack damage.
     */
    reach_multiplier?: number;
    /**
     * Toggles (on/off) the need to have a full path from the entity to the target when using this melee attack behavior.
     */
    require_complete_path?: boolean;
    /**
     * Allows the actor to be set to persist upon targeting a player.
     */
    set_persistent?: boolean;
    /**
     * Unused. No effect on "minecraft:behavior.melee_attack".
     */
    target_dist?: number;
    /**
     * Allows the entity to track the attack target, even if the entity has no sensing.
     */
    track_target?: boolean;
    /**
     * Maximum rotation (in degrees), on the X-axis, this entity can rotate while trying to look at the target.
     */
    x_max_rotation?: number;
    /**
     * Maximum rotation (in degrees), on the Y-axis, this entity can rotate its head while trying to look at the target.
     */
    y_max_head_rotation?: number;
  };
  /**
   * Allows an entity to go to the village bell and mingle with other entities.
   */
  "minecraft:behavior.mingle"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * Time in seconds the mob has to wait before using the goal again.
     */
    cooldown_time?: number;
    /**
     * Amount of time in seconds that the entity will chat with another entity.
     */
    duration?: number;
    /**
     * The distance from its partner that this entity will mingle. If the entity type is not the same as the entity, this value needs to be identical on both entities.
     */
    mingle_distance?: number;
    /**
     * The entity type that this entity is allowed to mingle with.
     */
    mingle_partner_type?: (string)[] | string;
  };
  /**
   * Allows the mob to move around on its own while mounted seeking a target to attack.
   */
  "minecraft:behavior.mount_pathing"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * The distance at which this mob wants to be away from its target.
     */
    target_dist?: number;
    /**
     * If true, this mob will chase after the target as long as it's a valid target.
     */
    track_target?: boolean;
  };
  /**
   * Can only be used by Villagers. Allows them to seek shelter indoors.
   */
  "minecraft:behavior.move_indoors"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * The cooldown time in seconds before the goal can be reused after pathfinding fails.
     */
    timeout_cooldown?: number;
  };
  /**
   * Forces the entity to move `outside`, whatever that means.
   */
  "minecraft:behavior.move_outdoors"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * The radius away from the target block to count as reaching the goal.
     */
    goal_radius?: number;
    /**
     * The amount of times to try finding a random outdoors position before failing.
     */
    search_count?: number;
    /**
     * The y range to search for an outdoors position for.
     */
    search_height?: number;
    /**
     * The x and z range to search for an outdoors position for.
     */
    search_range?: number;
    /**
     * The cooldown time in seconds before the goal can be reused after pathfinding fails.
     */
    timeout_cooldown?: number;
  };
  /**
   * Can only be used by Villagers. Allows the villagers to create paths around the village.
   */
  "minecraft:behavior.move_through_village"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * If true, the mob will only move through the village during night time.
     */
    only_at_night?: boolean;
  };
  /**
   * Allows mob to move towards a block.
   */
  "minecraft:behavior.move_to_block"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Distance in blocks within the mob considers it has reached the goal. This is the "wiggle room" to stop the AI from bouncing back and forth trying to reach a specific spot
     */
    goal_radius?: number;
    /**
     * Event to run on completing a stay of stay_duration at the block.
     */
    on_stay_completed?: (EventTriggerFiltered)[] | EventTriggerFiltered;
    /**
     * Event to run on block reached.
     */
    on_reach?: (EventTriggerFiltered)[] | EventTriggerFiltered;
    /**
     * Chance to start the behavior (applied after each random tick_interval).
     */
    start_chance?: number;
    /**
     * The distance in blocks that the mob will look for the block.
     */
    search_range?: number;
    /**
     * The height in blocks that the mob will look for the block.
     */
    search_height?: number;
    /**
     * Number of ticks needed to complete a stay at the block.
     */
    stay_duration?: number;
    /**
     * Kind of block to find fitting the specification. Valid values are "random" and "nearest".
     */
    target_selection_method?: "random" | "nearest";
    /**
     * Offset to add to the selected target position.
     */
    target_offset?: [number, number, number];
    /**
     * Block types to move to.
     */
    target_blocks?: (ItemIdentifier | ItemIdentifier | {
      /**
       * UNDOCUMENTED.
       */
      item?: ItemIdentifier | ItemIdentifier;
    })[];
    /**
     * Filters to apply on the target blocks. Target blocks are only valid if the filters are true.
     */
    target_block_filters?: Filters;
    /**
     * Average interval in ticks to try to run this behavior.
     */
    tick_interval?: number;
  };
  /**
   * Allows the mob to move back onto land when in water.
   */
  "minecraft:behavior.move_to_land"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * Distance in blocks within the mob considers it has reached the goal. This is the `wiggle room` to stop the AI from bouncing back and forth trying to reach a specific spot
     */
    goal_radius?: number;
    /**
     * The number of blocks each tick that the mob will check within it's search range and height for a valid block to move to. A value of 0 will have the mob check every block within range in one tick
     */
    search_count?: number;
    /**
     * Height in blocks the mob will look for land to move towards.
     */
    search_height?: number;
    /**
     * The distance in blocks it will look for land to move towards.
     */
    search_range?: number;
  };
  /**
   * Allows the mob to move back into lava when on land.
   */
  "minecraft:behavior.move_to_lava"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * Distance in blocks within the mob considers it has reached the goal. This is the `wiggle room` to stop the AI from bouncing back and forth trying to reach a specific spot
     */
    goal_radius?: number;
    /**
     * The number of blocks each tick that the mob will check within it's search range and height for a valid block to move to. A value of 0 will have the mob check every block within range in one tick
     */
    search_count?: number;
    /**
     * Height in blocks the mob will look for lava to move towards.
     */
    search_height?: number;
    /**
     * The distance in blocks it will look for lava to move towards.
     */
    search_range?: number;
  };
  /**
   * Allows the mob to move into a liquid when on land.
   */
  "minecraft:behavior.move_to_liquid"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * Distance in blocks within the mob considers it has reached the goal. This is the `wiggle room` to stop the AI from bouncing back and forth trying to reach a specific spot
     */
    goal_radius?: number;
    /**
     * The number of blocks each tick that the mob will check within it's search range and height for a valid block to move to. A value of 0 will have the mob check every block within range in one tick
     */
    search_count?: number;
    /**
     * Height in blocks the mob will look for lava to move towards.
     */
    search_height?: number;
    /**
     * The distance in blocks it will look for lava to move towards.
     */
    search_range?: number;
    /**
     * The material type of the liquid block to find. Valid values are 'Any', 'Water', and 'Lava'.
     */
    material_type?: "Air" | "Any" | "Lava" | "Water";
  };
  /**
   * Allows the mob to move to a POI if able to.
   */
  "minecraft:behavior.move_to_poi"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * Tells the goal what POI type it should be looking for.
     */
    poi_type?: "bed" | "jobsite" | "meeting_area";
  };
  /**
   * Allows mob to move towards a random block.
   */
  "minecraft:behavior.move_to_random_block"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * Defines the distance from the mob, in blocks, that the block to move to will be chosen.
     */
    block_distance?: number;
    /**
     * Defines the distance in blocks the mob has to be from the block for the movement to be finished.
     */
    within_radius?: number;
  };
  /**
   * Allows the mob to move into a random location within a village.
   */
  "minecraft:behavior.move_to_village"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * Time in seconds the mob has to wait before using the goal again.
     */
    cooldown_time?: number;
    /**
     * Distance in blocks within the mob considers it has reached the goal. This is the `wiggle room` to stop the AI from bouncing back and forth trying to reach a specific spot
     */
    goal_radius?: number;
    /**
     * The distance in blocks to search for villages. If <= 0, find the closest village regardless of distance.
     */
    search_range?: number;
  };
  /**
   * Allows the mob to move back into water when on land.
   */
  "minecraft:behavior.move_to_water"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * The distance in blocks it will look for water to move towards.
     */
    search_range?: number;
    /**
     * Height in blocks the mob will look for water to move towards.
     */
    search_height?: number;
    /**
     * The number of blocks each tick that the mob will check within it's search range and height for a valid block to move to. A value of 0 will have the mob check every block within range in one tick
     */
    search_count?: number;
    /**
     * Distance in blocks within the mob considers it has reached the goal. This is the `wiggle room` to stop the AI from bouncing back and forth trying to reach a specific spot
     */
    goal_radius?: number;
  };
  /**
   * Allows mobs with the dweller component to move toward their Village area that the mob should be restricted to.
   */
  "minecraft:behavior.move_towards_dwelling_restriction"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
  };
  /**
   * Allows mobs with the home component to move toward their pre-defined area that the mob should be restricted to.
   */
  "minecraft:behavior.move_towards_home_restriction"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
  };
  /**
   * Allows Guardians, Iron Golems and Villagers to move within their pre-defined area that the mob should be restricted to. Other mobs don't have a restriction defined.
   */
  "minecraft:behavior.move_towards_restriction"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * UNDOCUMENTED: control flags.
     */
    control_flags?: ("move" | "look")[];
  };
  /**
   * Allows mob to move towards its current target.
   */
  "minecraft:behavior.move_towards_target"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * Defines the radius in blocks that the mob tries to be from the target. A value of 0 means it tries to occupy the same block as the target
     */
    within_radius?: number;
  };
  /**
   * Allows mobs to occassionally stop and take a nap under certain conditions.
   */
  "minecraft:behavior.nap"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * Maximum time in seconds the mob has to wait before using the goal again.
     */
    cooldown_max?: number;
    /**
     * Minimum time in seconds the mob has to wait before using the goal again.
     */
    cooldown_min?: number;
    /**
     * The block distance in x and z that will be checked for mobs that this mob detects.
     */
    mob_detect_dist?: number;
    /**
     * The block distance in y that will be checked for mobs that this mob detects.
     */
    mob_detect_height?: number;
    /**
     * The filters that need to be met for the nap to take place.
     */
    can_nap_filters?: Filters;
    /**
     * Filters that can trigger the entity to wake up from it nap.
     */
    wake_mob_exceptions?: Filters;
  };
  /**
   * Allows an entity to attack the closest target within a given subset of specific target types.
   */
  "minecraft:behavior.nearest_attackable_target"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Filters which types of targets are valid for this entity
     */
    entity_types?: EntityType[] | EntityType;
    /**
     * Time range (in seconds) between searching for an attack target, range is in (0, `attack_interval`]. Only used if `attack_interval` is greater than 0, otherwise `scan_interval` is used.
     */
    attack_interval?: number;
    /**
     * Alias for `attack_interval`; provides the same functionality as `attack_interval`.
     */
    attack_interval_min?: number;
    /**
     * If true, this entity can attack its owner.
     */
    attack_owner?: boolean;
    /**
     * If true, this entity requires a path to the target.
     */
    must_reach?: boolean;
    /**
     * Determines if target-validity requires this entity to be in range only, or both in range and in sight.
     */
    must_see?: boolean;
    /**
     * Time (in seconds) the target must not be seen by this entity to become invalid. Used only if `must_see` is true.
     */
    must_see_forget_duration?: number;
    /**
     * Time (in seconds) this entity can continue attacking the target after the target is no longer valid.
     */
    persist_time?: number;
    /**
     * Allows the attacking entity to update the nearest target, otherwise a target is only reselected after each `scan_interval` or `attack_interval`.
     */
    reselect_targets?: boolean;
    /**
     * If `attack_interval` is 0 or isn't declared, then between attacks: scanning for a new target occurs every amount of ticks equal to `scan_interval`, minimum value is 1. Values under 10 can affect performance.
     */
    scan_interval?: number;
    /**
     * Allows the actor to be set to persist upon targeting a player.
     */
    set_persistent?: boolean;
    /**
     * Multiplied with the target's armor coverage percentage to modify `max_dist` when detecting an invisible target.
     */
    target_invisible_multiplier?: number;
    /**
     * Maximum vertical target-search distance, if it's greater than the target type's `max_dist`. A negative value defaults to `entity_types` greatest `max_dist`.
     */
    target_search_height?: number;
    /**
     * Multiplied with the target type's `max_dist` when trying to detect a sneaking target.
     */
    target_sneak_visibility_multiplier?: number;
    /**
     * Maximum distance this entity can be from the target when following it, otherwise the target becomes invalid. This value is only used if the entity doesn't declare `minecraft:follow_range`.
     */
    within_radius?: number;
  };
  /**
   * Allows the mob to check for and pursue the nearest valid target.
   */
  "minecraft:behavior.nearest_prioritized_attackable_target"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * List of entity types that this mob considers valid targets
     */
    entity_types?: EntityType[] | EntityType;
    /**
     * Time in seconds before selecting a target.
     */
    attack_interval?: number;
    /**
     * If true, only entities that this mob can path to can be selected as targets.
     */
    must_reach?: boolean;
    /**
     * If true, only entities in this mob's viewing range can be selected as targets.
     */
    must_see?: boolean;
    /**
     * Determines the amount of time in seconds that this mob will look for a target before forgetting about it and looking for a new one when the target isn't visible any more.
     */
    must_see_forget_duration?: number;
    /**
     * Time in seconds for a valid target to stay targeted when it becomes and invalid target.
     */
    persist_time?: number;
    /**
     * If true, the target will change to the current closest entity whenever a different entity is closer.
     */
    reselect_targets?: boolean;
    /**
     * If true, the mob will stop being targeted if it stops meeting any conditions.
     */
    reevaluate_description?: boolean;
    /**
     * How many ticks to wait between scanning for a target.
     */
    scan_interval?: number;
    /**
     * Allows the actor to be set to persist upon targeting a player.
     */
    set_persistent?: boolean;
    /**
     * Height in blocks to search for a target mob. -1.0f means the height does not matter.
     */
    target_search_height?: number;
    /**
     * Distance in blocks that the target can be within to launch an attack.
     */
    within_radius?: number;
  };
  /**
   * Allows an entity to sit in place, similar to the ocelot entity animation pose.
   */
  "minecraft:behavior.ocelot_sit_on_block"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
  };
  /**
   * Can only be used by the Ocelot. Allows it to perform the sneak and pounce attack.
   */
  "minecraft:behavior.ocelotattack"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Time (in seconds) between attacks.
     */
    cooldown_time?: number;
    /**
     * Max distance from the target, this entity will use this attack behavior.
     */
    max_distance?: number;
    /**
     * Max distance from the target, this entity starts sneaking.
     */
    max_sneak_range?: number;
    /**
     * Max distance from the target, this entity starts sprinting (sprinting takes priority over sneaking).
     */
    max_sprint_range?: number;
    /**
     * Used with the base size of the entity to determine minimum target-distance before trying to deal attack damage.
     */
    reach_multiplier?: number;
    /**
     * Modifies the attacking entity's movement speed while sneaking.
     */
    sneak_speed_multiplier?: number;
    /**
     * Modifies the attacking entity's movement speed while sprinting.
     */
    sprint_speed_multiplier?: number;
    /**
     * Modifies the attacking entity's movement speed when not sneaking or sprinting, but still within attack range.
     */
    walk_speed_multiplier?: number;
    /**
     * Maximum rotation (in degrees), on the X-axis, this entity can rotate while trying to look at the target.
     */
    x_max_rotation?: number;
    /**
     * Maximum rotation (in degrees), on the Y-axis, this entity can rotate its head while trying to look at the target.
     */
    y_max_head_rotation?: number;
  };
  /**
   * Allows the mob to offer the player a flower like the Iron Golem does.
   */
  "minecraft:behavior.offer_flower"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Percent chance that the mob will start this goal from 0.0 to 1.0 (where 1.0 = 100%).
     */
    chance_to_start?: number;
    /**
     * Conditions that need to be met for the behavior to start.
     */
    filters?: Filters;
    /**
     * Maximum rotation (in degrees), on the Y-axis, this entity can rotate its head while trying to look at the target.
     */
    max_head_rotation_y?: number;
    /**
     * The max amount of time (in seconds) that the mob will offer the flower for before exiting the Goal.
     */
    max_offer_flower_duration?: number;
    /**
     * Maximum rotation (in degrees), on the X-axis, this entity can rotate while trying to look at the target.
     */
    max_rotation_x?: number;
    /**
     * An vector of 3 number.
     */
    search_area?: [number, number, number];
  };
  /**
   * Allows the mob to open doors. Requires the mob to be able to path through doors, otherwise the mob won't even want to try opening them.
   */
  "minecraft:behavior.open_door"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * If true, the mob will close the door after opening it and going through it.
     */
    close_door_after?: boolean;
  };
  /**
   * Allows the mob to target another mob that hurts their owner.
   */
  "minecraft:behavior.owner_hurt_by_target"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * List of entity types that this mob can target if they hurt their owner.
     */
    entity_types?: EntityType[] | EntityType;
  };
  /**
   * Allows the mob to target a mob that is hurt by their owner.
   */
  "minecraft:behavior.owner_hurt_target"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * List of entity types that this entity can target if the potential target is hurt by this mob's owner.
     */
    entity_types?: EntityType[] | EntityType;
  };
  /**
   * Allows the mob to enter the panic state, which makes it run around and away from the damage source that made it enter this state.
   */
  "minecraft:behavior.panic"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * The list of Entity Damage Sources that will cause this mob to panic.
     */
    damage_sources?: (DamageSource)[];
    /**
     * If true, this mob will not stop panicking until it can't move anymore or the goal is removed from it.
     */
    force?: boolean;
    /**
     * If true, the mob will not panic in response to damage from other mobs. This overrides the damage types in `damage_sources`
     */
    ignore_mob_damage?: boolean;
    /**
     * If true, the mob will prefer water over land.
     */
    prefer_water?: boolean;
    /**
     * The sound event to play when this mob is in panic.
     */
    panic_sound?: SoundEvent;
    /**
     * The range of time in seconds to randomly wait before playing the sound again.
     */
    sound_interval?: {
      /**
       * The minimum time in seconds before the `panic_sound` plays.
       */
      range_min?: number;
      /**
       * The maximum time in seconds before the `panic_sound` plays.
       */
      range_max?: number;
    };
  };
  /**
   * Allows the mob to peek out. This is what the shulker uses to look out of its shell.
   */
  "minecraft:behavior.peek"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
  };
  /**
   * Allows the mob to be tempted by food they like.
   */
  "minecraft:behavior.pet_sleep_with_owner"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * Distance in blocks within the mob considers it has reached the goal. This is the "wiggle room" to stop the AI from bouncing back and forth trying to reach a specific spot
     */
    goal_radius?: number;
    /**
     * Height in blocks from the owner the pet can be to sleep with owner.
     */
    search_height?: number;
    /**
     * The radius that the mob will search for an owner to curl up with.
     */
    search_radius?: number;
    /**
     * The range that the mob will search for an owner to curl up with.
     */
    search_range?: number;
  };
  /**
   * Allows the mob to pick up items on the ground.
   */
  "minecraft:behavior.pickup_items"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * If true, the mob can pickup any item.
     */
    can_pickup_any_item?: boolean;
    /**
     * If true, the mob can pickup items to its hand or armor slots.
     */
    can_pickup_to_hand_or_equipment?: boolean;
    /**
     * Amount of time an offended entity needs before being willing to pick up items.
     */
    cooldown_after_being_attacked?: number;
    /**
     * List of items this mob will not pick up.
     */
    excluded_items?: (ItemIdentifier | ItemIdentifier | {
      /**
       * UNDOCUMENTED.
       */
      item?: ItemIdentifier | ItemIdentifier;
    })[];
    /**
     * Distance in blocks within the mob considers it has reached the goal. This is the `wiggle room` to stop the AI from bouncing back and forth trying to reach a specific spot.
     */
    goal_radius?: number;
    /**
     * Maximum distance this mob will look for items to pick up.
     */
    max_dist?: number;
    /**
     * Height in blocks the mob will look for items to pick up.
     */
    search_height?: number;
    /**
     * If true, depending on the difficulty, there is a random chance that the mob may not be able to pickup items.
     */
    pickup_based_on_chance?: boolean;
    /**
     * If true, the mob will pickup the same item as the item in its hand.
     */
    pickup_same_items_as_in_hand?: boolean;
    /**
     * If true, this mob will chase after the target as long as it's a valid target.
     */
    track_target?: boolean;
  };
  /**
   * Allows the mob to play dead when attacked by other entities. When playing dead, other entities will not target this mob.
   */
  "minecraft:behavior.play_dead"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Whether the mob will receive the regeneration effect while playing dead.
     */
    apply_regeneration?: boolean;
    /**
     * The amount of time the mob will remain playing dead (in seconds).
     */
    duration?: number;
    /**
     * The list of other triggers that are required for the mob to activate play dead.
     */
    filters?: Filters;
    /**
     * The amount of health at which damage will cause the mob to play dead.
     */
    force_below_health?: number;
    /**
     * The likelihood of this goal starting upon taking damage.
     */
    random_start_chance?: number;
    /**
     * The range of damage that may cause the goal to start depending on randomness. Damage taken below the min will never cause the goal to start. Damage taken above the max will always cause the goal to start.
     */
    random_damage_range?: [number, number];
    /**
     * The list of Entity Damage Sources that will cause this mob to play dead.
     */
    damage_sources?: DamageSource | (DamageSource)[];
  };
  /**
   * Allows the mob to play with other baby villagers. This can only be used by Villagers.
   */
  "minecraft:behavior.play"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * Percent chance that the mob will start this goal, from 0 to 1.
     */
    chance_to_start?: number;
    /**
     * The distance (in blocks) that the mob tries to be in range of the friend it's following.
     */
    follow_distance?: number;
    /**
     * An vector of 3 number.
     */
    friend_search_area?: [number, number, number];
    /**
     * The entity type(s) to consider when searching for a potential friend to play with.
     */
    friend_types?: (never)[];
    /**
     * The max amount of seconds that the mob will play for before exiting the Goal.
     */
    max_play_duration_seconds?: number;
    /**
     * The height (in blocks) that the mob will search within to find a random position position to move to. Must be at least 1.
     */
    random_pos_search_height?: number;
    /**
     * The distance (in blocks) on ground that the mob will search within to find a random position to move to. Must be at least 1.
     */
    random_pos_search_range?: number;
  };
  /**
   * Allows the mob to be ridden by the player after being tamed.
   */
  "minecraft:behavior.player_ride_tamed"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
  };
  /**
   * Allows the mob to eat/raid crops out of farms until they are full.
   */
  "minecraft:behavior.raid_garden"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * Blocks that the mob is looking for to eat.
     */
    blocks?: (BlockReference)[];
    /**
     * Time in seconds between each time it eats.
     */
    eat_delay?: number;
    /**
     * Amount of time in seconds before this mob wants to eat again.
     */
    full_delay?: number;
    /**
     * Time in seconds before starting to eat/raid once it arrives at it.
     */
    initial_eat_delay?: number;
    /**
     * Distance in blocks within the mob considers it has reached the goal. This is the `wiggle room` to stop the AI from bouncing back and forth trying to reach a specific spot
     */
    goal_radius?: number;
    /**
     * Maximum number of things this entity wants to eat.
     */
    max_to_eat?: number;
    /**
     * Distance in blocks the mob will look for crops to eat.
     */
    search_range?: number;
    /**
     * Height in blocks the mob will look for crops to eat.
     */
    search_height?: number;
  };
  /**
   * Allows the mob to search for a random target and, if a direct path exists between the mob and the target, it will perform a charge. If the attack hits, the target will be knocked back based on the mob's speed.
   */
  "minecraft:behavior.ram_attack"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * The modifier to knockback that babies have.
     */
    baby_knockback_modifier?: number;
    /**
     * A described range.
     */
    cooldown_range?: number | [number, number] | {
      /**
       * The minimum value of the range.
       */
      range_min?: number;
      /**
       * The maximum value of the range.
       */
      range_max?: number;
    };
    /**
     * The force of the knockback of the ram attack.
     */
    knockback_force?: number;
    /**
     * The height of the knockback of the ram attack.
     */
    knockback_height?: number;
    /**
     * The minimum distance at which the mob can start a ram attack.
     */
    min_ram_distance?: number;
    /**
     * The event to trigger when attacking.
     */
    on_start?: EventTriggerFiltered;
    /**
     * The sound to play when an entity is about to perform a ram attack.
     */
    pre_ram_sound?: SoundEvent;
    /**
     * The distance at which the mob start to run with ram speed.
     */
    ram_distance?: number;
    /**
     * The sound to play when an entity is impacting on a ram attack.
     */
    ram_impact_sound?: SoundEvent;
    /**
     * Sets the entity's speed when charging toward the target.
     */
    ram_speed?: number;
    /**
     * Sets the entity's speed when running toward the target.
     */
    run_speed?: number;
    /**
     * The event to trigger when attacking.
     */
    trigger?: EventTriggerFiltered;
  };
  /**
   * Allows the mob to randomly break surface of the water.
   */
  "minecraft:behavior.random_breach"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * Time in seconds the mob has to wait before using the goal again.
     */
    cooldown_time?: number;
    /**
     * A random value to determine when to randomly move somewhere. This has a 1/interval chance to choose this goal
     */
    interval?: number;
    /**
     * Distance in blocks on ground that the mob will look for a new spot to move to. Must be at least 1
     */
    xz_dist?: number;
    /**
     * Distance in blocks that the mob will look up or down for a new spot to move to. Must be at least 1
     */
    y_dist?: number;
  };
  /**
   * Allows a mob to randomly fly around.
   */
  "minecraft:behavior.random_fly"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * If true, the mob will avoid blocks that cause damage.
     */
    avoid_damage_blocks?: boolean;
    /**
     * If true, the mob can stop flying and land on a tree instead of the ground.
     */
    can_land_on_trees?: boolean;
    /**
     * Distance in blocks on ground that the mob will look for a new spot to move to. Must be at least 1
     */
    xz_dist?: number;
    /**
     * Distance in blocks that the mob will look up or down for a new spot to move to. Must be at least 1
     */
    y_dist?: number;
    /**
     * Height in blocks to add to the selected target position.
     */
    y_offset?: number;
  };
  /**
   * Allows the mob to hover around randomly, close to the surface.
   */
  "minecraft:behavior.random_hover"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * The height above the surface which the mob will try to maintain.
     */
    hover_height?: [number, number];
    /**
     * A random value to determine when to randomly move somewhere. This has a 1/interval chance to choose this goal
     */
    interval?: number;
    /**
     * Distance in blocks on ground that the mob will look for a new spot to move to. Must be at least 1
     */
    xz_dist?: number;
    /**
     * Distance in blocks that the mob will look up or down for a new spot to move to. Must be at least 1
     */
    y_dist?: number;
    /**
     * Height in blocks to add to the selected target position.
     */
    y_offset?: number;
  };
  /**
   * Allows the mob to randomly sit and look around for a duration. Note: Must have a sitting animation set up to use this.
   */
  "minecraft:behavior.random_look_around_and_sit"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * If the goal should continue to be used as long as the mob is leashed.
     */
    continue_if_leashed?: boolean;
    /**
     * The rightmost angle a mob can look at on the horizontal plane with respect to its initial facing direction.
     */
    max_angle_of_view_horizontal?: number;
    /**
     * The max amount of unique looks a mob will have while looking around.
     */
    max_look_count?: number;
    /**
     * The max amount of time (in ticks) a mob will stay looking at a direction while looking around.
     */
    max_look_time?: number;
    /**
     * The leftmost angle a mob can look at on the horizontal plane with respect to its initial facing direction.
     */
    min_angle_of_view_horizontal?: number;
    /**
     * The min amount of unique looks a mob will have while looking around.
     */
    min_look_count?: number;
    /**
     * The min amount of time (in ticks) a mob will stay looking at a direction while looking around.
     */
    min_look_time?: number;
    /**
     * The probability of randomly looking around/sitting.
     */
    probability?: number;
    /**
     * The cooldown in seconds before the goal can be used again.
     */
    random_look_around_cooldown?: number;
  };
  /**
   * Allows the mob to randomly look around.
   */
  "minecraft:behavior.random_look_around"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * An vector of 2 number.
     */
    look_time?: [number, number];
    /**
     * The rightmost angle a mob can look at on the horizontal plane with respect to its initial facing direction.
     */
    max_angle_of_view_horizontal?: number;
    /**
     * The leftmost angle a mob can look at on the horizontal plane with respect to its initial facing direction.
     */
    min_angle_of_view_horizontal?: number;
  };
  /**
   * Allows the mob to randomly sit for a duration.
   */
  "minecraft:behavior.random_sitting"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * Time in seconds the mob has to wait before using the goal again.
     */
    cooldown?: number;
    /**
     * Time in seconds the mob has to wait before using the goal again.
     */
    cooldown_time?: number;
    /**
     * The minimum amount of time in seconds before the mob can stand back up.
     */
    min_sit_time?: number;
    /**
     * This is the chance that the mob will start this goal, from 0 to 1.
     */
    start_chance?: number;
    /**
     * This is the chance that the mob will stop this goal, from 0 to 1.
     */
    stop_chance?: number;
  };
  /**
   * Allows a mob to randomly stroll around.
   */
  "minecraft:behavior.random_stroll"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * A random value to determine when to randomly move somewhere. This has a 1/interval chance to choose this goal
     */
    interval?: number;
    /**
     * Distance in blocks on ground that the mob will look for a new spot to move to. Must be at least 1
     */
    xz_dist?: number;
    /**
     * Distance in blocks that the mob will look up or down for a new spot to move to. Must be at least 1
     */
    y_dist?: number;
  };
  /**
   * Allows an entity to randomly move through water.
   */
  "minecraft:behavior.random_swim"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * If true, the mob will avoid surface water blocks by swimming below them.
     */
    avoid_surface?: boolean;
    /**
     * A random value to determine when to randomly move somewhere. This has a 1/interval chance to choose this goal
     */
    interval?: number;
    /**
     * Distance in blocks on ground that the mob will look for a new spot to move to. Must be at least 1
     */
    xz_dist?: number;
    /**
     * Distance in blocks that the mob will look up or down for a new spot to move to. Must be at least 1
     */
    y_dist?: number;
  };
  /**
   * Allows the mob to use ranged attacks like shooting arrows.
   */
  "minecraft:behavior.ranged_attack"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * Alternative to "attack_interval_min" & "attack_interval_max". Consistent reload-time (in seconds), when not using a charged shot. Does not scale with target-distance.
     */
    attack_interval?: number;
    /**
     * Maximum bound for reload-time range (in seconds), when not using a charged shot. Reload-time range scales with target-distance.
     */
    attack_interval_max?: number;
    /**
     * Minimum bound for reload-time range (in seconds), when not using a charged shot. Reload-time range scales with target-distance.
     */
    attack_interval_min?: number;
    /**
     * Minimum distance to target before this entity will attempt to shoot.
     */
    attack_radius?: number;
    /**
     * Minimum distance the target can be for this mob to fire. If the target is closer, this mob will move first before firing
     */
    attack_radius_min?: number;
    /**
     * Time (in seconds) between each individual shot when firing a burst of shots from a charged up attack.
     */
    burst_interval?: number;
    /**
     * Number of shots fired every time the attacking entity uses a charged up attack.
     */
    burst_shots?: number;
    /**
     * Time (in seconds, then add "charge_shoot_trigger"), before a charged up attack is done charging. Charge-time decays while target is not in sight.
     */
    charge_charged_trigger?: number;
    /**
     * Amount of time (in seconds, then doubled) a charged shot must be charging before reloading burst shots. Charge-time decays while target is not in sight.
     */
    charge_shoot_trigger?: number;
    /**
     * Field of view (in degrees) when using sensing to detect a target for attack.
     */
    ranged_fov?: number;
    /**
     * Allows the actor to be set to persist upon targeting a player.
     */
    set_persistent?: boolean;
    /**
     * If a swing animation (using variable.attack_time) exists, this causes the actor to swing their arm(s) upon firing the ranged attack.
     */
    swing?: boolean;
    /**
     * Minimum amount of time (in seconds) the attacking entity needs to see the target before moving toward it.
     */
    target_in_sight_time?: number;
    /**
     * Maximum rotation (in degrees), on the X-axis, this entity can rotate while trying to look at the target.
     */
    x_max_rotation?: number;
    /**
     * Maximum rotation (in degrees), on the Y-axis, this entity can rotate its head while trying to look at the target.
     */
    y_max_head_rotation?: number;
  };
  /**
   * Allows the villager to stop so another villager can breed with it. Can only be used by a Villager.
   */
  "minecraft:behavior.receive_love"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
  };
  /**
   * Allows the mob to stay indoors during night time.
   */
  "minecraft:behavior.restrict_open_door"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
  };
  /**
   * Allows the mob to automatically start avoiding the sun when its a clear day out.
   */
  "minecraft:behavior.restrict_sun"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
  };
  /**
   * Allows the mob to stay at a certain level when in liquid.
   */
  "minecraft:behavior.rise_to_liquid_level"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Vertical offset from the liquid.
     */
    liquid_y_offset?: number;
    /**
     * Displacement for how much the entity will move up in the vertical axis.
     */
    rise_delta?: number;
    /**
     * Displacement for how much the entity will move down in the vertical axis.
     */
    sink_delta?: number;
  };
  /**
   * [EXPERIMENTAL BEHAVIOR] Plays the provided sound and activates the `ROARING` actor flag during the specified duration
   */
  "minecraft:behavior.roar"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Goal duration in seconds.
     */
    duration?: number;
  };
  /**
   * This allows the mob to roll forward.
   */
  "minecraft:behavior.roll"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * The probability that the mob will use the goal.
     */
    probability?: number;
  };
  /**
   * Allows the mob to run around aimlessly.
   */
  "minecraft:behavior.run_around_like_crazy"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
  };
  /**
   * Allows the a mob to become scared when the weather outside is thundering.
   */
  "minecraft:behavior.scared"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * The interval in which a sound will play when active in a 1/delay chance to kick off.
     */
    sound_interval?: number;
  };
  /**
   * Allows the mob to send an event to another mob.
   */
  "minecraft:behavior.send_event"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Time in seconds for the entire event sending process.
     */
    cast_duration?: number;
    /**
     * If true, the mob will face the entity it sends an event to.
     */
    look_at_target?: boolean;
    /**
     * List of spells for the mob to use.
     */
    event_choices?: ({
      /**
       * The minimum distance in blocks the target must be for this spell to be cast.
       */
      min_activation_range?: number;
      /**
       * The maxmimum distance in blocks the target must be for this spell to be cast.
       */
      max_activation_range?: number;
      /**
       * Time in seconds before the mob can use this spell again.
       */
      cooldown_time?: number;
      /**
       * Time in seconds the spell casting will take.
       */
      cast_duration?: number;
      /**
       * UNDOCUMENTED.
       */
      filters?: Filters;
      /**
       * The color of the particles for this spell.
       */
      particle_color?: string;
      /**
       * The weight of this spell. Controls how likely this spell will be picked
       */
      weight?: number;
      /**
       * The sound event to play when using this spell.
       */
      start_sound_event?: SoundEvent;
      /**
       * List of events to send.
       */
      sequence?: ({
        /**
         * Amount of time in seconds before starting this step.
         */
        base_delay?: number;
        /**
         * The event to send to the entity.
         */
        event?: string;
        /**
         * The sound event to play when this step happens.
         */
        sound_event?: SoundEvent;
      })[];
    })[];
    /**
     * List of events to send.
     */
    sequence?: ({
      /**
       * Amount of time in seconds before starting this step.
       */
      base_delay?: number;
      /**
       * The event to send to the entity.
       */
      event?: string;
      /**
       * The sound event to play when this step happens.
       */
      sound_event?: SoundEvent;
    })[];
  };
  /**
   * Allows the mob to give items it has to others.
   */
  "minecraft:behavior.share_items"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * List of entities this mob will share items with.
     */
    entity_types?: EntityType[] | EntityType;
    /**
     * Distance in blocks within the mob considers it has reached the goal. This is the `wiggle room` to stop the AI from bouncing back and forth trying to reach a specific spot
     */
    goal_radius?: number;
    /**
     * Maximum distance in blocks this mob will look for entities to share items with.
     */
    max_dist?: number;
  };
  /**
   * Allows the mob to go into stone blocks like Silverfish do. Currently it can only be used by Silverfish.
   */
  "minecraft:behavior.silverfish_merge_with_stone"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
  };
  /**
   * Allows the mob to alert mobs in nearby blocks to come out. Currently it can only be used by Silverfish.
   */
  "minecraft:behavior.silverfish_wake_up_friends"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
  };
  /**
   * Allows Equine mobs to be Horse Traps and be triggered like them, spawning a lightning bolt and a bunch of horses when a player is nearby. Can only be used by Horses, Mules, Donkeys and Skeleton Horses.
   */
  "minecraft:behavior.skeleton_horse_trap"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Amount of time in seconds the trap exists. After this amount of time is elapsed, the trap is removed from the world if it hasn't been activated
     */
    duration?: number;
    /**
     * Distance in blocks that the player has to be within to trigger the horse trap.
     */
    within_radius?: number;
  };
  /**
   * Allows mobs that own a bed to in a village to move to and sleep in it.
   */
  "minecraft:behavior.sleep"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * If true, the mob will be able to use the sleep goal if riding something.
     */
    can_sleep_while_riding?: boolean;
    /**
     * Time in seconds the mob has to wait before using the goal again.
     */
    cooldown_time?: number;
    /**
     * The height of the mob's collider while sleeping.
     */
    sleep_collider_height?: number;
    /**
     * The width of the mob's collider while sleeping.
     */
    sleep_collider_width?: number;
    /**
     * The y offset of the mob's collider while sleeping.
     */
    sleep_y_offset?: number;
    /**
     * The cooldown time in seconds before the goal can be reused after a internal failure or timeout condition.
     */
    timeout_cooldown?: number;
  };
  /**
   * Can only be used by Slimes and Magma Cubes. Allows the mob to use a melee attack like the slime's.
   */
  "minecraft:behavior.slime_attack"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * Allows the actor to be set to persist upon targeting a player.
     */
    set_persistent?: boolean;
    /**
     * Maximum rotation (in degrees), on the X-axis, this entity can rotate while trying to look at the target.
     */
    x_max_rotation?: number;
    /**
     * Maximum rotation (in degrees), on the Y-axis, this entity can rotate while trying to look at the target.
     */
    y_max_rotation?: number;
  };
  /**
   * Allow slimes to float in water / lava. Can only be used by Slime and Magma Cubes.
   */
  "minecraft:behavior.slime_float"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * Percent chance a slime or magma cube has to jump while in water / lava.
     */
    jump_chance_percentage?: number;
  };
  /**
   * Can only be used by Slimes and Magma Cubes. Allows the mob to continuously jump around like a slime.
   */
  "minecraft:behavior.slime_keep_on_jumping"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
  };
  /**
   * Can only be used by Slimes and Magma Cubes. Allows the mob to move in random directions like a slime.
   */
  "minecraft:behavior.slime_random_direction"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Additional time (in whole seconds), chosen randomly in the range of [0, "add_random_time_range"], to add to "min_change_direction_time".
     */
    add_random_time_range?: number;
    /**
     * Constant minimum time (in seconds) to wait before choosing a new direction.
     */
    min_change_direction_time?: number;
    /**
     * Maximum rotation angle range (in degrees) when randomly choosing a new direction.
     */
    turn_range?: number;
  };
  /**
   * Allows the mob to take a load off and snack on food that it found nearby.
   */
  "minecraft:behavior.snacking"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Items that we are interested in snacking on.
     */
    items?:
      | (ItemIdentifier | ItemIdentifier | {
        /**
         * UNDOCUMENTED.
         */
        item?: ItemIdentifier | ItemIdentifier;
      })[]
      | ItemIdentifier
      | ItemIdentifier
      | {
        /**
         * UNDOCUMENTED.
         */
        item?: ItemIdentifier | ItemIdentifier;
      };
    /**
     * The cooldown time in seconds before the mob is able to snack again.
     */
    snacking_cooldown?: number;
    /**
     * The minimum time in seconds before the mob is able to snack again.
     */
    snacking_cooldown_min?: number;
    /**
     * This is the chance that the mob will stop snacking, from 0 to 1.
     */
    snacking_stop_chance?: number;
  };
  /**
   * Allows the mob to stop and sneeze possibly startling nearby mobs and dropping an item.
   */
  "minecraft:behavior.sneeze"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Time in seconds the mob has to wait before using the goal again.
     */
    cooldown_time?: number;
    /**
     * The probability that the mob will drop an item when it sneezes.
     */
    drop_item_chance?: number;
    /**
     * List of entity types this mob will startle (cause to jump) when it sneezes.
     */
    entity_types?: EntityType[] | EntityType;
    /**
     * Loot table to select dropped items from.
     */
    loot_table?: string;
    /**
     * Sound to play when the sneeze is about to happen.
     */
    prepare_sound?: SoundEvent;
    /**
     * The time in seconds that the mob takes to prepare to sneeze (while the prepare_sound is playing).
     */
    prepare_time?: number;
    /**
     * The probability of sneezing. A value of 1.00 is 100%
     */
    probability?: number;
    /**
     * Sound to play when the sneeze occurs.
     */
    sound?: SoundEvent;
    /**
     * Distance in blocks that mobs will be startled.
     */
    within_radius?: number;
  };
  /**
   * [EXPERIMENTAL BEHAVIOR] Plays the provided sounds and activates the `SONIC BOOM` actor flag during the specified duration
   */
  "minecraft:behavior.sonic_boom"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * Cooldown in seconds required after using this attack until the entity can use sonic boom again.
     */
    attack_cooldown?: number;
    /**
     * Attack damage of the sonic boom.
     */
    attack_damage?: number;
    /**
     * Horizontal range (in blocks) at which the sonic boom can damage the target.
     */
    attack_range_horizontal?: number;
    /**
     * Vertical range (in blocks) at which the sonic boom can damage the target.
     */
    attack_range_vertical?: number;
    /**
     * Sound event for the attack.
     */
    attack_sound?: SoundEvent;
    /**
     * Sound event for the charge up.
     */
    charge_sound?: SoundEvent;
    /**
     * Goal duration in seconds.
     */
    duration?: number;
    /**
     * Duration in seconds until the attack sound is played.
     */
    duration_until_attack_sound?: number;
    /**
     * Height cap of the attack knockback's vertical delta.
     */
    knockback_height_cap?: number;
    /**
     * Horizontal strength of the attack's knockback applied to the attack target.
     */
    knockback_horizontal_strength?: number;
    /**
     * Vertical strength of the attack's knockback applied to the attack target.
     */
    knockback_vertical_strength?: number;
  };
  /**
   * Allows an entity to dive underwater.
   */
  "minecraft:behavior.squid_dive"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
  };
  /**
   * Allows the squid to swim away. Can only be used by the Squid.
   */
  "minecraft:behavior.squid_flee"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
  };
  /**
   * Allows the squid to swim in place idly. Can only be used by the Squid.
   */
  "minecraft:behavior.squid_idle"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
  };
  /**
   * Allows the squid to move away from ground blocks and back to water. Can only be used by the Squid.
   */
  "minecraft:behavior.squid_move_away_from_ground"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
  };
  /**
   * Allows the squid to stick to the ground when outside water. Can only be used by the Squid.
   */
  "minecraft:behavior.squid_out_of_water"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
  };
  /**
   * Allows an entity to stalk a specific target. Once within range of the target, the entity will then leap at the target and deal damage based upon its attack attribute.
   */
  "minecraft:behavior.stalk_and_pounce_on_target"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * The amount of time the mob will be interested before pouncing. This happens when the mob is within range of pouncing
     */
    interest_time?: number;
    /**
     * The distance in blocks the mob jumps in the direction of its target.
     */
    leap_distance?: number;
    /**
     * The height in blocks the mob jumps when leaping at its target.
     */
    leap_height?: number;
    /**
     * The maximum distance away a target can be before the mob gives up on stalking.
     */
    max_stalk_dist?: number;
    /**
     * The maximum distance away from the target in blocks to begin pouncing at the target.
     */
    pounce_max_dist?: number;
    /**
     * Allows the actor to be set to persist upon targeting a player.
     */
    set_persistent?: boolean;
    /**
     * The movement speed in which you stalk your target.
     */
    stalk_speed?: number;
    /**
     * The Maximum distance away from the target when landing from the pounce that will still result in damaging the target.
     */
    strike_dist?: number;
    /**
     * The amount of time the mob will be stuck if they fail and land on a block they can be stuck on.
     */
    stuck_time?: number;
    /**
     * The distance in blocks the mob jumps in the direction of their target.
     */
    leap_dist?: number;
    /**
     * Filters to apply on the block the mob lands on to determine if it is valid for getting stuck.
     */
    stuck_blocks?: Filters;
  };
  /**
   * [EXPERIMENTAL BEHAVIOR] The entity will attempt to toss the items from its inventory to a nearby recently played noteblock.
   */
  "minecraft:behavior.stay_near_noteblock"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Sets the time an entity should stay near a noteblock after hearing it.
     */
    listen_time?: number;
    /**
     * Sets the entity's speed when moving toward the block.
     */
    speed?: number;
    /**
     * Sets the distance the entity needs to be away from the block to attempt to start the goal.
     */
    start_distance?: number;
    /**
     * Sets the distance from the block the entity will attempt to reach.
     */
    stop_distance?: number;
  };
  /**
   * Allows the mob to stay put while it is in a sitting state instead of doing something else.
   */
  "minecraft:behavior.stay_while_sitting"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
  };
  /**
   * Allows the mob to use the polar bear's melee attack.
   */
  "minecraft:behavior.stomp_attack"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * Allows the entity to use this attack behavior, only once EVER.
     */
    attack_once?: boolean;
    /**
     * Defines the entity types this entity will attack.
     */
    attack_types?: string;
    /**
     * Cooldown time (in seconds) between attacks.
     */
    cooldown_time?: number;
    /**
     * Time (in seconds) to add to attack path recalculation when the target is beyond the "path_inner_boundary".
     */
    inner_boundary_time_increase?: number;
    /**
     * Unused. No effect on "minecraft:behavior.melee_attack".
     */
    max_dist?: number;
    /**
     * Maximum base time (in seconds) to recalculate new attack path to target (before increases applied).
     */
    max_path_time?: number;
    /**
     * Field of view (in degrees) when using the sensing component to detect an attack target.
     */
    melee_fov?: number;
    /**
     * Minimum base time (in seconds) to recalculate new attack path to target (before increases applied).
     */
    min_path_time?: number;
    /**
     * Multiplied with the final AoE damage range to determine a no damage range. The stomp attack will go on cooldown if target is in this no damage range.
     */
    no_damage_range_multiplier?: number;
    /**
     * Defines the event to trigger when this entity successfully attacks.
     */
    on_attack?: EventTriggerFiltered;
    /**
     * Time (in seconds) to add to attack path recalculation when the target is beyond the "path_outer_boundary".
     */
    outer_boundary_time_increase?: number;
    /**
     * Time (in seconds) to add to attack path recalculation when this entity cannot move along the current path.
     */
    path_fail_time_increase?: number;
    /**
     * Distance at which to increase attack path recalculation by "inner_boundary_tick_increase".
     */
    path_inner_boundary?: number;
    /**
     * Distance at which to increase attack path recalculation by "outer_boundary_tick_increase".
     */
    path_outer_boundary?: number;
    /**
     * This entity will have a 1 in N chance to stop it's current attack, where N = "random_stop_interval".
     */
    random_stop_interval?: number;
    /**
     * Used with the base size of the entity to determine minimum target-distance before trying to deal attack damage.
     */
    reach_multiplier?: number;
    /**
     * Toggles (on/off) the need to have a full path from the entity to the target when using this melee attack behavior.
     */
    require_complete_path?: boolean;
    /**
     * Allows the actor to be set to persist upon targeting a player.
     */
    set_persistent?: boolean;
    /**
     * Multiplied with the base size of the entity to determine stomp AoE damage range.
     */
    stomp_range_multiplier?: number;
    /**
     * Unused. No effect on "minecraft:behavior.melee_attack".
     */
    target_dist?: number;
    /**
     * Allows the entity to track the attack target, even if the entity has no sensing.
     */
    track_target?: boolean;
    /**
     * Maximum rotation (in degrees), on the X-axis, this entity can rotate while trying to look at the target.
     */
    x_max_rotation?: number;
    /**
     * Maximum rotation (in degrees), on the Y-axis, this entity can rotate its head while trying to look at the target.
     */
    y_max_head_rotation?: number;
  };
  /**
   * Allows this mob to stomp turtle eggs.
   */
  "minecraft:behavior.stomp_turtle_egg"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * Distance in blocks within the mob considers it has reached the goal. This is the `wiggle room` to stop the AI from bouncing back and forth trying to reach a specific spot
     */
    goal_radius?: number;
    /**
     * A random value to determine when to randomly move somewhere. This has a 1/interval chance to choose this goal
     */
    interval?: number;
    /**
     * The number of blocks each tick that the mob will check within it's search range and height for a valid block to move to. A value of 0 will have the mob check every block within range in one tick
     */
    search_count?: number;
    /**
     * Height in blocks the mob will look for turtle eggs to move towards.
     */
    search_height?: number;
    /**
     * The distance in blocks it will look for turtle eggs to move towards.
     */
    search_range?: number;
  };
  /**
   * Allows the mob to move into a random location within a village within the search range.
   */
  "minecraft:behavior.stroll_towards_village"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Time in seconds the mob has to wait before using the goal again.
     */
    cooldown_time?: number;
    /**
     * Distance in blocks within the mob considers it has reached the goal. This is the `wiggle room` to stop the AI from bouncing back and forth trying to reach a specific spot
     */
    goal_radius?: number;
    /**
     * The distance in blocks to search for points inside villages. If <= 0, find the closest village regardless of distance.
     */
    search_range?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * This is the chance that the mob will start this goal, from 0 to 1.
     */
    start_chance?: number;
  };
  /**
   * Allows the mob to attack the player by summoning other entities.
   */
  "minecraft:behavior.summon_entity"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * List of spells for the mob to use to summon entities.
     */
    summon_choices?: ({
      /**
       * Time in seconds the spell casting will take.
       */
      cast_duration?: number;
      /**
       * Time in seconds the mob has to wait before using the spell again.
       */
      cooldown_time?: number;
      /**
       * If true, the mob will do the casting animations and render spell particles.
       */
      do_casting?: boolean;
      /**
       * UNDOCUMENTED.
       */
      filters?: Filters;
      /**
       * Upper bound of the activation distance in blocks for this spell.
       */
      max_activation_range?: number;
      /**
       * Lower bound of the activation distance in blocks for this spell.
       */
      min_activation_range?: number;
      /**
       * The color of the particles for this spell.
       */
      particle_color?: number | string;
      /**
       * List of steps for the spell.
       */
      sequence?: ({
        /**
         * Amount of time in seconds to wait before this step starts.
         */
        delay?: number;
        /**
         * Amount of time in seconds before each entity is summoned in this step.
         */
        delay_per_summon?: number;
        /**
         * Amount of time in seconds that the spawned entity will be alive for. A value of -1.0 means it will remain alive for as long as it can
         */
        entity_lifespan?: number;
        /**
         * Amount of time in seconds to wait before this step starts.
         */
        base_delay?: number;
        /**
         * The entity type of the entities we will spawn in this step.
         */
        entity_type?: string;
        /**
         * Number of entities that will be spawned in this step.
         */
        num_entities_spawned?: number;
        /**
         * The base shape of this step. Valid values are circle and line
         */
        shape?: "line" | "circle";
        /**
         * The base size of the entity.
         */
        size?: number;
        /**
         * The sound event to play for this step.
         */
        sound_event?: SoundEvent;
        /**
         * Maximum number of summoned entities at any given time.
         */
        summon_cap?: number;
        /**
         * Maximum radius where the summon entities can spawn.
         */
        summon_cap_radius?: number;
        /**
         * The target of the spell. This is where the spell will start (line will start here, circle will be centered here)
         */
        target?: string;
      })[];
      /**
       * The sound event to play when using this spell.
       */
      start_sound_event?: SoundEvent;
      /**
       * The weight of this spell. Controls how likely the mob is to choose this spell when casting one
       */
      weight?: number;
    })[];
  };
  /**
   * Allows the creeper to swell up when a player is nearby. It can only be used by Creepers.
   */
  "minecraft:behavior.swell"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * This mob starts swelling when a target is at least this many blocks away.
     */
    start_distance?: number;
    /**
     * This mob stops swelling when a target has moved away at least this many blocks.
     */
    stop_distance?: number;
  };
  /**
   * Allows the entity go idle, if swimming. Entity must be in water.
   */
  "minecraft:behavior.swim_idle"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Amount of time (in seconds) to stay idle.
     */
    idle_time?: number;
    /**
     * Percent chance this entity will go idle, 1.0 = 100%.
     */
    success_rate?: number;
  };
  /**
   * Has the fish swim around when they can't pathfind.
   */
  "minecraft:behavior.swim_wander"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * Percent chance to start wandering, when not path-finding. 1 = 100%
     */
    interval?: number;
    /**
     * Distance to look ahead for obstacle avoidance, while wandering.
     */
    look_ahead?: number;
    /**
     * Amount of time (in seconds) to wander after wandering behavior was successfully started.
     */
    wander_time?: number;
  };
  /**
   * Allows the entity follow another entity. Both entities must be swimming and in water.
   */
  "minecraft:behavior.swim_with_entity"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * Percent chance to start following another entity, if not already doing so. 1.0 = 100%
     */
    success_rate?: number;
    /**
     * Percent chance to stop following the current entity, if they're riding another entity or they're not swimming. 1.0 = 100%
     */
    chance_to_stop?: number;
    /**
     * Time (in seconds) between checks to determine if this entity should catch up to the entity being followed or match the direction of the entity being followed.
     */
    state_check_interval?: number;
    /**
     * Distance, from the entity being followed, at which this entity will speed up to reach that entity.
     */
    catch_up_threshold?: number;
    /**
     * Distance, from the entity being followed, at which this entity will try to match that entity's direction.
     */
    match_direction_threshold?: number;
    /**
     * The multiplier this entity's speed is modified by when matching another entity's direction.
     */
    catch_up_multiplier?: number;
    /**
     * Radius around this entity to search for another entity to follow.
     */
    search_range?: number;
    /**
     * Distance, from the entity being followed, at which this entity will stop following that entity.
     */
    stop_distance?: number;
    /**
     * Filters which determine what entites are valid to follow.
     */
    entity_types?: EntityType[] | EntityType;
  };
  /**
   * Allows the mob to move to attack a target. The goal ends if it has a horizontal collision or gets hit. Built to be used with flying mobs.
   */
  "minecraft:behavior.swoop_attack"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * Added to the base size of the entity, to determine the target's maximum allowable distance, when trying to deal attack damage.
     */
    damage_reach?: number;
    /**
     * A described range.
     */
    delay_range?: number | [number, number] | {
      /**
       * The minimum value of the range.
       */
      range_min?: number;
      /**
       * The maximum value of the range.
       */
      range_max?: number;
    };
  };
  /**
   * Can only be used by Villagers. Allows the mob to accept flowers from Iron Golems.
   */
  "minecraft:behavior.take_flower"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * Conditions that need to be met for the behavior to start.
     */
    filters?: Filters;
    /**
     * Maximum rotation (in degrees), on the Y-axis, this entity can rotate its head while trying to look at the target.
     */
    max_head_rotation_y?: number;
    /**
     * Maximum rotation (in degrees), on the X-axis, this entity can rotate while trying to look at the target.
     */
    max_rotation_x?: number;
    /**
     * The maximum amount of time (in seconds) for the mob to randomly wait for before taking the flower.
     */
    max_wait_time?: number;
    /**
     * Minimum distance (in blocks) for the entity to be considered having reached its target.
     */
    min_distance_to_target?: number;
    /**
     * The minimum amount of time (in seconds) for the mob to randomly wait for before taking the flower.
     */
    min_wait_time?: number;
    /**
     * An vector of 3 number.
     */
    search_area?: [number, number, number];
  };
  /**
   * Allows an entity to select a valid target entity that pushed it.
   */
  "minecraft:behavior.target_when_pushed"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * The list of conditions the other entity must meet to be a valid target.
     */
    entity_types?: EntityType[] | EntityType;
    /**
     * Probability that the entity will target the entity that pushed it.
     */
    percent_chance?: number;
  };
  /**
   * Allows an entity to be tempted by a set item.
   */
  "minecraft:behavior.tempt"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * If true, the mob can stop being tempted if the player moves too fast while close to this mob.
     */
    can_get_scared?: boolean;
    /**
     * If true, the mob can be tempted even if it has a passenger (i.e. if being ridden).
     */
    can_tempt_while_ridden?: boolean;
    /**
     * If true, vertical distance to the player will be considered when tempting.
     */
    can_tempt_vertically?: boolean;
    /**
     * List of items this mob is tempted by.
     */
    items?: (ItemIdentifier | ItemIdentifier | {
      /**
       * UNDOCUMENTED.
       */
      item?: ItemIdentifier | ItemIdentifier;
    })[];
    /**
     * Range of random ticks to wait between tempt sounds.
     */
    sound_interval?: number | [number, number];
    /**
     * Sound to play while the mob is being tempted.
     */
    tempt_sound?: SoundEvent;
    /**
     * Distance in blocks this mob can get tempted by a player holding an item they like.
     */
    within_radius?: number;
  };
  /**
   * Allows the mob to look at a player that is holding a tradable item.
   */
  "minecraft:behavior.trade_interest"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * The Maximum time in seconds that the trader will hold an item before attempting to switch for a different item that takes the same trade.
     */
    carried_item_switch_time?: number;
    /**
     * The time in seconds before the trader can use this goal again.
     */
    cooldown?: number;
    /**
     * The Maximum time in seconds that the trader will be interested with showing it's trade items.
     */
    interest_time?: number;
    /**
     * The Maximum time in seconds that the trader will wait when you no longer have items to trade.
     */
    remove_item_time?: number;
    /**
     * Distance in blocks this mob can be interested by a player holding an item they like.
     */
    within_radius?: number;
  };
  /**
   * Allows the player to trade with this mob.
   */
  "minecraft:behavior.trade_with_player"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
  };
  /**
   * Allows the mob to target the same entity its owner is targeting.
   */
  "minecraft:behavior.vex_copy_owner_target"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * List of entities this mob can copy the owner from.
     */
    entity_types?: EntityType[] | EntityType;
  };
  /**
   * Allows the mob to move around randomly like the Vex.
   */
  "minecraft:behavior.vex_random_move"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * List of entities this mob can copy the owner from.
     */
    entity_types?: EntityType[] | EntityType;
  };
  /**
   * Allows the wither to launch random attacks. Can only be used by the Wither Boss.
   */
  "minecraft:behavior.wither_random_attack_pos_goal"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
  };
  /**
   * Allows the wither to focus its attacks on whichever mob has dealt the most damage to it. Can only be used by the Wither Boss.
   */
  "minecraft:behavior.wither_target_highest_damage"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * List of entity types the wither takes into account to find who dealt the most damage to it.
     */
    entity_types?: EntityType[] | EntityType;
  };
  /**
   * Allows the NPC to use the POI.
   */
  "minecraft:behavior.work"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * The amount of ticks the NPC will stay in their the work location.
     */
    active_time?: number;
    /**
     * If true, this entity can work when their jobsite POI is being rained on.
     */
    can_work_in_rain?: boolean;
    /**
     * The amount of ticks the goal will be on cooldown before it can be used again.
     */
    goal_cooldown?: number;
    /**
     * Event to run when the mob reaches their jobsite.
     */
    on_arrival?: EventTriggerFiltered;
    /**
     * The max interval in which a sound will play.
     */
    sound_delay_max?: number;
    /**
     * The min interval in which a sound will play.
     */
    sound_delay_min?: number;
    /**
     * If "can_work_in_rain" is false, this is the maximum number of ticks left in the goal where rain will not interrupt the goal
     */
    work_in_rain_tolerance?: number;
  };
  /**
   * Allows the NPC to use the composter POI to convert excess seeds into bone meal.
   */
  "minecraft:behavior.work_composter"?: {
    /**
     * How important this behavior is. Lower priority behaviors will be executed first.
     */
    priority?: number;
    /**
     * Movement speed multiplier of the mob when using this AI Goal.
     */
    speed_multiplier?: number;
    /**
     * The amount of ticks the NPC will stay in their the work location.
     */
    active_time?: number;
    /**
     * The maximum number of times the mob will interact with the composter.
     */
    block_interaction_max?: number;
    /**
     * Determines whether the mob can empty a full composter.
     */
    can_empty_composter?: boolean;
    /**
     * Determines whether the mob can add items to a composter given that it is not full.
     */
    can_fill_composter?: boolean;
    /**
     * If true, this entity can work when their jobsite POI is being rained on.
     */
    can_work_in_rain?: boolean;
    /**
     * The amount of ticks the goal will be on cooldown before it can be used again.
     */
    goal_cooldown?: number;
    /**
     * The maximum number of items which can be added to the composter per block interaction.
     */
    items_per_use_max?: number;
    /**
     * Limits the amount of each compostable item the mob can use. Any amount held over this number will be composted if possible
     */
    min_item_count?: number;
    /**
     * Event to run when the mob reaches their jobsite.
     */
    on_arrival?: EventTriggerFiltered;
    /**
     * Unused.
     */
    sound_delay_max?: number;
    /**
     * Unused.
     */
    sound_delay_min?: number;
    /**
     * The maximum interval in which the mob will interact with the composter.
     */
    use_block_max?: number;
    /**
     * The minimum interval in which the mob will interact with the composter.
     */
    use_block_min?: number;
    /**
     * If "can_work_in_rain" is false, this is the maximum number of ticks left in the goal where rain will not interrupt the goal
     */
    work_in_rain_tolerance?: number;
  };
}
