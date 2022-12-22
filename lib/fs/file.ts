import { dirname } from "../../deps.ts";

export async function outputFile(path: string, text: string) {
  try {
    await Deno.writeTextFile(path, text);
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      await Deno.mkdir(dirname(path), { recursive: true });
      await Deno.writeTextFile(path, text);
    } else {
      throw error;
    }
  }
}

export function outputFileSync(path: string, text: string) {
  try {
    Deno.writeTextFileSync(path, text);
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      Deno.mkdirSync(dirname(path), { recursive: true });
      Deno.writeTextFileSync(path, text);
    } else {
      throw error;
    }
  }
}
