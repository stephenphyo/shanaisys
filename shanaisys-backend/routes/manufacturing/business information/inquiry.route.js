const router = require("express").Router();
const inquiryCtrl = require("../../../controllers/manufacturing/business information/inquiry.controller.js");

/* GET */
router.get("/index", inquiryCtrl.index);
router.get("/view/:id", inquiryCtrl.view);

/* POST */
router.post("/create", inquiryCtrl.create);

/* DELETE */
router.delete("/delete/:id", inquiryCtrl.delete);

module.exports = router;
