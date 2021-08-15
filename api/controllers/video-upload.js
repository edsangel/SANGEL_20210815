const Error = require("../error/error");
const { ERROR_CODE, ERROR_NAME } = require("../error/error.const");

const multer = require("multer");
const path = require("path");

const fileUploadOptions = require("../utils/file-upload-utils");
const takeScreenshot = require("../utils/file-screenshot-utils");
const client = require("../persistence/database");

function uploadVideo(req, res) {
  const upload = multer(fileUploadOptions).single("video");

  upload(req, res, (error) => {
    if (error) {
      return res.status(400).send({ error: error });
    }

    if (req.file) {
      const filename = req.file.filename;
      const id = filename.split("_")[0];
      const filepath = req.file.path;
      let fileid;
      const videoRes = {
        file: {
          title: req.body.title,
          description: req.body.description,
          category: req.body.category,
          filename: req.file.originalname,
          encoding: req.file.encoding,
          mimetype: req.file.mimetype,
          size: req.file.size,
        },
      };

      client.query(
        "INSERT INTO videos (fileid, filename, path, metadata) VALUES ($1, $2, $3, $4)",
        [id, filename, filepath, videoRes],
        (error, results) => {
          if (error) throw error;
        }
      );

      client.query(
        "SELECT id FROM videos WHERE fileid = $1",
        [id],
        (error, results) => {
          if (error) throw error;
          fileid = results.rows[0].id;

          const sizes = ["64x64", "128x128", "256x256"];
          takeScreenshot(path.resolve(req.file.path), id, sizes);

          videoRes['file'].fileid = fileid;
          res.status(200).json(videoRes);
        }
      );
    } else {
      const error = new Error(
        ERROR_CODE.INVALID_REQUEST,
        ERROR_NAME.INVALID_REQUEST,
        "Video file is required."
      );
      res.status(400).json({ error: error });
    }
  });
}

module.exports = uploadVideo;
