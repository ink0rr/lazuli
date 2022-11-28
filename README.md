# Lazuli

## What is Lazuli?

Lazuli is a deno library to help you generate Minecraft Bedrock addon files using TypeScript.

This library is aimed to work inside [regolith] filters, but it can also be used as a standalone library.

## Status

**EXPERIMENTAL**

I'm still not sure how things are implemented and named, so a lot of stuff are likely to change.

## Usage

### In Regolith

Install the filter

```
regolith install github.com/ink0rr/regolith-filters/lazuli
```

The filter will look for `.ts` files in the `./packs/data/lazuli/export/` folder and get the default export.

```ts
import { createEntity } from "https://deno.land/x/lazuli/mod.ts";

const myEntity = createEntity({
  identifier: "lazuli:my_entity",
  behavior(bp) {
    bp.components = {
      "minecraft:health": {
        value: 20,
        max: 20,
      },
    };
  },
  resource(rp) {
    rp.textures = {
      default: "textures/blank",
    };
  },
});

export default myEntity;
```

This will create `my_entity.json` file inside your bp and rp folder. It also adds `entity.lazuli:my_entity.name=My Entity` in the `en_US.lang` file.

The `createEntity` function provides some default values in your RP file based on the identifier you provided, so you don't have to fill in every properties.

You can also default export an array.

```ts
import { createEntity, createBlock } from "https://deno.land/x/lazuli/mod.ts";

const myEntity = createEntity({
  identifier: "lazuli:my_entity",
  behavior(bp) {
    bp.components = {
      "minecraft:health": {
        value: 20,
        max: 20,
      },
    };
  },
});

const myBlock = createBlock({
  identifier: "lazuli:my_block",
  behavior(bp) {
    bp.components = {
      "minecraft:flammable": {},
    };
  },
});

export default [myEntity, myBlock];
```

### Standalone

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
  },
});

lazuli([myEntity]);
```

Lazuli will try to detect the project paths in your current working directory.

First, it'll look for a `config.json` file (see: [project-config-standard]) containing the paths to BP and RP folders. If it doesn't find it, it'll look for folders ending in `BP` and `RP` (case insensitive) in the current working directory. If there's none, it'll throw an error.

## Contributing

Contributions are welcome, please open an issue or a PR if you have any ideas or found a bug.

## Credits

- [Blockception](https://github.com/Blockception/Minecraft-bedrock-json-schemas) for providing bedrock json schemas.

## License

MIT

<!-- Links -->

[regolith]: https://bedrock-oss.github.io/regolith/
[project-config-standard]: https://github.com/Bedrock-OSS/project-config-standard
