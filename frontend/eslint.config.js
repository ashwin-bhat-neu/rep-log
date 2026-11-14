import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

export default defineConfig([
  globalIgnores(["dist/"]),
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx}"],
    extends: [
      react.configs.flat.recommended,
      react.configs.flat["jsx-runtime"],
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    settings: { react: { version: "detect" } },
    rules: {
      eqeqeq: "error",
      "no-var": "error",
      "prefer-const": "error",
      "react/prop-types": "error",
    },
  },
  {
    files: ["*.config.js"],
    languageOptions: { globals: globals.node },
  },
]);
