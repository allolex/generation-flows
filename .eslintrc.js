const { builtinModules } = require("module");

const ALLOWED_NODE_BUILTINS = new Set(["assert"]);

module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  plugins: ["@typescript-eslint", "@stylistic/ts", "deprecation"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  rules: {
    // Security
    // Make sure we always await Activities and Workflow APIs
    "@typescript-eslint/no-floating-promises": "error",
    "deprecation/deprecation": "warn",

    // Style
    "comma-dangle": ["error", "always-multiline"],
    "indent": ["error", 2],
    "object-curly-spacing": ["error", "never"],
    "object-shorthand": ["error", "always"],
    "quotes": ["error", "double"],
    "semi": ["error", "never"],

    // Support for "private" variables, leading with "-"
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    // This can get annoying at times.
    "@typescript-eslint/no-explicit-any": "off",
  },
  overrides: [
    {
      files: ["src/workflows.ts", "src/workflows-*.ts", "src/workflows/*.ts"],
      rules: {
        // Temporal.io support
        "no-restricted-imports": [
          "error",
          ...builtinModules.filter((m) => !ALLOWED_NODE_BUILTINS.has(m)).flatMap((m) => [m, `node:${m}`]),
        ],
      },
    },
  ],
};
