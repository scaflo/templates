import importPlugin from "eslint-plugin-import";
import prettier from "eslint-plugin-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default [
  {
    files: ["**/*.js", "**/*.jsx"],
    plugins: {
      prettier,
      import: importPlugin,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "no-console": "warn",
      quotes: ["error", "double"],
      "simple-import-sort/imports": "warn",
      "simple-import-sort/exports": "warn",
    },
  },
];
