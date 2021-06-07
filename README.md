# repro-rollup-defineConfig-undefined

minimal reproduction of the following error.

```
[!] TypeError: rollup.defineConfig is not a function
```

## Summary
`rollup -c` failed when rollup.config.js using `rollup.defineConfig`, because `rollup.defineConfig` is not defined at runtime.

FYI: `rollup.defineConfig` is added in v2.51.0.

- release: https://github.com/rollup/rollup/releases/tag/v2.51.0
- pull request: https://github.com/rollup/rollup/pull/4127
- document: [01-command-line-reference.md#config-intellisense](https://github.com/rollup/rollup/blob/master/docs/01-command-line-reference.md#config-intellisense) 

## Reproduction

```shell
$ git clone https://github.com/tasshi-playground/repro-rollup-defineConfig-undefined.git
$ cd repro-rollup-defineConfig-undefined
$ npm install
$ npm run build # equal to "rollup -c"
```

Then, error occur.

### Expected Behavior

`rollup -c` success with rollup.config.js using `rollup.defineConfig`.

### Actual Behavior

`rollup -c` failed with following error.

```
[!] TypeError: rollup.defineConfig is not a function
TypeError: rollup.defineConfig is not a function
    at Object.<anonymous> (<project_dir>/rollup.config.js:7:28)
    at Module._compile (internal/modules/cjs/loader.js:1068:30)
    at Object.require.extensions.<computed> [as .js] (<project_dir>/node_modules/rollup/dist/shared/loadConfigFile.js:530:20)
    at Module.load (internal/modules/cjs/loader.js:933:32)
    at Function.Module._load (internal/modules/cjs/loader.js:774:14)
    at Module.require (internal/modules/cjs/loader.js:957:19)
    at require (internal/modules/cjs/helpers.js:88:18)
    at loadConfigFromBundledFile (<project_dir>/node_modules/rollup/dist/shared/loadConfigFile.js:538:42)
    at getDefaultFromTranspiledConfigFile (<project_dir>/node_modules/rollup/dist/shared/loadConfigFile.js:522:12)
    at async loadConfigFile (<project_dir>/rollup/dist/shared/loadConfigFile.js:487:15)
```

## Cause

`rollup.defineConfig` is defined in type definition but does not exist at runtime.

- [type definition (dist/rollup.d.ts)](https://github.com/rollup/rollup/blob/master/package.json#L7) contains [`defineConfig`](https://github.com/rollup/rollup/blob/master/src/rollup/types.d.ts#L887)
  - this file is copied from [src/rollup/types.d.ts](https://github.com/rollup/rollup/blob/master/src/rollup/types.d.ts) in build process
    - > `shx cp src/rollup/types.d.ts dist/rollup.d.ts`
- [node entrypoint (src/node-entry.ts)](https://github.com/rollup/rollup/blob/master/src/node-entry.ts) does not export `defineConfig`

with Node.js REPL, rollup module does not contain `defineConfig`.

```
Welcome to Node.js v14.17.0.
Type ".help" for more information.
> require("rollup")
{
  VERSION: '2.51.0',
  rollup: [Function: rollup],
  watch: [Function: watch]
}
```

## Lisence

This project is licensed under the [MIT license.](./LICENSE)
