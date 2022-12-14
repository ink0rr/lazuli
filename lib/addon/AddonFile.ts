import { Project } from "../core/Project.ts";
import { writeJson } from "../fs/json.ts";

/**
 * The base class for all addon files. See {@link BehaviorFile} or {@link ResourceFile} for implementation details.
 */
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

  /**
   * Writes the file to the project.
   *
   * Takes a {@link Project} object as a parameter to get BP/RP paths and do some mutations.
   */
  abstract write(project: Project): Promise<void>;
}

export abstract class BehaviorFile<T, U = undefined> extends AddonFile<T, U> {
  write(project: Project) {
    const { BP } = project.paths;
    const { dir, filePath, data } = this;
    return writeJson(`${BP}/${dir}/${filePath}.json`, data);
  }
}

export abstract class ResourceFile<T, U = undefined> extends AddonFile<T, U> {
  write(project: Project) {
    const { RP } = project.paths;
    const { dir, filePath, data } = this;
    return writeJson(`${RP}/${dir}/${filePath}.json`, data);
  }
}
