export interface Animation {
  format_version: "1.10.0";
  animations: Record<string, AnimationItem>;
}

export interface AnimationItem {
  loop?: boolean;
  animation_length?: number;
  timeline: Record<number, string[]>;
}
