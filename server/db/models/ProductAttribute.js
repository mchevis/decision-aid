const db = require("../db");
const { STRING } = db.Sequelize.DataTypes;

const ProductAttribute = db.define("productAttribute", {
  value: {
    type: STRING,
  },
});

module.exports = ProductAttribute;
