const router = require("express").Router();
const {
  models: { Attribute },
} = require("../db");
module.exports = router;

// GET /api/attributes
router.get("/", async (req, res, next) => {
  try {
    const attributes = await Attribute.findAll({ order: ["id"] });
    res.json(attributes);
  } catch (err) {
    next(err);
  }
});

// GET /api/attributes/:id
router.get("/:id", async (req, res, next) => {
  try {
    const attributes = await Attribute.findByPk(req.params.id);
    res.json(attributes);
  } catch (err) {
    next(err);
  }
});

// GET /api/attributes/project/:id
router.get("/project/:id", async (req, res, next) => {
  try {
    const attributes = await Attribute.findAll({
      where: { projectId: req.params.id },
      order: [
        ["criteriaType", "DESC"],
        ["priority", "asc"],
        ["name", "desc"],
      ],
      include: ["productAttributes"],
    });
    res.json(attributes);
  } catch (err) {
    next(err);
  }
});
