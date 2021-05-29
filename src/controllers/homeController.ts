// const homeIndex = (req, res) => {
//     res.render('home', { pageTitle: 'Home'} );
// };


// module.exports = {
//     homeIndex
// };

import {Request, Response} from "express";

export let homeIndex = (req: Request, res: Response) => {
    res.json({content: 'hello world'});
};