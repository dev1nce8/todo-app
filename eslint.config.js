import globals from "globals";
import pluginJs from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  {
    files: ["src/**/*.js"],
    languageOptions: { globals: globals.browser },
    rules: {
      semi: ["error"],
    },
  },
  globalIgnores(["webpack.*.js", "dist/"]),
  pluginJs.configs.recommended,
]);
