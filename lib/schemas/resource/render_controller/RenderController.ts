import { Color } from "./types/Color.ts";

export interface RenderController {
  format_version: "1.8.0";
  render_controllers: Record<string, RenderControllerItem>;
}

export interface RenderControllerItem {
  arrays?: {
    geometries?: Record<string, string[]>;
    materials?: Record<string, string[]>;
    textures?: Record<string, string[]>;
  };
  color?: Color;
  filter_lighting?: boolean;
  geometry?: string;
  ignore_lighting?: boolean;
  is_hurt_color?: Color;
  light_color_multiplier?: number;
  materials?: Record<string, string>[];
  on_fire_color?: Color;
  overlay_color?: Color;
  part_visibility?: Record<string, boolean | string>[];
  textures?: string[];
  uv_anim?: {
    offset?: [number, number];
    scale?: [number, number];
  };
}
