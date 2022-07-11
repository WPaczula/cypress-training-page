const path = require("path");

module.exports = {
  i18n: {
    defaultLocale: "pl",
    locales: ["pl", "en"],
    localePath: path.resolve("./public/locales"),
  },
};
