export type Blocks = Record<string, BlockResource>;

export interface BlockResource {
  sound?: string;
  textures: TextureFaces;
}

export type TextureFaces = string | {
  down?: string;
  east?: string;
  north?: string;
  side?: string;
  south?: string;
  up?: string;
  west?: string;
};
