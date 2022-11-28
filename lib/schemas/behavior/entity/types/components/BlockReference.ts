import { ItemIdentifier } from "../../../../common/ItemIdentifier.ts";

/**
 * A minecraft block reference.
 */
export type BlockReference =
  | ItemIdentifier
  | {
    name?: ItemIdentifier;
    /**
     * The key of property is the name of the block state/property, the value must be the same as the block properties accepted values.
     */
    states?: {
      [key: string]: string;
    };
  };
