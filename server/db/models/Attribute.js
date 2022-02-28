const db = require("../db");
const { STRING, BOOLEAN, ENUM, INTEGER } = db.Sequelize.DataTypes;

const Attribute = db.define("attribute", {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  criteriaType: {
    type: ENUM("boolean", "minMax", "informational"),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  criteriaValue: {
    type: STRING,
  },
  priority: {
    type: INTEGER,
  },
  isRequired: {
    type: BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Attribute;
