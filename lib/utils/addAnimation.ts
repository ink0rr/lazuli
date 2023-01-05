import { StringOrRecord } from "../schemas/mod.ts";

interface DescriptionLike {
  scripts?: {
    animate?: StringOrRecord[];
  };
  animations?: Record<string, string>;
}

/**
 * Helper function to add an animation to a description object
 *
 * @param description A description object that has a scripts and animations property
 * @param name Animation name
 * @param identifier Animation identifier
 * @param condition Molang query. Set to `true` to always run
 */
export function addAnimation(
  description: DescriptionLike,
  name: string,
  identifier: string,
  condition?: string | true,
): void {
  description.scripts ??= {};
  description.scripts.animate ??= [];
  description.animations ??= {};

  description.animations[name] = identifier;

  if (!condition) return;
  if (typeof condition === "string") {
    description.scripts.animate.push({
      [name]: condition,
    });
  } else {
    description.scripts.animate.push(name);
  }
}
