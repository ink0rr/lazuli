import { Schema } from "../../schemas/mod.ts";
import { BehaviorFile } from "../AddonFile.ts";

export class Animation extends BehaviorFile<Schema.Animation> {
  dir = "animations";
}
