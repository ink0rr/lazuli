export interface Animation {
  format_version: "1.10.0";
  animations: Record<string, AnimationItem>;
}

export interface AnimationItem {
  loop?: boolean;
  loop_delay?: string | number;
  start_delay?: string | number;
  animation_length?: number;
  timeline: Record<number, string[]>;
}
