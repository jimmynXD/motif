module.exports = {
  root: true,
  extends: ["oclif-typescript", "custom"],
  rules: {
    "node/no-missing-import": [
      "error",
      {
        tryExtensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    ],
  },
}
