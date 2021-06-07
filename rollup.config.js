import { defineConfig } from "rollup";

export default defineConfig({
    input: "./src/index.js",
    output: {
      file: `./dist/index.js`,
    }
});
