import { Project } from "../../core/Project.ts";
import { AddonFile } from "../AddonFile.ts";

export class Animations extends AddonFile {
  #data: AnimationsSchema;
  /**
   * @param fileName File name without extension
   */
  constructor(fileName: string) {
    super(fileName);
    this.#data = {
      format_version: "1.10.0",
      animations: {},
    };

    Project.onSave(({ writeBP }) => {
      writeBP(`animations/${this.fileName}.json`, this.#data);
    });
  }

  /**
   * @param id The id of the animation, without the `animation.` prefix
   */
  add(id: string, animation?: Animation) {
    animation ??= {
      timeline: {},
    };
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

export interface AnimationsSchema {
  format_version: string;
  animations: Record<string, Animation>;
}

export interface Animation {
  anim_time_update?: string | number;
  animation_length?: number;
  loop?: boolean;
  loop_delay?: string | number;
  start_delay?: string | number;
  timeline: Record<number, string[]>;
}
