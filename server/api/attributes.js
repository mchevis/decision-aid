const router = require("express").Router();
const {
  models: { Attribute },
} = require("../db");
module.exports = router;

// GET /api/attributes
router.get("/", async (req, res, next) => {
  try {
    const attributes = await Attribute.findAll({
      order: ["id"],
    });
    res.json(attributes);
  } catch (err) {
    next(err);
  }
});

// GET /api/attributes/:id
router.get("/:id", async (req, res, next) => {
  try {
    const attribute = await Attribute.findByPk(req.params.id);
    res.json(attribute);
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

// PUT /api/attributes/:id
router.put("/:id", async (req, res, next) => {
  try {
    const attribute = await Attribute.findByPk(req.params.id);
    await attribute.update(req.body);
    res.sendStatus(202);
  } catch (err) {
    next(err);
  }
});

// GET /api/attributes/picklist/:fieldName
router.get("/picklist/:fieldName", async (req, res, next) => {
  try {
    const picklist = await Attribute.getAttributes()[req.params.fieldName]
      .values;
    res.json(picklist);
  } catch (err) {
    next(err);
  }
});
