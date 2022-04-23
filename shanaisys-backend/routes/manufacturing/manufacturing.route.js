const router = require("express").Router();

/* Business Information */
router.use("/businessinfo/estcost", require("./business information/estcost.route"));
router.use("/businessinfo/inquiry", require("./business information/inquiry.route"));

module.exports = router;
