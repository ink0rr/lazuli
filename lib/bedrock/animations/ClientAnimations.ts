import { Project } from "../../core/Project.ts";
import { AddonFile } from "../AddonFile.ts";

export class ClientAnimations extends AddonFile {
  #data: ClientAnimationsSchema;
  /**
   * @param fileName File name without extension
   */
  constructor(fileName: string) {
    super(fileName);
    this.#data = {
      format_version: "1.8.0",
      animations: {},
    };
  }

  saveTo(project: Project) {
    project.onSave(({ writeRP }) => {
      writeRP(`animations/${this.fileName}.json`, this.#data);
    });
  }

  /**
   * @param id The id of the animation, without the `animation.` prefix
   */
  add(id: string, animation?: ClientAnimation) {
    animation ??= {};
    return this.#data.animations[`animation.${id}`] = animation;
  }

  /**
   * @param id The id of the animation, without the `animation.` prefix
   */
  get(id: string) {
    return this.#data.animations[`animation.${id}`];
  }

  /**
   * @param id The id of the animation, without the `animation.` prefix
   */
  delete(id: string) {
    delete this.#data.animations[`animation.${id}`];
  }
}

export interface ClientAnimationsSchema {
  format_version: string;
  animations: Record<string, ClientAnimation>;
}

export interface ClientAnimation {
  anim_time_update?: string | number;
  animation_length?: number;
  blend_weight?: number;
  bones?: Record<string, {
    rotation?: Record<number, [number, number, number]>;
  }>;
  loop?: boolean;
  loop_delay?: string | number;
  override_previous_animation?: boolean;
  particle_effects?: Record<number, {
    bind_to_actor?: boolean;
    effect?: string;
    locator?: string;
    pre_effect_script?: string;
  }>;
  sound_effects?: Record<number, {
    effect: string;
  }>;
  start_delay?: string | number;
}
