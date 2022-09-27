const { aliasDangerous } = require("react-app-rewire-alias/lib/aliasDangerous");

const aliasMap = {
  "@core": "../../../core",
  "@domain": "../../../domain",
  "@infrastructure": "../../../infrastructure",
  "@mocks": "../../../mocks",
};

module.exports = aliasDangerous(aliasMap);
