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
    const productAttribute = await ProductAttribute.findByPk(req.params.id);
    res.json(productAttribute);
  } catch (err) {
    next(err);
  }
});

// GET /api/productAttributes/product/:id
router.get("/product/:id", async (req, res, next) => {
  try {
    const productAttributes = await ProductAttribute.findAll({
      where: { productId: req.params.id },
      order: ["id"],
      include: ["attribute"],
    });
    res.json(productAttributes);
  } catch (err) {
    next(err);
  }
});

// PUT /api/productAttributes/:id
router.put("/:id", async (req, res, next) => {
  try {
    const productAttribute = await ProductAttribute.findByPk(req.params.id);
    await productAttribute.update(req.body);
    res.sendStatus(202);
  } catch (err) {
    next(err);
  }
});

// POST /api/productAttributes
router.post("/", async (req, res, next) => {
  try {
    const productAttribute = await ProductAttribute.create(req.body);
    res.json(productAttribute);
  } catch (err) {
    next(err);
  }
});
