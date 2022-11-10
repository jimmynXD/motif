module.exports = {
  // next is the issue
  extends: ["./base.js", "next"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
  },
}
