const configVercel = require('@vercel/style-guide/prettier');

/** @type {import("prettier").Config} */
module.exports = {
  ...configVercel,
  plugins: [...configVercel.plugins],
};