# Lazuli

Lazuli is a deno library that helps you write Minecraft Bedrock addon files using TypeScript.

## Status

**EXPERIMENTAL**

I'm still not sure how things are implemented and named, so a lot of stuff are likely to change.

## Usage

```ts
import { Entity, Project } from "https://deno.land/x/lazuli/mod.ts";

// Load the project files such as en_US.lang, item_texture.json, terrain_texture.json, etc.
await Project.load();

// Creates a new entity, but does not write it to the disk yet.
const entity = new Entity("lazuli:entity");
entity.behavior.setComponents({
  "minecraft:type_family": {
    family: ["lazuli"],
  },
  "minecraft:health": {
    value: 20,
    max: 20,
  },
});
entity.behavior.setComponentGroups({
  "lazuli:despawn": {
    "minecraft:instant_despawn": {},
  },
});
entity.behavior.setEvents({
  "lazuli:despawn": {
    add: {
      component_groups: ["lazuli:despawn"],
    },
  },
});

entity.resource.setTextures({
  default: "textures/blank",
});
entity.resource.setGeometry({
  default: "geometry.blank",
});

// Save changes and write to disk.
await Project.save();
```

## Usage In Regolith

Create a filter definitions in your `config.json`.

```json
{
  "lazuli": {
    "runWith": "deno",
    "script": "./data/lazuli/main.ts"
  }
}
```

Then create a main file at `./data/lazuli/main.ts`.

```ts
import { Project } from "https://deno.land/x/lazuli/mod.ts";

await Project.load();

// Do stuff here.

await Project.save();
```

## Credits

- [Blockception] for bedrock json schemas.

## License

MIT

<!-- Links -->

[blockception]: https://github.com/Blockception/Minecraft-bedrock-json-schemas
