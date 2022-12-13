export type Property = {
  client_sync?: boolean;
  type: "enum";
  default?: string;
  values?: string[];
} | {
  client_sync?: boolean;
  type: "bool";
  default?: boolean;
} | {
  client_sync?: boolean;
  type: "float";
  default?: number;
  range?: [number, number];
} | {
  client_sync?: boolean;
  type: "int";
  default?: number;
  range?: [number, number];
};
