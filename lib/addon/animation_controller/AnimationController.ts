import { Schema } from "../../schemas/mod.ts";
import { BehaviorFile } from "../AddonFile.ts";

export class AnimationController
  extends BehaviorFile<Schema.AnimationController> {
  dir = "animation_controllers";
}
