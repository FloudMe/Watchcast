import * as bodyParser from "body-parser";
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";

const userRouter = require("./src/routes/userRoutes");
const videosRouter = require("./src/routes/videosRoutes");


createConnection().then(async connection => {

    const app = express();

    app.use(cookieParser())
    app.use(bodyParser.json());
    app.use(cors());

    app.use('/users', userRouter);
    app.use('/videos', videosRouter);

    app.listen(4000);

    console.log("Express server has started on port 4000. Open http://localhost:4000/ to see results");

}).catch(error => console.log(error));