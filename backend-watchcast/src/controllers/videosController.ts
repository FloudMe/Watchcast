import { Request, Response } from "express";
import { getConnection, getManager, getRepository } from "typeorm";
import { Comments } from "../entity/comments";
import { User } from "../entity/user";
import { UserDetails } from "../entity/user-details";
import { Videos } from "../entity/videos";

const allVideos = async (req: Request, res: Response) => {

    try {
        const videos = await Videos.find();

        return res.json({ videos: videos });
    }
    catch (err) {
        console.error(err)
        return res.status(404).json({ video: 'Videos' });
    }
}

const findVideos = async (req: Request, res: Response) => {
    try {
        const videoUuid = req.params.uuid
        const video = await Videos.findOneOrFail({ where: { uuid: videoUuid } });
        const _comments = await comments(videoUuid);
        const _anotherVideos = await anotherVideos(videoUuid);

        return res.json({ video: video, comments:_comments, anotherVideos: _anotherVideos });
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

        return res.status(200);
    }
    catch (err) {
        console.error(err)
        return res.status(404).json({ video: 'add' });
    }
}

const addComment = async (req: Request, res: Response) => {
    try {
        const { video, description } = req.body;
        const uuid = req.body.data.id;

        const video2 = await Videos.findOne({ where: { uuid: video } })
        const userDetails = await findDetails(uuid);

        const comment = Comments.create({ description })
        comment.video = video2;
        comment.user = userDetails;

        await comment.save()

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
    addComment
}

async function comments(videoId) {
    const video = await Videos.findOne({ where: { uuid: videoId } })

    const comments = await getRepository(Comments)
        .createQueryBuilder('comments')
        .leftJoinAndSelect('comments.user', 'user_details')
        .select([
            'comments.uuid',
            'comments.description',
            'comments.created_at',
            'user_details.first_name'])
        .where('comments.video = :id', { id: video.id })
        .getMany()

    return comments;
}

async function anotherVideos(videoId) {
    const videos = await Videos.find();
    const videosNewTable = videos.filter((element) => {
        return element.uuid !== videoId;
    })

    return videosNewTable;
}

async function findDetails(uuid: any) {
    const user = await User.findOneOrFail({ uuid });
    const userDetails = await UserDetails.findOneOrFail({ user });
    return userDetails;
}