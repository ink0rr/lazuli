import { JSONC } from "../../deps.ts";
import { outputFile, outputFileSync } from "./file.ts";

function stringify(obj: unknown): string {
  return JSON.stringify(obj, null, 2);
}

/**
 * Writes an object to a JSON file.
 * @param path Path to the file
 * @param data Data to write to the file
 */
export async function writeJson(path: string, data: unknown) {
  const text = stringify(data);
  await outputFile(path, text);
}

/**
 * Synchronously writes an object to a JSON file.
 * @param path Path to the file
 * @param data Data to write to the file
 */
export function writeJsonSync(path: string, data: unknown) {
  const text = stringify(data);
  outputFileSync(path, text);
}

/**
 * Reads a JSON file and then parses it into an object.
 * @param path Path to the file
 * @returns Parsed JSON object
 */
export async function readJson<T>(path: string): Promise<T> {
  const text = await Deno.readTextFile(path);
  return JSONC.parse(text) as T;
}

/**
 * Synchronously reads a JSON file and then parses it into an object.
 * @param path Path to the file
 * @returns Parsed JSON object
 */
export function readJsonSync<T>(path: string): T {
  const text = Deno.readTextFileSync(path);
  return JSONC.parse(text) as T;
}
