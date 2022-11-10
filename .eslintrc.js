module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-custom`
  extends: ["custom"],
  overrides: [
    {
      files: ["*.ts", "*.tsx", ".js"],
      settings: {
        next: {
          rootDir: ["apps/web/", "apps/docs/"],
        },
      },
    },
  ],
}
