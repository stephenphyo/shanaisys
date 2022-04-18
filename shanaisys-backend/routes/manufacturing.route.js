const router = require("express").Router();

router.use("/estcost", require("./manufacturing/estcost.route"));
router.use("/inquiry", require("./manufacturing/inquiry.route"));

module.exports = router;
