const db = require("../db");
const { STRING, DECIMAL, TEXT, BOOLEAN } = db.Sequelize.DataTypes;

const Product = db.define("product", {
  source: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  url: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isURL: true,
    },
  },
  userRating: {
    type: DECIMAL,
  },
  userNotes: {
    type: TEXT,
  },
  isFinalSelection: {
    type: BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Product;
