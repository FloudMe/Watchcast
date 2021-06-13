import * as express from "express";
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', userController.userIndex);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.put('/update/:uuid', userController.updateUser);
router.put('changePass/:uuid', userController.changePass);
router.delete('/:uuid', userController.remove);
router.get('/:uuid', userController.findUser);

module.exports = router;