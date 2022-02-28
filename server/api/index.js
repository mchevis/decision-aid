const router = require("express").Router();
module.exports = router;

router.use("/projects", require("./projects"));
router.use("/products", require("./products"));
router.use("/attributes", require("./attributes"));
router.use("/productAttributes", require("./productAttributes"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
