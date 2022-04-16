const router = require('express').Router();
const usersCtrl = require('../controllers/users.controller.js');

/* GET */
router.get('/', usersCtrl.getUsers);

/* POST */
router.post('/signin', usersCtrl.SignIn);
router.post('/signup', usersCtrl.SignUp);

module.exports = router;