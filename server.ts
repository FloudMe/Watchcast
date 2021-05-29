import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
const homeRouter = require("./src/routes/homeRoutes");
const userRouter = require("./src/routes/userRoutes");


createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(bodyParser.json());

    // register express routes from defined application routes
    app.use('/', homeRouter);
    //app.use('/users', userRouter);

    // start express server
    app.listen(3000);

    console.log("Express server has started on port 3000. Open http://localhost:3000/ to see results");

}).catch(error => console.log(error));