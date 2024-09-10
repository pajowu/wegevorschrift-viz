import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintPluginSvelte from "eslint-plugin-svelte";
import tsESLintParser from "@typescript-eslint/parser";

export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },

  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginSvelte.configs["flat/recommended"],
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parserOptions: {
        parser: tsESLintParser,
        extraFileExtensions: [".svelte"],
      },
    },
  },
  eslintPluginPrettierRecommended,
];
