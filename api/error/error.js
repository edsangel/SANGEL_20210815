const { ERROR_CODE, ERROR_NAME } = require("./error.const");

function Error(code, name, message) {
  this.code = code || ERROR_CODE.BAD_REQUEST;
  this.name = name || ERROR_NAME.REQUEST_ERROR;
  this.message = message || null;
}

Error.prototype.getCode = () => this.code;
Error.prototype.getName = () => this.name;
Error.prototype.getMessage = () => this.message;

module.exports = Error;
