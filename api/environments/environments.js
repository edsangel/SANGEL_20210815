process.argv.forEach(function (val) {
  const arg = val.split("=");
  if (arg.length > 0) {
    if (arg[0] === "env") {
      const env = `./environments/${arg[1]}.ini`;
      module.exports = env;
    } else {
      module.exports = `./environments/dev.ini`;
    }
  }
});
