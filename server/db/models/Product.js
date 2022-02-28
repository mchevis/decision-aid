const db = require("../db");
const { STRING, DECIMAL, TEXT, BOOLEAN } = db.Sequelize.DataTypes;

const Product = db.define("product", {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  brand: {
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
  image: {
    type: STRING,
    validate: {
      isURL: true,
    },
  },
  rating: {
    type: DECIMAL,
  },
  userRating: {
    type: DECIMAL,
  },
  userNotes: {
    type: TEXT,
  },
  isSelected: {
    type: BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Product;
