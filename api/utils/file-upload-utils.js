const Error = require("../error/error");
const { ERROR_CODE, ERROR_NAME } = require("../error/error.const");

const path = require("path");
const multer = require("multer");
const properties = require("./properties-utils");

const fileDestination = properties.get("file.upload.path");

function filename(req, file, callback) {
  callback(
    null,
    `${Date.now()}_${file.fieldname}${path.extname(file.originalname)}`
  );
}

const fileStorage = multer.diskStorage({
  filename: filename,
  destination: fileDestination,
});

const limits = {
  fileSize: parseInt(properties.get("file.upload.size")),
};

function fileFilter(req, file, callback) {
  if (!req.body) {
    const error = new Error(
      ERROR_CODE.INVALID_REQUEST,
      ERROR_NAME.REQUEST_ERROR,
      "Request body is required."
    );
    return callback(error, false);
  }

  if (req.body) {
    const allowedFormats = new RegExp(
      properties.get("file.upload.format"),
      "g"
    );
    if (!file.originalname.match(allowedFormats)) {
      const error = new Error(
        ERROR_CODE.INVALID_FILE_FORMAT,
        ERROR_NAME.REQUEST_ERROR,
        "Only MP4 and MOV file formats are allowed."
      );
      return callback(error, false);
    }

    if (!req.body.title) {
      const error = new Error(
        ERROR_CODE.INVALID_REQUEST,
        ERROR_NAME.REQUEST_ERROR,
        "Title is required."
      );
      return callback(error, false);
    }

    if (!req.body.category) {
      const error = new Error(
        ERROR_CODE.INVALID_REQUEST,
        ERROR_NAME.REQUEST_ERROR,
        "Category is required."
      );
      return callback(error, false);
    }
  }

  callback(undefined, true);
}

const fileUploadOptions = {
  storage: fileStorage,
  limits: limits,
  fileFilter: fileFilter,
};

module.exports = fileUploadOptions;
