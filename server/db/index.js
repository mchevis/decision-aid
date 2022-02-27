const db = require("./db");
const Project = require("./models/Project");

//model associations

module.exports = {
  db,
  models: {
    Project,
  },
};
