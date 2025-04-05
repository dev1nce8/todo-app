import globals from "globals";
import jest from "eslint-plugin-jest";
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
  {
    files: ["**/*.test.js"],
    plugins: {
      jest,
    },
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      ...jest.configs.recommended.rules,
    },
  },
  globalIgnores(["webpack.*.js", "dist/"]),
  pluginJs.configs.recommended,
]);
