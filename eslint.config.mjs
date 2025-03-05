import globals from "globals"
import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "indent": ["error", 2],
      "semi": ["error", "never"],
      "quotes": ["error", "double"],
      "object-curly-spacing": ["error", "always"],
      "comma-dangle": ["error", "always-multiline"],
      "@typescript-eslint/consistent-type-imports": ["error"],
    },
  },
]