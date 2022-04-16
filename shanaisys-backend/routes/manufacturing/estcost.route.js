const router = require('express').Router();
const estcostCtrl = require('../../controllers/manufacturing/estcost.controller.js');

/* GET */
router.get('/view', estcostCtrl.view);

/* POST */
router.post('/create', estcostCtrl.create);

module.exports = router;