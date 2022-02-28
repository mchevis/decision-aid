const router = require("express").Router();
const {
  models: { ProductAttribute },
} = require("../db");
module.exports = router;

// GET /api/productAttributes
router.get("/", async (req, res, next) => {
  try {
    const productAttributes = await ProductAttribute.findAll({ order: ["id"] });
    res.json(productAttributes);
  } catch (err) {
    next(err);
  }
});

// GET /api/productAttributes/:id
router.get("/:id", async (req, res, next) => {
  try {
    const productAttributes = await ProductAttribute.findByPk(req.params.id);
    res.json(productAttributes);
  } catch (err) {
    next(err);
  }
});
