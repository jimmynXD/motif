module.exports = {
  extends: ["eslint:recommended", "prettier", "turbo"],
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      extends: ["plugin:@typescript-eslint/recommended"],
      rules: {},
      parserOptions: {
        project: "tsconfig.json",
      },
    },
    {
      files: ["*.js", "*.jsx"],
      parser: "@babel/eslint-parser",
      rules: {},
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          babelrc: false,
          configFile: false,
          // your babel options
          presets: ["@babel/preset-env"],
        },
      },
    },
  ],
}

/* module.exports = config */
