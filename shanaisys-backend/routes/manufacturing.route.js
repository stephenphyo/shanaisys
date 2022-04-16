const router = require('express').Router();

router.use('/estcost', require('./manufacturing/estcost.route'));

module.exports = router;