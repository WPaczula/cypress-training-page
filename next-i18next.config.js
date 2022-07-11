const path = require("path");

module.exports = {
  i18n: {
    defaultLocale: "pl",
    locales: ["en", "pl"],
    localePath: path.resolve("./public/locales"),
  },
};
