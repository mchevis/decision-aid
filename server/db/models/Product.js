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
    type: TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
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
