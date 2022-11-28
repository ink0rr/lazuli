export type TextureFaces =
  | {
    down?: string;
    east?: string;
    north?: string;
    side?: string;
    south?: string;
    up?: string;
    west?: string;
  }
  | string;

export interface Block {
  sound?: string;
  textures: TextureFaces;
}
