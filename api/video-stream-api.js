const Error = require("./error/error");
const { ERROR_CODE, ERROR_NAME } = require("./error/error.const");

const path = require("path");
const propertiesReader = require("properties-reader");
const file = require("./environments/environments");
const properties = propertiesReader(file);

const express = require("express");
const routes = require("./routes/");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", routes);

app.use("*", (req, res) => {
  const error = new Error(
    ERROR_CODE.RESOURCE_NOT_FOUND,
    ERROR_NAME.RESOURCE_ERROR,
    "The resource that you're trying to request does not exist."
  );
  res.status(404).json({ error: error });
});

app.listen(properties.get("main.app.port"), () => {
  console.log("Listening on port", properties.get("main.app.port"));
});
