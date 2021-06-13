import * as express from "express";
const videosController = require('../controllers/videosController');

const router = express.Router();

router.get('/', videosController.allVideos);
router.post('/add', videosController.addVideo);
router.get('/:uuid', videosController.findVideos);

module.exports = router;