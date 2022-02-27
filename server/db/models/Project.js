const db = require("../db");
const { STRING, ENUM } = db.Sequelize.DataTypes;

const Project = db.define("project", {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  type: {
    type: ENUM("product", "trip"),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  status: {
    type: ENUM("analyzing", "archived", "completed"),
    defaultValue: "analyzing",
  },
});

module.exports = Project;
