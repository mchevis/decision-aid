const router = require("express").Router();
const {
  models: { Project },
} = require("../db");
module.exports = router;

// GET /api/projects
router.get("/", async (req, res, next) => {
  try {
    const projects = await Project.findAll({
      order: ["id"],
    });
    res.json(projects);
  } catch (err) {
    next(err);
  }
});

// GET /api/projects/:id
router.get("/:id", async (req, res, next) => {
  try {
    const projects = await Project.findOne({
      where: { id: req.params.id },
      include: ["products"],
    });
    res.json(projects);
  } catch (err) {
    next(err);
  }
});
