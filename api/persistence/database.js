const { Client } = require("pg");
const client = new Client({
  host: "localhost",
  user: "vstreamer",
  database: "api",
  password: "password",
  port: 5432,
});

const retries = 5;
while (retries) {
  try {
    client.connect();
    break;
  } catch(e) {
    console.log(e);
    retries--;
    console.log(`Retries left: ${retries}`)
    new Promise(res => setTimeout(res, 5000));
  }
}

module.exports = client;
