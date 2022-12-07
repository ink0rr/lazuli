# Lazuli

## What is Lazuli?

Lazuli is a deno library to help you generate Minecraft Bedrock addon files using TypeScript.

## Status

**EXPERIMENTAL**

I'm still not sure how things are implemented and named, so a lot of stuff are likely to change.

## How it works

Lazuli will automatically detect the project paths in your current working directory.

It'll look for a `config.json` file (see: [project-config-standard]) containing the paths to BP and RP folders. If it doesn't find it, it'll look for any folders ending in `BP` and `RP` (case insensitive) instead. The 2 folders must have identical name aside from the `BP` and `RP` suffix.

This helps you write scripts that would work on most projects without having to worry about how the project is structured.

## Usage

You can pass any class that derives from `AddonFile` to the `lazuli` function, and it'll write the file to their designated path.

```ts
import { EntityBehavior, lazuli } from "https://deno.land/x/lazuli/mod.ts";

const myEntity = new EntityBehavior("my_entity", {
  format_version: "1.16.0",
  "minecraft:entity": {
    description: {
      identifier: "lazuli:my_entity",
      is_spawnable: true,
      is_summonable: true,
      is_experimental: false,
    },
    components: {
      "minecraft:health": {
        value: 20,
        max: 20,
      },
    },
  },
});

lazuli([myEntity]);
```

You can also write into a subdirectory. This will write to `BP/entities/custom/my_entity.json`.

```ts
const myEntity = new EntityBehavior("custom/my_entity", {
  // ...
});
```

That's pretty much it. You can also use the `createEntity` function to create an entity quickly with some default values.

```ts
import { createEntity, lazuli } from "https://deno.land/x/lazuli/mod.ts";

const myEntity = createEntity({
  identifier: "lazuli:my_entity",
  behavior(bp) {
    bp.components = {
      "minecraft:health": {
        value: 20,
        max: 20,
      },
    };
    bp.component_groups = {
      despawn: {
        "minecraft:instant_despawn": {},
      },
    };
    bp.events = {
      despawn: {
        add: {
          component_groups: ["despawn"],
        },
      },
    };
  },
  resource(rp) {
    rp.textures = {
      default: "textures/blank",
    };
    rp.geometry = {
      default: "geometry/blank",
    };
  },
});

lazuli([myEntity]);
```

The `createEntity` function returns a tuple of `EntityBehavior` and `EntityResource` instances. You can destructure them or pass them as is to the `lazuli` function.

## Usage In Regolith

Install the filter:

```sh
regolith install github.com/ink0rr/regolith-filters/lazuli
```

The filter will look for any `.ts` files inside your `data/lazuli/export/` folder and get the default export.

```ts
import { createEntity } from "https://deno.land/x/lazuli/mod.ts";

const myEntity = new EntityBehavior("my_entity", {
  // ...
});

export default myEntity;
```

You can also default export an array.

```ts
import { createEntity, createBlock } from "https://deno.land/x/lazuli/mod.ts";

const myEntity = createEntity({
  identifier: "lazuli:my_entity",
  behavior(bp) {
    // ...
  },
  resource(rp) {
    // ...
  },
});

const myBlock = createBlock({
  identifier: "lazuli:my_block",
});

export default [myEntity, myBlock];
```

If you default export anything else, it'll just be ignored.

## Contributing

Contributions are welcome. There are probably a lot of questionable design decisions here, so please open an issue if you have any ideas to help improve this library.

## Credits

- [Blockception](https://github.com/Blockception/Minecraft-bedrock-json-schemas) for providing bedrock json schemas.

## License

MIT

<!-- Links -->

[project-config-standard]: https://github.com/Bedrock-OSS/project-config-standard
