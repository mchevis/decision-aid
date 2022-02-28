const db = require("./db");
const Project = require("./models/Project");
const Product = require("./models/Product");
const Attribute = require("./models/Attribute");
const ProductAttribute = require("./models/ProductAttribute");

//model associations
Product.belongsTo(Project);
Project.hasMany(Product);
Attribute.belongsTo(Project);
Project.hasMany(Attribute);
Attribute.hasMany(ProductAttribute);
ProductAttribute.belongsTo(Attribute);
Product.hasMany(ProductAttribute);
ProductAttribute.belongsTo(Product);

module.exports = {
  db,
  models: {
    Project,
    Product,
    Attribute,
    ProductAttribute,
  },
};
