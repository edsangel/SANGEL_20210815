const client = require("../persistence/database");

const Error = require("../error/error");
const { ERROR_CODE, ERROR_NAME  } = require("../error/error.const");

exports.getCategories = function(req, res) {
  client.query(
    "SELECT * FROM category",
    [],
    (error, results) => {
      if (error) throw error;
      res.json(results.rows);
    }
  );
}

exports.createCategory = function(req, res) {
  if (req.body) {
    req.body.forEach((category) => {
      client.query(
        "SELECT name FROM category WHERE name IN ($1)",
        [category],
        (error, results) => {
          if (error) throw error;
          if (results.rowCount === 0) {
            client.query(
              "INSERT INTO category (name) VALUES ($1)",
              [category],
              (error, results) => {
                if (error) throw error;
              }
            );
          }
        }
      );
    });

    res.status(201).json(req.body);
  } else {
    const error = new Error(
      ERROR_CODE.INVALID_REQUEST,
      ERROR_NAME.INVALID_REQUEST,
      "Categories must be provided"
    );
    res.status(400).json({ error: error });
  }
}
