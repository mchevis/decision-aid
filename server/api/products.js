const router = require("express").Router();
const {
  models: { Product },
} = require("../db");
module.exports = router;

// GET /api/products
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll({ order: ["id"] });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// GET /api/products/:id
router.get("/:id", async (req, res, next) => {
  try {
    const products = await Product.findByPk(req.params.id);
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// GET /api/products/project/:id
router.get("/project/:id", async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: { projectId: req.params.id },
      order: ["id"],
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
});
