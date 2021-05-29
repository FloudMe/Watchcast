import * as express from "express";
// const userController = require('../controllers/userController');
var userController = require('../controllers/userController');

const router = express.Router();

router.get('/', userController.userIndex);
router.post('/register', userController.register);
router.post('/login', userController.login);
// router.post('/:uuid', user)

module.exports = router;