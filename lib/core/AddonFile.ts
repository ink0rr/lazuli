import { writeJson } from "../fs/json.ts";
import { Project } from "./Project.ts";

export abstract class AddonFile<T = unknown, U = unknown> {
  protected abstract dir: string;
  constructor(
    protected filePath: string,
    protected data: T,
    protected props?: U,
  ) {
    if (this.constructor === AddonFile) {
      throw new Error("AddonFile is abstract and cannot be instantiated");
    }
  }

  abstract write(project: Project): void;
}

export abstract class BehaviorFile<T, U = undefined> extends AddonFile<T, U> {
  write(project: Project) {
    const { BP } = project.paths;
    const { dir, filePath, data } = this;
    writeJson(`${BP}/${dir}/${filePath}.json`, data);
  }
}

export abstract class ResourceFile<T, U = undefined> extends AddonFile<T, U> {
  write(project: Project) {
    const { RP } = project.paths;
    const { dir, filePath, data } = this;
    writeJson(`${RP}/${dir}/${filePath}.json`, data);
  }
}
