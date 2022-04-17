const router = require('express').Router();
const estcostCtrl = require('../../controllers/manufacturing/estcost.controller.js');

/* GET */
router.get('/index', estcostCtrl.index);
router.get('/view/:id', estcostCtrl.view);

/* POST */
router.post('/create', estcostCtrl.create);

/* DELETE */
router.delete('/delete/:id', estcostCtrl.delete);

module.exports = router;