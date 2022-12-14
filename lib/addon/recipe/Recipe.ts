import { Schema } from "../../schemas/mod.ts";
import { BehaviorFile } from "../AddonFile.ts";

export class Recipe extends BehaviorFile<Schema.Recipe> {
  dir = "recipes";
}
