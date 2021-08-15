const path = require("path");
const fs = require("fs");

const propertiesReader = require("properties-reader");
const file = require("../environments/environments");
const properties = propertiesReader(file);

const client = require("../persistence/database");

const streamVideo = (req, res) => {
  client.query(
    "SELECT path FROM videos WHERE id = $1",
    [req.params.id],
    (error, results) => {
      if (error) throw error;

      const row = results.rows[0];
      const videopath = row.path;
      const filepath = path.resolve(videopath);
      const fileSize = fs.statSync(filepath).size;
      const range = req.headers.range;

      if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunkSize = end - start + 1;
        const videoFile = fs.createReadStream(filepath, { start, end });
        const head = {
          "Content-Range": `bytes ${start}-${end}/${fileSize}`,
          "Accept-Ranges": "bytes",
          "Content-Length": chunkSize,
          "Content-Type": "video/mp4",
        };
        res.writeHead(206, head);
        videoFile.pipe(res);
      } else {
        const head = {
          "Content-Length": fileSize,
          "Content-Type": "video/mp4",
        };
        res.writeHead(200, head);
        fs.createReadStream(filepath).pipe(res);
      }
    }
  );
};

module.exports = streamVideo;
