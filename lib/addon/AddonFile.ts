import { Project } from "../core/Project.ts";
import { writeJson } from "../fs/json.ts";

interface AddonFileProps {
  pack: "BP" | "RP";
  dir: string;
  filePath: string;
  data: unknown;
  preWrite?(project: Project): void;
}

export class AddonFile {
  constructor(public props: AddonFileProps) {}

  /**
   * Writes the file to the project.
   *
   * Takes a {@link Project} object as a parameter to get BP/RP paths and do some mutations.
   */
  write(project: Project) {
    const { pack, dir, filePath, data, preWrite } = this.props;
    preWrite?.(project);

    const packDir = project.paths[pack];
    return writeJson(`${packDir}/${dir}/${filePath}.json`, data);
  }
}
