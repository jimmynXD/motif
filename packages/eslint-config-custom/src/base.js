const config = {
  extends: ["eslint:recommended", "turbo", "prettier"],
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
          presets: [require.resolve("@babel/preset-env")],
        },
      },
    },
  ],
}

module.exports = config
