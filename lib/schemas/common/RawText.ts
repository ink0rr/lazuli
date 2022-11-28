export interface RawText {
  rawtext: {
    score?: {
      name: string;
      objective: string;
    };
    selector?: string;
    text?: string;
    translate?: string;
    with?: RawText;
  }[];
}
