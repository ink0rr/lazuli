import { Project } from "../../core/Project.ts";
import { AddonFile } from "../AddonFile.ts";
import { StringOrRecord } from "../common/StringOrRecord.ts";

export class ClientAnimationControllers extends AddonFile {
  #data: ClientAnimationControllersSchema;
  constructor(fileName: string) {
    super(fileName);
    this.#data = {
      format_version: "1.10.0",
      animation_controllers: {},
    };
  }

  saveTo(project: Project) {
    project.onSave(({ writeRP }) => {
      writeRP(`animation_controllers/${this.fileName}.json`, this.#data);
    });
  }

  /**
   * @param id The id of the animation controller, without the `controller.animation.` prefix
   */
  add(id: string, controller?: ClientAnimationController) {
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

export interface ClientAnimationControllersSchema {
  format_version: string;
  animation_controllers: Record<string, ClientAnimationController>;
}

export interface ClientAnimationController {
  initial_state?: string;
  states: Record<string, ClientAnimationControllerState>;
}

export interface ClientAnimationControllerState {
  animations?: StringOrRecord[];
  blend_transition?: number;
  blend_via_shortest_path?: boolean;
  on_entry?: string[];
  on_exit?: string[];
  particle_effects?: {
    bind_to_actor?: boolean;
    effect?: string;
    locator?: string;
    pre_effect_script?: string;
  }[];
  sound_effects?: {
    effect: string;
  }[];
  transitions?: Record<string, string>[];
  variables?: Record<string, {
    input?: string;
    remap_curve?: Record<string, string>;
  }>[];
}
