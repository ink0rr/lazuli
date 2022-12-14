import { ItemIdentifier } from "../../../common/ItemIdentifier.ts";

export interface RecipeItem {
  item: ItemIdentifier;
  count?: number;
  data?: number;
}
