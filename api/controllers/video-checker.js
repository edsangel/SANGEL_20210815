const path = require("path");
const fs = require("fs");

const client = require("../persistence/database");

function videoChecker(req, res) {
  client.query(
    "SELECT * FROM videos WHERE id = $1",
    [req.params.id],
    (error, results) => {
      if (error) throw error;

      if (results.rows[0]) {
        const row = results.rows[0];
        const filepath = row.path;
        const file = path.resolve(filepath);
        if (!fs.existsSync(file)) {
          res.status(404).send({ message: "File not found" });
        } else {
          const { id, filename, metadata } = row;
          res.status(200).send({ id, filename, metadata });
        }
      } else {
        res.status(200).send({ message: "No data found" });
      }
    }
  );
}

module.exports = videoChecker;
