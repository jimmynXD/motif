const config = {
  "*.{js,ts,tsx}": ["eslint --quiet --fix"],
  "*.{ts,tsx,md,mdx,js,jsx,mjs,yml,yaml,css}": ["prettier --write"],
}

module.exports = config
