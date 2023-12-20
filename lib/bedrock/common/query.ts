import { ItemIdentifier } from "./ItemIdentifier.ts";

// Will probably remove this in the future

export const query = Object.freeze({
  /**
   * Returns the height of the block immediately above the highest solid block at the input (x,z) position
   */
  above_top_solid: (x: number, z: number) => `query.above_top_solid(${join(x, z)})`,

  /**
   * Returns the number of actors rendered in the last frame.
   */
  actor_count: `query.actor_count`,

  /**
   * Requires at least 3 arguments. Evaluates the first argument, then returns 1.0 if all of the following arguments evaluate to the same value as the first. Otherwise it returns 0.0.
   */
  all: (...params: [unknown, unknown, unknown, ...unknown[]]) => `query.all(${join(...params)})`,

  /**
   * Only valid in an animation controller. Returns 1.0 if all animations in the current animation controller state have played through at least once, else it returns 0.0.
   */
  all_animations_finished: `query.all_animations_finished`,

  /**
   * Returns if the item or block has all of the tags specified.
   */
  all_tags: (...tags: string[]) => `query.all_tags(${join(...tags)})`,

  /**
   * Returns the anger level of the actor [0,n). On errors or if the actor has no anger level, returns 0. Available on the Server only.
   */
  anger_level: `query.anger_level`,

  /**
   * Returns the time in seconds since the current animation started, else 0.0 if not called within an animation.
   */
  anim_time: `query.anim_time`,

  /**
   * Requires at least 3 arguments. Evaluates the first argument, then returns 1.0 if any of the following arguments evaluate to the same value as the first. Otherwise it returns 0.0.
   */
  any: (...params: [unknown, unknown, unknown, ...unknown[]]) => `query.any(${join(...params)})`,

  /**
   * Only valid in an animation controller. Returns 1.0 if any animation in the current animation controller state has played through at least once, else it returns 0.0.
   */
  any_animation_finished: `query.any_animation_finished`,

  /**
   * Returns if the item or block has any of the tags specified.
   */
  any_tag: `query.any_tag`,

  /**
   * Returns 1.0 if all of the arguments are within 0.000000 of each other, else 0.0.
   */
  approx_eq: `query.approx_eq`,

  /**
   * Takes the armor slot index as a parameter, and returns the color of the armor in the requested slot.
   */
  armor_color_slot: (slot: number) => `query.armor_color_slot(${slot})`,

  /**
   * Takes the armor slot index as a parameter, and returns the armor material type in the requested armor slot.
   */
  armor_material_slot: (slot: number) => `query.armor_material_slot(${slot})`,

  /**
   * Takes the armor slot index as a parameter, and returns the texture type of the requested slot.
   */
  armor_texture_slot: (slot: number) => `query.armor_texture_slot(${slot})`,

  /**
   * Returns the time in *seconds* of the average frame time over the last 'n' frames. If an argument is passed, it is assumed to be the number of frames in the past that you wish to query. 'query.average_frame_time' (or the equivalent 'query.average_frame_time(0)') will return the frame time of the frame before the current one. 'query.average_frame_time(1)' will return the average frame time of the previous two frames. Currently we store the history of the last 30 frames, although note that this may change in the future. Asking for more frames will result in only sampling the number of frames stored.
   */
  average_frame_time: `query.average_frame_time`,

  /**
   * Returns the block face for this (only valid for certain triggers such as placing blocks, or interacting with block) (Down=0.0, Up=1.0, North=2.0, South=3.0, West=4.0, East=5.0, Undefined=6.0).
   */
  block_face: `query.block_face`,

  /**
   * Returns the value of the associated Blocks Block State.
   */
  block_property: `query.block_property`,

  /**
   * Returns 1.0 if the entity is blocking, else it returns 0.0.
   */
  blocking: `query.blocking`,

  /**
   * Returns the body pitch rotation if called on an actor, else it returns 0.0.
   */
  body_x_rotation: `query.body_x_rotation`,

  /**
   * Returns the body yaw rotation if called on an actor, else it returns 0.0.
   */
  body_y_rotation: `query.body_y_rotation`,

  /**
   * Returns the axis aligned bounding box of a bone as a struct with members '.min', '.max', along with '.x', '.y', and '.z' values for each.
   */
  bone_aabb: `query.bone_aabb`,

  /**
   * Returns the initial (from the .geo) pivot of a bone as a struct with members '.x', '.y', and '.z'.
   */
  bone_origin: `query.bone_origin`,

  /**
   * Returns the initial (from the .geo) rotation of a bone as a struct with members '.x', '.y', and '.z' in degrees.
   */
  bone_rotation: `query.bone_rotation`,

  /**
   * Takes two distances (any order) and return a number from 0 to 1 based on the camera distance between the two ranges clamped to that range. For example, 'query.camera_distance_range_lerp(10, 20)' will return 0 for any distance less than or equal to 10, 0.2 for a distance of 12, 0.5 for 15, and 1 for 20 or greater. If you pass in (20, 10), a distance of 20 will return 0.0.
   */
  camera_distance_range_lerp: (range1: number, range2: number) =>
    `query.camera_distance_range_lerp(${join(range1, range2)})`,

  /**
   * Returns the rotation of the camera. Requires one argument representing the rotation axis you would like (0 for x, 1 for y).
   */
  camera_rotation: (axis: 0 | 1) => `query.camera_rotation(${axis})`,

  /**
   * Returns 1.0 if the entity can climb, else it returns 0.0.
   */
  can_climb: `query.can_climb`,

  /**
   * Returns 1.0 if the entity can damage nearby mobs, else it returns 0.0.
   */
  can_damage_nearby_mobs: `query.can_damage_nearby_mobs`,

  /**
   * Returns 1.0 if the entity can dash, else it returns 0.0
   */
  can_dash: `query.can_dash`,

  /**
   * Returns 1.0 if the entity can fly, else it returns 0.0.
   */
  can_fly: `query.can_fly`,

  /**
   * Returns 1.0 if the entity can power jump, else it returns 0.0.
   */
  can_power_jump: `query.can_power_jump`,

  /**
   * Returns 1.0 if the entity can swim, else it returns 0.0.
   */
  can_swim: `query.can_swim`,

  /**
   * Returns 1.0 if the entity can walk, else it returns 0.0.
   */
  can_walk: `query.can_walk`,

  /**
   * Returns value between 0.0 and 1.0 with 0.0 meaning cape is fully down and 1.0 is cape is fully up.
   */
  cape_flap_amount: `query.cape_flap_amount`,

  /**
   * Returns the current facing of the player (Down=0.0, Up=1.0, North=2.0, South=3.0, West=4.0, East=5.0, Undefined=6.0).
   */
  cardinal_facing: `query.cardinal_facing`,

  /**
   * Returns the current facing of the player ignoring up/down part of the direction (North=2.0, South=3.0, West=4.0, East=5.0, Undefined=6.0).
   */
  cardinal_facing_2d: `query.cardinal_facing_2d`,

  /**
   * Returns the current facing of the player (Down=0.0, Up=1.0, North=2.0, South=3.0, West=4.0, East=5.0, Undefined=6.0).
   */
  cardinal_player_facing: `query.cardinal_player_facing`,

  /**
   * Combines any valid entity references from all arguments into a single array. Note that order is not preserved, and duplicates and invalid values are removed.
   */
  combine_entities: `query.combine_entities`,

  /**
   * Counts the number of things passed to it (arrays are counted as the number of elements they contain; non-arrays count as 1).
   */
  count: `query.count`,

  /**
   * Returns the squish value for the current entity, or 0.0 if this doesn't make sense.
   */
  current_squish_value: `query.current_squish_value`,

  /**
   * Returns dash cooldown progress if the entity can dash, else it returns 0.0.
   */
  dash_cooldown_progress: `query.dash_cooldown_progress`,

  /**
   * Returns the day of the current level.
   */
  day: `query.day`,

  /**
   * Returns the elapsed ticks since the mob started dying.
   */
  death_ticks: `query.death_ticks`,

  /**
   * debug log a value to the output debug window for builds that have one
   */
  debug_output: `query.debug_output`,

  /**
   * Returns the time in seconds since the previous frame.
   */
  delta_time: `query.delta_time`,

  /**
   * Returns the distance of the root of this actor or particle emitter from the camera.
   */
  distance_from_camera: `query.distance_from_camera`,

  /**
   * Returns the total number of active emitters of the callee's particle effect type.
   */
  effect_emitter_count: `query.effect_emitter_count`,

  /**
   * Returns the total number of active particles of the callee's particle effect type.
   */
  effect_particle_count: `query.effect_particle_count`,

  /**
   * Returns the number of equipped armor pieces for an actor from 0 to 4, not counting items held in hands. (To query for hand slots, use query.is_item_equipped or query.is_item_name_any).
   */
  equipment_count: `query.equipment_count`,

  /**
   * Takes a slot name followed by any tag you want to check for in the form of 'tag_name' and returns 1 if all of the tags are on that equipped item, 0 otherwise.
   */
  equipped_item_all_tags: (slotName: SlotName, ...tags: string[]) =>
    `query.equipped_item_all_tags(${join(slotName, ...tags)})`,

  /**
   * Takes a slot name followed by any tag you want to check for in the form of 'tag_name' and returns 0 if none of the tags are on that equipped item or 1 if at least 1 tag exists.
   */
  equipped_item_any_tag: (slotName: SlotName, ...tags: string[]) =>
    `query.equipped_item_any_tag(${join(slotName, ...tags)})`,

  /**
   * Takes the desired hand slot as a parameter (0 or 'main_hand' for main hand, 1 or 'off_hand' for off hand), and returns whether the item is an attachable or not.
   */
  equipped_item_is_attachable: (slot: 0 | 1) => `query.equipped_item_is_attachable(${slot})`,

  /**
   * Returns the X eye rotation of the entity if it makes sense, else it returns 0.0.
   */
  eye_target_x_rotation: `query.eye_target_x_rotation`,

  /**
   * Returns the Y eye rotation of the entity if it makes sense, else it returns 0.0.
   */
  eye_target_y_rotation: `query.eye_target_y_rotation`,

  /**
   * Returns 1.0 if the entity is attacking from range (i.e. minecraft:behavior.ranged_attack), else it returns 0.0.
   */
  facing_target_to_range_attack: `query.facing_target_to_range_attack`,

  /**
   * Returns the ratio (from 0 to 1) of how much between AI ticks this frame is being rendered.
   */
  frame_alpha: `query.frame_alpha`,

  /**
   * Returns the integer id of an actor by its string name.
   */
  get_actor_info_id: `query.get_actor_info_id`,

  /**
   * Returns the current texture of the item
   */
  get_animation_frame: `query.get_animation_frame`,

  /**
   * Gets specified axis of the specified bone orientation pivot.
   */
  get_default_bone_pivot: `query.get_default_bone_pivot`,

  /**
   * Gets specified axis of the specified locator offset.
   */
  get_locator_offset: `query.get_locator_offset`,

  /**
   * Gets specified axis of the specified locator offset of the root model.
   */
  get_root_locator_offset: `query.get_root_locator_offset`,

  /**
   * Returns the ground speed of the entity in meters/second.
   */
  ground_speed: `query.ground_speed`,

  /**
   * Usable only in behavior packs when determining the default value for an entity's Property. Requires one string argument. If the entity is being loaded from data that was last saved with a component_group with the specified name, returns 1.0, otherwise returns 0.0. The purpose of this query is to allow entity definitions to change and still be able to load the correct state of entities.
   */
  had_component_group: (groupName: string) => `query.had_component_group('${groupName}')`,

  /**
   * Returns 1 if the entity has any of the specified families, else 0.
   */
  has_any_family: `query.has_any_family`,

  /**
   * Takes the armor slot index as a parameter, and returns 1.0 if the entity has armor in the requested slot, else it returns 0.0
   */
  has_armor_slot: (slot: number) => `query.has_armor_slot(${slot})`,

  /**
   * Returns whether or not a Block Placement Target has a specific biome tag
   */
  has_biome_tag: `query.has_biome_tag`,

  /**
   * Returns 1.0 if the associated block has the given block property or 0.0 if not
   */
  has_block_property: `query.has_block_property`,

  /**
   * Returns 1.0 if the player has a cape, else it returns 0.0.
   */
  has_cape: `query.has_cape`,

  /**
   * Returns 1.0 if the entity has collisions enabled, else it returns 0.0.
   */
  has_collision: `query.has_collision`,

  /**
   * Returns 1.0 if the entity has cooldown on its dash, else it returns 0.0
   */
  has_dash_cooldown: `query.has_dash_cooldown`,

  /**
   * Returns 1.0 if the entity is affected by gravity, else it returns 0.0.
   */
  has_gravity: `query.has_gravity`,

  /**
   * Returns true if the entity has an owner ID else it returns false
   */
  has_owner: `query.has_owner`,

  /**
   * Takes one argument: the name of the property on the Actor. Returns 1.0 if a property with the given name exists, 0 otherwise.
   */
  has_property: `query.has_property`,

  /**
   * Returns 1.0 if the entity has a rider, else it returns 0.0
   */
  has_rider: `query.has_rider`,

  /**
   * Returns 1.0 if the entity has a target, else it returns 0.0
   */
  has_target: `query.has_target`,

  /**
   * Returns the roll angle of the head of the entity if it makes sense, else it returns 0.0.
   */
  head_roll_angle: `query.head_roll_angle`,

  /**
   * Takes one argument as a parameter. Returns the nth head x rotation of the entity if it makes sense, else it returns 0.0.
   */
  head_x_rotation: (n: number) => `query.head_x_rotation(${n})`,

  /**
   * Takes one argument as a parameter. Returns the nth head y rotation of the entity if it makes sense, else it returns 0.0.
   */
  head_y_rotation: (n: number) => `query.head_y_rotation(${n})`,

  /**
   * Returns the health of the entity, or 0.0 if it doesn't make sense to call on this entity.
   */
  health: `query.health`,

  /**
   * Returns the heartbeat interval of the actor in seconds. Returns 0 when the actor has no heartbeat.
   */
  heartbeat_interval: `query.heartbeat_interval`,

  /**
   * Returns the heartbeat phase of the actor. 0.0 if at start of current heartbeat, 1.0 if at the end. Returns 0 on errors or when the actor has no heartbeat. Available on the Client (Resource Packs) only.
   */
  heartbeat_phase: `query.heartbeat_phase`,

  /**
   * Queries Height Map
   */
  heightmap: `query.heightmap`,

  /**
   * Returns the hurt direction for the actor, otherwise returns 0.
   */
  hurt_direction: `query.hurt_direction`,

  /**
   * Returns the hurt time for the actor, otherwise returns 0.
   */
  hurt_time: `query.hurt_time`,

  /**
   * Requires 3 numerical arguments: some value, a minimum, and a maximum. If the first argument is between the minimum and maximum (inclusive), returns 1.0. Otherwise returns 0.0.
   */
  in_range: (value: number, min: number, max: number) => `query.in_range(${join(value, min, max)})`,

  /**
   * Returns the number of ticks of invulnerability the entity has left if it makes sense, else it returns 0.0.
   */
  invulnerable_ticks: `query.invulnerable_ticks`,

  /**
   * Returns 1.0 if the entity is admiring, else it returns 0.0.
   */
  is_admiring: `query.is_admiring`,

  /**
   * Returns 1.0 if the entity is alive, and 0.0 if it's dead.
   */
  is_alive: `query.is_alive`,

  /**
   * Returns 1.0 if the entity is angry, else it returns 0.0.
   */
  is_angry: `query.is_angry`,

  /**
   * Returns 1.0 if the actor is attached to an entity, else it will return 0.0.
   */
  is_attached_to_entity: `query.is_attached_to_entity`,

  /**
   * Returns 1.0 if the entity is fleeing from a block, else it returns 0.0.
   */
  is_avoiding_block: `query.is_avoiding_block`,

  /**
   * Returns 1.0 if the entity is fleeing from mobs, else it returns 0.0.
   */
  is_avoiding_mobs: `query.is_avoiding_mobs`,

  /**
   * Returns 1.0 if the entity is a baby, else it returns 0.0.
   */
  is_baby: `query.is_baby`,

  /**
   * Returns 1.0 if the entity is breathing, else it returns 0.0.
   */
  is_breathing: `query.is_breathing`,

  /**
   * Returns 1.0 if the entity has been bribed, else it returns 0.0.
   */
  is_bribed: `query.is_bribed`,

  /**
   * Returns 1.0 if the entity is carrying a block, else it returns 0.0.
   */
  is_carrying_block: `query.is_carrying_block`,

  /**
   * Returns 1.0 if the entity is casting, else it returns 0.0.
   */
  is_casting: `query.is_casting`,

  /**
   * Returns 1.0 if the entity is celebrating, else it returns 0.0.
   */
  is_celebrating: `query.is_celebrating`,

  /**
   * Returns 1.0 if the entity is doing a special celebration, else it returns 0.0.
   */
  is_celebrating_special: `query.is_celebrating_special`,

  /**
   * Returns 1.0 if the entity is charged, else it returns 0.0.
   */
  is_charged: `query.is_charged`,

  /**
   * Returns 1.0 if the entity is charging, else it returns 0.0.
   */
  is_charging: `query.is_charging`,

  /**
   * Returns 1.0 if the entity has chests attached to it, else it returns 0.0.
   */
  is_chested: `query.is_chested`,

  /**
   * Returns 1.0 if the entity is critical, else it returns 0.0.
   */
  is_critical: `query.is_critical`,

  /**
   * Returns 1.0 if the entity is croaking, else it returns 0.0.
   */
  is_croaking: `query.is_croaking`,

  /**
   * Returns 1.0 if the entity is dancing, else it returns 0.0.
   */
  is_dancing: `query.is_dancing`,

  /**
   * Returns 1.0 if the entity is attacking using the delayed attack, else it returns 0.0.
   */
  is_delayed_attacking: `query.is_delayed_attacking`,

  /**
   * Returns 1.0 if the entity is digging, else it returns 0.0.
   */
  is_digging: `query.is_digging`,

  /**
   * Returns 1.0 if the entity is eating, else it returns 0.0.
   */
  is_eating: `query.is_eating`,

  /**
   * Returns 1.0 if the entity is eating a mob, else it returns 0.0.
   */
  is_eating_mob: `query.is_eating_mob`,

  /**
   * Returns 1.0 if the entity is an elder version of it, else it returns 0.0.
   */
  is_elder: `query.is_elder`,

  /**
   * Returns 1.0 if the entity is emerging, else it returns 0.0.
   */
  is_emerging: `query.is_emerging`,

  /**
   * Returns 1.0 if the entity is emoting, else it returns 0.0.
   */
  is_emoting: `query.is_emoting`,

  /**
   * Returns 1.0 if the entity is enchanted, else it returns 0.0.
   */
  is_enchanted: `query.is_enchanted`,

  /**
   * Returns 1.0 if the entity is immune to fire, else it returns 0.0.
   */
  is_fire_immune: `query.is_fire_immune`,

  /**
   * Returns 1.0 if the entity is being rendered in first person mode, else it returns 0.0.
   */
  is_first_person: `query.is_first_person`,

  /**
   * Returns 1.0 if an entity is a ghost, else it returns 0.0.
   */
  is_ghost: `query.is_ghost`,

  /**
   * Returns 1.0 if the entity is gliding, else it returns 0.0.
   */
  is_gliding: `query.is_gliding`,

  /**
   * Returns 1.0 if the entity is grazing, or 0.0 if not.
   */
  is_grazing: `query.is_grazing`,

  /**
   * Returns 1.0 if the entity is idling, else it returns 0.0.
   */
  is_idling: `query.is_idling`,

  /**
   * Returns 1.0 if the entity is ignited, else it returns 0.0.
   */
  is_ignited: `query.is_ignited`,

  /**
   * Returns 1.0 if the entity is an illager captain, else it returns 0.0.
   */
  is_illager_captain: `query.is_illager_captain`,

  /**
   * Returns 1.0 if the entity is in contact with any water (water, rain, splash water bottle), else it returns 0.0.
   */
  is_in_contact_with_water: `query.is_in_contact_with_water`,

  /**
   * Returns 1.0 if the entity is in love, else it returns 0.0.
   */
  is_in_love: `query.is_in_love`,

  /**
   * Returns 1.0 if the entity is rendered as part of the UI, else it returns 0.0.
   */
  is_in_ui: `query.is_in_ui`,

  /**
   * Returns 1.0 if the entity is in water, else it returns 0.0.
   */
  is_in_water: `query.is_in_water`,

  /**
   * Returns 1.0 if the entity is in water or rain, else it returns 0.0.
   */
  is_in_water_or_rain: `query.is_in_water_or_rain`,

  /**
   * Returns 1.0 if the entity is interested, else it returns 0.0.
   */
  is_interested: `query.is_interested`,

  /**
   * Returns 1.0 if the entity is invisible, else it returns 0.0.
   */
  is_invisible: `query.is_invisible`,

  /**
   * Takes one optional hand slot as a parameter (0 or 'main_hand' for main hand, 1 or 'off_hand' for off hand), and returns 1.0 if there is an item in the requested slot (defaulting to the main hand if no parameter is supplied), otherwise returns 0.0.
   */
  is_item_equipped: `query.is_item_equipped`,

  /**
   * Takes an equipment slot name (see the replaceitem command) and an optional slot index value. (The slot index is required for slot names that have multiple slots, for example 'slot.hotbar'.) After that, takes one or more full name (with 'namespace:') strings to check for. Returns 1.0 if an item in the specified slot has any of the specified names, otherwise returns 0.0. An empty string '' can be specified to check for an empty slot. Note that querying slot.enderchest, slot.saddle, slot.armor, or slot.chest will only work in behavior packs. A preferred query to query.get_equipped_item_name, as it can be adjusted by Mojang to avoid breaking content if names are changed.
   */
  is_item_name_any: (
    slotName: SlotName,
    slotCount: number,
    ...items: ItemIdentifier[]
  ) => `query.is_item_name_any(${join(slotName, slotCount, ...items)})`,
  /**
   * Returns 1.0 if the entity is doing a jump goal jump, else it returns 0.0.
   */
  is_jump_goal_jumping: `query.is_jump_goal_jumping`,

  /**
   * Returns 1.0 if the entity is jumping, else it returns 0.0.
   */
  is_jumping: `query.is_jumping`,

  /**
   * Returns 1.0 if the entity is laying down, else it returns 0.0.
   */
  is_laying_down: `query.is_laying_down`,

  /**
   * Returns 1.0 if the entity is laying an egg, else it returns 0.0.
   */
  is_laying_egg: `query.is_laying_egg`,

  /**
   * Returns 1.0 if the entity is leashed to something, else it returns 0.0.
   */
  is_leashed: `query.is_leashed`,

  /**
   * Returns 1.0 if the entity is levitating, else it returns 0.0.
   */
  is_levitating: `query.is_levitating`,

  /**
   * Returns 1.0 if the entity is lingering, else it returns 0.0.
   */
  is_lingering: `query.is_lingering`,

  /**
   * Returns 1.0 if the entity is moving, else it returns 0.0.
   */
  is_moving: `query.is_moving`,

  /**
   * Takes one or more arguments. If the entity's name is any of the specified string values, returns 1.0. Otherwise returns 0.0. A preferred query to query.get_name, as it can be adjusted by Mojang to avoid breaking content if names are changed.
   */
  is_name_any: (...names: string[]) => `query.is_name_any(${join(...names)})`,

  /**
   * Returns 1.0 if the entity is on fire, else it returns 0.0.
   */
  is_on_fire: `query.is_on_fire`,

  /**
   * Returns 1.0 if the entity is on the ground, else it returns 0.0.
   */
  is_on_ground: `query.is_on_ground`,

  /**
   * Returns 1.0 if this is called on an entity at a time when it is known if it is on screen, else it returns 0.0.
   */
  is_on_screen: `query.is_on_screen`,

  /**
   * Returns 1.0 if the entity is on fire, else it returns 0.0.
   */
  is_onfire: `query.is_onfire`,

  /**
   * Returns 1.0 if the entity is orphaned, else it returns 0.0.
   */
  is_orphaned: `query.is_orphaned`,

  /**
   * Takes one or more arguments. Returns whether the root actor identifier is any of the specified strings. A preferred query to query.owner_identifier, as it can be adjusted by Mojang to avoid breaking content if names are changed.
   */
  is_owner_identifier_any: (...identifiers: string[]) => `query.is_owner_identifier_any(${join(...identifiers)})`,

  /**
   * Returns 1.0 if the player has a persona or premium skin, else it returns 0.0.
   */
  is_persona_or_premium_skin: `query.is_persona_or_premium_skin`,

  /**
   * Returns 1.0 if the entity is playing dead, else it returns 0.0.
   */
  is_playing_dead: `query.is_playing_dead`,

  /**
   * Returns 1.0 if the entity is powered, else it returns 0.0.
   */
  is_powered: `query.is_powered`,

  /**
   * Returns 1.0 if the entity is pregnant, else it returns 0.0.
   */
  is_pregnant: `query.is_pregnant`,

  /**
   * Returns 1.0 if the entity is using a ram attack, else it returns 0.0.
   */
  is_ram_attacking: `query.is_ram_attacking`,

  /**
   * Returns 1.0 if the entity is resting, else it returns 0.0.
   */
  is_resting: `query.is_resting`,

  /**
   * Returns 1.0 if the entity is riding, else it returns 0.0.
   */
  is_riding: `query.is_riding`,

  /**
   * Returns 1.0 if the entity is currently roaring, else it returns 0.0.
   */
  is_roaring: `query.is_roaring`,

  /**
   * Returns 1.0 if the entity is rolling, else it returns 0.0.
   */
  is_rolling: `query.is_rolling`,

  /**
   * Returns 1.0 if the entity has a saddle, else it returns 0.0.
   */
  is_saddled: `query.is_saddled`,

  /**
   * Returns 1.0 if the entity is scared, else it returns 0.0.
   */
  is_scared: `query.is_scared`,

  /**
   * Returns true if the player has selected an item in the inventory, else it returns 0.0.
   */
  is_selected_item: `query.is_selected_item`,

  /**
   * Returns 1.0 if the entity is casting, else it returns 0.0.
   */
  is_shaking: `query.is_shaking`,

  /**
   * Returns 1.0 if the entity is shaking water off, else it returns 0.0.
   */
  is_shaking_wetness: `query.is_shaking_wetness`,

  /**
   * Returns 1.0 if the entity is able to be sheared and is sheared, else it returns 0.0.
   */
  is_sheared: `query.is_sheared`,

  /**
   * Returns 1.0f if the entity has an active powered shield if it makes sense, else it returns 0.0.
   */
  is_shield_powered: `query.is_shield_powered`,

  /**
   * Returns 1.0 if the entity is silent, else it returns 0.0.
   */
  is_silent: `query.is_silent`,

  /**
   * Returns 1.0 if the entity is sitting, else it returns 0.0.
   */
  is_sitting: `query.is_sitting`,

  /**
   * Returns 1.0 if the entity is sleeping, else it returns 0.0.
   */
  is_sleeping: `query.is_sleeping`,

  /**
   * Returns 1.0 if the entity is sneaking, else it returns 0.0.
   */
  is_sneaking: `query.is_sneaking`,

  /**
   * Returns 1.0 if the entity is sneezing, else it returns 0.0.
   */
  is_sneezing: `query.is_sneezing`,

  /**
   * Returns 1.0 if the entity is sniffing, else it returns 0.0.
   */
  is_sniffing: `query.is_sniffing`,

  /**
   * Returns 1.0 if the entity is using sonic boom, else it returns 0.0.
   */
  is_sonic_boom: `query.is_sonic_boom`,

  /**
   * Returns 1.0 if the entity is spectator, else it returns 0.0.
   */
  is_spectator: `query.is_spectator`,

  /**
   * Returns 1.0 if the entity is sprinting, else it returns 0.0.
   */
  is_sprinting: `query.is_sprinting`,

  /**
   * Returns 1.0 if the entity is stackable, else it returns 0.0.
   */
  is_stackable: `query.is_stackable`,

  /**
   * Returns 1.0 if the entity is stalking, else it returns 0.0.
   */
  is_stalking: `query.is_stalking`,

  /**
   * Returns 1.0 if the entity is standing, else it returns 0.0.
   */
  is_standing: `query.is_standing`,

  /**
   * Returns 1.0 if the entity is currently stunned, else it returns 0.0.
   */
  is_stunned: `query.is_stunned`,

  /**
   * Returns 1.0 if the entity is swimming, else it returns 0.0.
   */
  is_swimming: `query.is_swimming`,

  /**
   * Returns 1.0 if the entity is tamed, else it returns 0.0.
   */
  is_tamed: `query.is_tamed`,

  /**
   * Returns 1.0 if the entity is transforming, else it returns 0.0.
   */
  is_transforming: `query.is_transforming`,

  /**
   * Returns 1.0 if the entity is using an item, else it returns 0.0.
   */
  is_using_item: `query.is_using_item`,

  /**
   * Returns 1.0 if the entity is climbing a wall, else it returns 0.0.
   */
  is_wall_climbing: `query.is_wall_climbing`,

  /**
   * Returns the amount of time an item has been in use in seconds up to the maximum duration, else 0.0 if it doesn't make sense.
   */
  item_in_use_duration: `query.item_in_use_duration`,

  /**
   * Takes one optional hand slot as a parameter (0 or 'main_hand' for main hand, 1 or 'off_hand' for off hand), and returns 1.0 if the item is charged in the requested slot (defaulting to the main hand if no parameter is supplied), otherwise returns 0.0.
   */
  item_is_charged: `query.item_is_charged`,

  /**
   * Returns the maximum amount of time the item can be used, else 0.0 if it doesn't make sense.
   */
  item_max_use_duration: `query.item_max_use_duration`,

  /**
   * Returns the amount of time an item has left to use, else 0.0 if it doesn't make sense.Item queried is specified by the slot name 'main_hand' or 'off_hand'.Time remaining is normalized using the normalization value, only if one is given, else it is returned in seconds.
   */
  item_remaining_use_duration: `query.item_remaining_use_duration`,

  /**
   * query.item_slot_to_bone_name requires one parameter: the name of the equipment slot. This function returns the name of the bone this entity has mapped to that slot.
   */
  item_slot_to_bone_name: (slotName: SlotName) => `query.item_slot_to_bone_name(${slotName})`,

  /**
   * Returns the ratio between the previous and next key frames.
   */
  key_frame_lerp_time: `query.key_frame_lerp_time`,

  /**
   * Returns the time in *seconds* of the last frame. If an argument is passed, it is assumed to be the number of frames in the past that you wish to query. 'query.last_frame_time' (or the equivalent 'query.last_frame_time(0)') will return the frame time of the frame before the current one. 'query.last_frame_time(1)' will return the frame time of two frames ago. Currently we store the history of the last 30 frames, although note that this may change in the future. Passing an index more than the available data will return the oldest frame stored.
   */
  last_frame_time: `query.last_frame_time`,

  /**
   * Returns 1.0 if the entity was last hit by the player, else it returns 0.0. If called by the client always returns 0.0.
   */
  last_hit_by_player: `query.last_hit_by_player`,

  /**
   * Returns the lie down amount for the entity.
   */
  lie_amount: `query.lie_amount`,

  /**
   * Returns the limited life span of an entity, or 0.0 if it lives forever
   */
  life_span: `query.life_span`,

  /**
   * Returns the time in seconds since the current animation started, else 0.0 if not called within an animation.
   */
  life_time: `query.life_time`,

  /**
   * Takes an array of distances and returns the zero - based index of which range the actor is in based on distance from the camera. For example, 'query.lod_index(10, 20, 30)' will return 0, 1, or 2 based on whether the mob is less than 10, 20, or 30 units away from the camera, or it will return 3 if it is greater than 30.
   */
  lod_index: (...distances: number[]) => `query.lod_index(${join(...distances)})`,

  /**
   * debug log a value to the content log
   */
  log: (message: string) => `query.log('${message}')`,

  /**
   * Returns the use time maximum duration for the main hand item if it makes sense, else it returns 0.0.
   */
  main_hand_item_max_duration: `query.main_hand_item_max_duration`,

  /**
   * Returns the use time for the main hand item.
   */
  main_hand_item_use_duration: `query.main_hand_item_use_duration`,

  /**
   * Returns the entity's mark variant
   */
  mark_variant: `query.mark_variant`,

  /**
   * Returns the max durability an item can take.
   */
  max_durability: `query.max_durability`,

  /**
   * Returns the maximum health of the entity, or 0.0 if it doesn't make sense to call on this entity.
   */
  max_health: `query.max_health`,

  /**
   * Returns the maximum trade tier of the entity if it makes sense, else it returns 0.0
   */
  max_trade_tier: `query.max_trade_tier`,

  /**
   * Returns the time in *seconds* of the most expensive frame over the last 'n' frames. If an argument is passed, it is assumed to be the number of frames in the past that you wish to query. 'query.maximum_frame_time' (or the equivalent 'query.maximum_frame_time(0)') will return the frame time of the frame before the current one. 'query.maximum_frame_time(1)' will return the maximum frame time of the previous two frames. Currently we store the history of the last 30 frames, although note that this may change in the future. Asking for more frames will result in only sampling the number of frames stored.
   */
  maximum_frame_time: `query.maximum_frame_time`,

  /**
   * Returns the time in *seconds* of the least expensive frame over the last 'n' frames. If an argument is passed, it is assumed to be the number of frames in the past that you wish to query. 'query.minimum_frame_time' (or the equivalent 'query.minimum_frame_time(0)') will return the frame time of the frame before the current one. 'query.minimum_frame_time(1)' will return the minimum frame time of the previous two frames. Currently we store the history of the last 30 frames, although note that this may change in the future. Asking for more frames will result in only sampling the number of frames stored.
   */
  minimum_frame_time: `query.minimum_frame_time`,

  /**
   * Returns the scale of the current entity.
   */
  model_scale: `query.model_scale`,

  /**
   * Returns the total distance the entity has moved horizontally in meters (since the entity was last loaded, not necessarily since it was originally created) modified along the way by status flags such as is_baby or on_fire.
   */
  modified_distance_moved: `query.modified_distance_moved`,

  /**
   * Returns the current walk speed of the entity modified by status flags such as is_baby or on_fire.
   */
  modified_move_speed: `query.modified_move_speed`,

  /**
   * Returns the brightness of the moon (FULL_MOON=1.0, WANING_GIBBOUS=0.75, FIRST_QUARTER=0.5, WANING_CRESCENT=0.25, NEW_MOON=0.0, WAXING_CRESCENT=0.25, LAST_QUARTER=0.5, WAXING_GIBBOUS=0.75).
   */
  moon_brightness: `query.moon_brightness`,

  /**
   * Returns the phase of the moon (FULL_MOON=0, WANING_GIBBOUS=1, FIRST_QUARTER=2, WANING_CRESCENT=3, NEW_MOON=4, WAXING_CRESCENT=5, LAST_QUARTER=6, WAXING_GIBBOUS=7).
   */
  moon_phase: `query.moon_phase`,

  /**
   * Returns the specified axis of the normalized position delta of the entity.
   */
  movement_direction: `query.movement_direction`,

  /**
   * Queries Perlin Noise Map
   */
  noise: `query.noise`,

  /**
   * Returns the time that the entity is on fire, else it returns 0.0.
   */
  on_fire_time: `query.on_fire_time`,

  /**
   * Returns 1.0 if the entity is out of control, else it returns 0.0.
   */
  out_of_control: `query.out_of_control`,

  /**
   * Returns the players level if the actor is a player, otherwise returns 0.
   */
  player_level: `query.player_level`,

  /**
   * Returns the absolute position of an actor. Takes one argument that represents the desired axis (0 == x-axis, 1 == y-axis, 2 == z-axis).
   */
  position: (axis: 0 | 1 | 2) => `query.position(${axis})`,

  /**
   * Returns the position delta for an actor. Takes one argument that represents the desired axis (0 == x-axis, 1 == y-axis, 2 == z-axis).
   */
  position_delta: (axis: 0 | 1 | 2) => `query.position_delta(${axis})`,

  /**
   * Returns the previous squish value for the current entity, or 0.0 if this doesn't make sense.
   */
  previous_squish_value: `query.previous_squish_value`,

  /**
   * Takes one argument: the name of the property on the entity. Returns the value of that property if it exists, else 0.0 if not.
   */
  property: (name: string) => `query.property('${name}')`,

  /**
   * Returns the how much durability an item has remaining.
   */
  remaining_durability: `query.remaining_durability`,

  /**
   * Returns the roll counter of the entity.
   */
  roll_counter: `query.roll_counter`,

  /**
   * Returns the rotation required to aim at the camera. Requires one argument representing the rotation axis you would like (0 for x, 1 for y).
   */
  rotation_to_camera: (axis: 0 | 1) => `query.rotation_to_camera(${axis})`,

  /**
   * Returns the shaking angle of the entity if it makes sense, else it returns 0.0.
   */
  shake_angle: `query.shake_angle`,

  /**
   * Returns the shake time of the entity.
   */
  shake_time: `query.shake_time`,

  /**
   * Returns the how much the offhand shield should translate down when blocking and being hit.
   */
  shield_blocking_bob: `query.shield_blocking_bob`,

  /**
   * Returns 1.0 if we render the entity's bottom, else it returns 0.0.
   */
  show_bottom: `query.show_bottom`,

  /**
   * Returns the current sit amount of the entity.
   */
  sit_amount: `query.sit_amount`,

  /**
   * Returns the entity's skin ID
   */
  skin_id: `query.skin_id`,

  /**
   * Returns the rotation of the bed the player is sleeping on.
   */
  sleep_rotation: `query.sleep_rotation`,

  /**
   * Returns the sneeze counter of the entity.
   */
  sneeze_counter: `query.sneeze_counter`,

  /**
   * Returns a struct representing the entity spell color for the specified entity. The struct contains '.r' '.g' '.b' and '.a' members, each 0.0 to 1.0. If no actor is specified, each member value will be 0.0.
   */
  spellcolor: `query.spellcolor`,

  /**
   * Returns the scale of how standing up the entity is.
   */
  standing_scale: `query.standing_scale`,

  /**
   * Returns the structural integrity for the actor, otherwise returns 0.
   */
  structural_integrity: `query.structural_integrity`,

  /**
   * Returns the particle color for the block located in the surface below the actor (scanned up to 10 blocks down). The struct contains '.r' '.g' '.b' and '.a' members, each 0.0 to 1.0. If no actor is specified or if no surface is found, each member value is set to 0.0. Available on the Client (Resource Packs) only.
   */
  surface_particle_color: `query.surface_particle_color`,

  /**
   * Returns the texture coordinate for generating particles for the block located in the surface below the actor (scanned up to 10 blocks down) in a struct with 'u' and 'v' keys. If no actor is specified or if no surface is found, u and v will be 0.0. Available on the Client (Resource Packs) only.
   */
  surface_particle_texture_coordinate: `query.surface_particle_texture_coordinate`,

  /**
   * Returns the texture size for generating particles for the block located in the surface below the actor (scanned up to 10 blocks down). If no actor is specified or if no surface is found, each member value will be 0.0. Available on the Client (Resource Packs) only.
   */
  surface_particle_texture_size: `query.surface_particle_texture_size`,

  /**
   * Returns how swollen the entity is.
   */
  swell_amount: `query.swell_amount`,

  /**
   * Returns the swelling direction of the entity if it makes sense, else it returns 0.0.
   */
  swelling_dir: `query.swelling_dir`,

  /**
   * Returns the amount the current entity is swimming.
   */
  swim_amount: `query.swim_amount`,

  /**
   * Returns the angle of the tail of the entity if it makes sense, else it returns 0.0.
   */
  tail_angle: `query.tail_angle`,

  /**
   * Returns the x rotation required to aim at the entity's current target if it has one, else it returns 0.0.
   */
  target_x_rotation: `query.target_x_rotation`,

  /**
   * Returns the y rotation required to aim at the entity's current target if it has one, else it returns 0.0.
   */
  target_y_rotation: `query.target_y_rotation`,

  /**
   * Returns the icon index of the experience orb.
   */
  texture_frame_index: `query.texture_frame_index`,

  /**
   * Returns the time of day (midnight=0.0, sunrise=0.25, noon=0.5, sunset=0.75) of the dimension the entity is in.
   */
  time_of_day: `query.time_of_day`,

  /**
   * Returns the time in seconds since the last vibration detected by the actor. On errors or if no vibration has been detected yet, returns -1. Available on the Client (Resource Packs) only.
   */
  time_since_last_vibration_detection: `query.time_since_last_vibration_detection`,

  /**
   * Returns the current time stamp of the level
   */
  time_stamp: `query.time_stamp`,

  /**
   * Returns the total number of active emitters in the world.
   */
  total_emitter_count: `query.total_emitter_count`,

  /**
   * Returns the total number of active particles in the world.
   */
  total_particle_count: `query.total_particle_count`,

  /**
   * Returns the trade tier of the entity if it makes sense, else it returns 0.0
   */
  trade_tier: `query.trade_tier`,

  /**
   * Returns how unhappy the entity is.
   */
  unhappy_counter: `query.unhappy_counter`,

  /**
   * Returns the entity's variant index
   */
  variant: `query.variant`,

  /**
   * Returns the speed of the entity up or down in meters/second, where positive is up.
   */
  vertical_speed: `query.vertical_speed`,

  /**
   * Returns the walk distance of the entity.
   */
  walk_distance: `query.walk_distance`,

  /**
   * Returns the wing flap position of the entity, or 0.0 if this doesn't make sense.
   */
  wing_flap_position: `query.wing_flap_position`,

  /**
   * Returns the wing flap speed of the entity, or 0.0 if this doesn't make sense.
   */
  wing_flap_speed: `query.wing_flap_speed`,

  /**
   * Returns the entity's yaw speed
   */
  yaw_speed: `query.yaw_speed`,
});

export type SlotName =
  | `slot.weapon.mainhand`
  | `slot.weapon.offhand`
  | `slot.armor.head`
  | `slot.armor.chest`
  | `slot.armor.legs`
  | `slot.armor.feet`
  | `slot.armor` // Horse armor
  | `slot.saddle`
  | `slot.hotbar`
  | `slot.inventory`
  | `slot.enderchest`;

const join = (...params: unknown[]) =>
  params.map((
    p,
  ) => (typeof p === "string" && p.indexOf(`query.`) === -1 ? `'${p}'` : p))
    .join(`,`);
