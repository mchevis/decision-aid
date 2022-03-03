const router = require("express").Router();
const {
  models: { ProductAttribute, Product, Attribute },
} = require("../db");
module.exports = router;
const scrape = require("./scraper");

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

// POST /api/productAttributes/scrape body: {productId, source}
router.post("/scrape", async (req, res, next) => {
  try {
    console.log("REQ BODY: ", req.body);
    const product = await Product.findByPk(req.body.productId);
    console.log("PRODUCT: ", product);
    if (product.url) {
      let scrapeResult;
      if (req.body.source === "Amazon") {
        scrapeResult = await scrape(product.url);
      }
      console.log("SCRAPER RESULT: ", scrapeResult);

      if (scrapeResult) {
        attributes = (
          await Attribute.findAll({
            where: { projectId: product.projectId },
          })
        ).filter((att) =>
          Object.keys(scrapeResult).find(
            (scrAttr) => scrAttr === att.name.toLowerCase()
          )
        );

        await Promise.all(
          attributes.map((attribute) =>
            ProductAttribute.create({
              productId: req.body.productId,
              attributeId: attribute.id,
              value: scrapeResult[attribute.name.toLowerCase()],
            })
          )
        );
      }
    }
    res.sendStatus(202);
  } catch (err) {
    next(err);
  }
});
