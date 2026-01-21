module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "google",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json", "tsconfig.dev.json"],
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  ignorePatterns: [
    "/lib/**/*", // Ignore built files.
    "/generated/**/*", // Ignore generated files.
  ],
  plugins: [
    "@typescript-eslint",
    "import",
  ],
  rules: {
    "no-restricted-globals": ["error", "name", "length"],
    "prefer-arrow-callback": "error",
    quotes: ["error", "double", {allowTemplateLiterals: true}],
    "no-tabs": "off",
    indent: "off",
    "comma-dangle": "off",
    "max-len": "off",
    "no-unused-vars": "off",
    "no-async-promise-executor": "off",
    "no-await-in-loop": "off",
    "spaced-comment": "off",
    semi: "off",
    "object-curly-spacing": "off",
    "space-before-function-paren": "off",
    "eol-last": "off",
    "linebreak-style": "off",
    "require-jsdoc": "off",
    "valid-jsdoc": "off",
    "no-prototype-builtins": "off",
    "no-trailing-spaces": "off",
    "quote-props": ["error", "as-needed"],
    "operator-linebreak": ["error", "before"],
    "@typescript-eslint/no-explicit-any": "off",
    "import/no-unresolved": "off"
  },
};
