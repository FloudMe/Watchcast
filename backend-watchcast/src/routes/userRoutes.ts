import * as express from "express";
const userController = require('../controllers/userController');
const auth = require('../middleware/authentication');

const router = express.Router();

router.post('/register', auth.authenticateUser, userController.register);
router.post('/login', userController.login);
router.put('/update', auth.authenticate, userController.updateUser);
router.put('changePass', auth.authenticate, userController.changePass);
router.delete('/', auth.authenticate, userController.remove);
router.get('/', auth.authenticate, userController.findUser);

module.exports = router;