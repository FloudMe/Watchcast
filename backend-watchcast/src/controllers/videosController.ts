import { Request, Response } from "express";
import { Comments } from "../entity/comments";
import { UserDetails } from "../entity/user-details";
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

        res.status(200);
    }
    catch (err) {
        console.error(err)
        return res.status(404).json({ video: 'add' });
    }
}

const getComments = async(req: Request, res: Response) => {
    try {
        const videoId = req.params.uuid;
        console.log(videoId);
        const video = await Videos.findOne({where: {uuid: videoId}})

        const comments = await Comments.find({where: {video: video}})
        // comments.map(comment => {
        //     console.log(comment.user)
        // })
        // TODO RES USER ID
        res.status(200).json(comments)
        
    }
    catch (err) {
        console.error(err)
        return res.status(404).json({ video: 'comments' });
    }
}

const addComment = async(req: Request, res: Response) => {
    try {
        const {video, description} = req.body;
        const user = req.body.data.id;

        console.log(user)

        console.log(description)
        
        const video2 = await Videos.findOne({where: {uuid: video}})
        const user2 = await UserDetails.findOne({where:{uuid:user}})

        console.log(user2)
        
        const comment = Comments.create({description})
        comment.video = video2;
        comment.user = user2;
        
        await comment.save()

        console.log("gituwa ale czy na pewno")

        return res.status(200).json(comment);
    }
    catch (err) {
        console.error(err)
        return res.status(404).json({ video: 'comments' });
    }
}

module.exports = {
    allVideos,
    findVideos,
    findVideosByCategory,
    addVideo,
    getComments,
    addComment
}