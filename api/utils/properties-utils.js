const propertiesReader = require("properties-reader");
const file = require("../environments/environments");
const properties = propertiesReader(file);

module.exports = properties;
