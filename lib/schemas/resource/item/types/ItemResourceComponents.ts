export interface ItemResourceComponents {
  /**
   * The color of the item's name.
   */
  "minecraft:hover_text_color"?:
    | "aqua"
    | "black"
    | "blue"
    | "dark_aqua"
    | "dark_blue"
    | "dark_gray"
    | "dark_green"
    | "dark_purple"
    | "dark_red"
    | "gold"
    | "gray"
    | "green"
    | "light_purple"
    | "minecoin_gold"
    | "red"
    | "white"
    | "yellow";
  /**
   * The icon item componenent determines the icon to represent the item in the UI and elsewhere.
   */
  "minecraft:icon"?: string;
  /**
   * Render offset.
   */
  "minecraft:render_offsets"?: string;
  /**
   * The animation to use when this item is being used, e.g when the item is being eaten.
   */
  "minecraft:use_animation"?: "drink" | "eat" | "none";
}
