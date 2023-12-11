import { Project } from "../../core/Project.ts";
import { AddonFile } from "../AddonFile.ts";
import { StringOrRecord } from "../common/StringOrRecord.ts";

export class AnimationControllers extends AddonFile {
  #data: AnimationControllersSchema;
  constructor(fileName: string) {
    super(fileName);
    this.#data = {
      format_version: "1.10.0",
      animation_controllers: {},
    };
  }

  saveTo(project: Project) {
    project.onSave(({ writeBP }) => {
      writeBP(`animation_controllers/${this.fileName}.json`, this.#data);
    });
  }

  /**
   * @param id The id of the animation controller, without the `controller.animation.` prefix
   */
  add(id: string, controller?: AnimationController) {
    controller ??= {
      states: {},
    };
    return this.#data.animation_controllers[`controller.animation.${id}`] = controller;
  }

  /**
   * @param id The id of the animation controller, without the `controller.animation.` prefix
   */
  get(id: string) {
    return this.#data.animation_controllers[`controller.animation.${id}`];
  }

  /**
   * @param id The id of the animation controller, without the `controller.animation.` prefix
   */
  delete(id: string) {
    delete this.#data.animation_controllers[`controller.animation.${id}`];
  }
}

export interface AnimationControllersSchema {
  format_version: string;
  animation_controllers: Record<string, AnimationController>;
}

export interface AnimationController {
  initial_state?: string;
  states: Record<string, AnimationControllerState>;
}

export interface AnimationControllerState {
  animations?: StringOrRecord[];
  on_entry?: string[];
  on_exit?: string[];
  transitions?: Record<string, string>[];
}
