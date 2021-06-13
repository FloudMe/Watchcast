import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from 'cors';
const homeRouter = require("./src/routes/homeRoutes");
const userRouter = require("./src/routes/userRoutes");
const videosRouter = require("./src/routes/videosRoutes");


createConnection().then(async connection => {

    // create express app
    const app = express();
    // app.use(bodyParser.urlencoded({
    //     extended: true
    //   }));

    // app.use(bodyParser.json());
    app.use(cors());

    // register express routes from defined application routes
    app.use('/', homeRouter);
    app.use('/users', userRouter);
    app.use('/videos', videosRouter);

    // start express server
    app.listen(4000);

    console.log("Express server has started on port 4000. Open http://localhost:4000/ to see results");

}).catch(error => console.log(error));