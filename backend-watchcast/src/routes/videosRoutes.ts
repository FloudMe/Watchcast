import * as express from "express";
const videosController = require('../controllers/videosController');
const auth = require('../middleware/authentication');

const router = express.Router();

router.get('/', videosController.allVideos);
router.post("/", auth.authenticate, videosController.addComment);
router.put('/add', videosController.addVideo);
router.get('/comments/:uuid', videosController.getComments);
router.get('/:uuid', videosController.findVideos);


module.exports = router;