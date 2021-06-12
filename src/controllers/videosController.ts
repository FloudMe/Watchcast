import {Request, Response} from "express";
import * as bcrypt from "bcrypt";
import { validate } from "class-validator";
import { Videos } from "../entity/videos";

const allVideos = async (req: Request, res: Response) =>{
    // getRepository(Videos).find()
    // .then((result) => {
    //     res.json(result);
    // })

    try{
        const videos = await Videos.find();
        res.json(videos);
    }
    catch (err) {
        console.log(err)
        return res.status(404).json({ user: 'Video not found' });
    }
}

const findVideos = async (req: Request, res: Response)  => {
    try{
        const video = await Videos.findOneOrFail({where: {uuid: req.body.video}});
        res.json(video);
    }
    catch (err) {
        console.log(err)
        return res.status(404).json({ user: 'Video not found' });
    }
}

const findVideosByCategory = async (req: Request, res: Response) => {
    try{

    }
    catch (err) {
        console.log(err)
        return res.status(404).json({ user: 'Video not found' });
    }
}

module.exports = {
    allVideos,
    findVideos,
    findVideosByCategory
}