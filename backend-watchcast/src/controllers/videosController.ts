import { Request, Response } from "express";
import { Videos } from "../entity/videos";

const allVideos = async (req: Request, res: Response) => {

    try {
        const videos = await Videos.find();
        console.log(videos);
        res.json({videos: videos});
    }
    catch (err) {
        console.error(err)
        return res.status(404).json({ video: 'Videos' });
    }
}

const findVideos = async (req: Request, res: Response) => {
    try {
        const video = await Videos.findOneOrFail({ where: { uuid: req.params.uuid } });
        res.json({video: video});
    }
    catch (err) {
        console.error(err)
        return res.status(404).json({ video: 'video' });
    }
}

const findVideosByCategory = async (req: Request, res: Response) => {
    try {

    }
    catch (err) {
        console.error(err)
        return res.status(404).json({ video: 'cetegory' });
    }
}

const addVideo = async (req: Request, res: Response) => {
    try {

        const { name, description, path } = req.body;

        const video = Videos.create({ name, description, path });

        await video.save();

    }
    catch (err) {
        console.error(err)
        return res.status(404).json({ video: 'add' });
    }
}

module.exports = {
    allVideos,
    findVideos,
    findVideosByCategory,
    addVideo
}