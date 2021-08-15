const Error = require("../error/error");

const fs = require("fs");
const path = require("path");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);

const properties = require("../utils/properties-utils");
const client = require("../persistence/database");

function takeScreenshot(file, id, sizes, timemarks) {
  sizes.forEach((size) => {
    const filename = `${id}_thumbnail_${size}.png`;
    const folder = path.resolve(properties.get("file.screenshot.path"));

    if (!fs.existsSync(folder)){
      fs.mkdirSync(folder);
    }

    ffmpeg(file)
      .on("error", (err) => {
        const error = new Error(err.code, err.name, err.message);
        throw error;
      })
      .on("end", () => {
        const image = fs.readFileSync(path.resolve(folder, filename), { encoding: 'base64' });
        client.query(
          "INSERT INTO thumbnails (videoid, size, file) VALUES ($1, $2, $3)",
          [id, size, image],
          (err, results) => {
            if (err) throw err;
          }
        );
      })
      .screenshot({
        filename: filename,
        folder: folder,
        size: size,
        timemarks: timemarks && timemarks.length > 0 ? timemarks : ["1"],
      });
  });
}

module.exports = takeScreenshot;
