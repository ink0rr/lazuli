# Lazuli

Lazuli is a deno library that helps you write Minecraft Bedrock addon files using TypeScript.

## Status

**EXPERIMENTAL**

I'm still not sure how things are implemented and named, so a lot of stuff are likely to change.

## Usage

### Example 1

```ts
import { Entity, Project } from "https://deno.land/x/lazuli/mod.ts";

// Creates a new project instance.
const project = new Project();

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

// Add the entity to project.
entity.saveTo(project);

// Save changes and write to disk.
await project.save();
```

### Example 2

```ts
import { Entity, lazuli } from "https://deno.land/x/lazuli/mod.ts";

// Automatically creates a project and saves it.
await lazuli(() => {
  // Creates a new entity, it will be automatically added to the project.
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
});
```

## Usage In Regolith

Create a filter definition in your `config.json`.

```json
{
  "lazuli": {
    "runWith": "deno",
    "script": "./data/lazuli/main.ts"
  }
}
```

Then create a file at `./data/lazuli/main.ts`.

```ts
import { Entity, lazuli } from "https://deno.land/x/lazuli/mod.ts";

await lazuli(() => {
  // Do stuff here.
});
```

## Credits

- [Blockception] for bedrock json schemas.

## License

MIT

<!-- Links -->

[blockception]: https://github.com/Blockception/Minecraft-bedrock-json-schemas
