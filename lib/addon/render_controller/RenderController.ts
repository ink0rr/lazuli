import { Schema } from "../../schemas/mod.ts";
import { ResourceFile } from "../AddonFile.ts";

export class RenderController extends ResourceFile<Schema.RenderController> {
  dir = "render_controllers";
}
