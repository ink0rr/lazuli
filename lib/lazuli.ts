import { AddonFile } from "./core/AddonFile.ts";
import { Project } from "./core/Project.ts";

type List<T> = Array<T | T[]>;

export async function lazuli(files: List<AddonFile>) {
  const project = new Project();
  await project.load();

  for (const file of files.flat()) {
    file.write(project);
  }

  await project.sync();
}
