const client = require("../persistence/database");

function displayVideos(req, res) {
  const query =
    "SELECT v.id, v.metadata, t.file as thumbnail FROM videos v, thumbnails t WHERE t.videoid = v.fileid AND t.size = '256x256' ORDER BY v.id ASC";
  client.query(query, (error, results) => {
    if (error) throw error;
    res.status(200).send(results.rows);
  });
}

module.exports = displayVideos;
