import * as express from "express";
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', userController.userIndex);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.delete('/:uuid', userController.remove);
router.get('/:uuid', userController.findUser);
// router.post('/:uuid', user)

module.exports = router;