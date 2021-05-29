import {Request, Response} from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/user";
import { UserDetails } from "../entity/user-details";
import * as bcrypt from "bcrypt";
import { validate } from "class-validator";

const userIndex = (req: Request, res: Response) => {
    res.json({content: 'hello user'});
};

const register = async (req: Request, res: Response) =>{

    req.body.user.password = await bcrypt.hash(req.body.user.password, 10);
    
    try {
        const { email, password } = req.body.user;

        const user = User.create({ email, password });

        let errors = await validate(user)
        if (errors.length > 0) throw errors

        await user.save();

        const {first_name,  last_name, country } = req.body.user_details;

        const user_details = UserDetails.create({user, first_name,  last_name, country});

        errors = await validate(UserDetails)
        if (errors.length > 0) throw errors

        await user_details.save();

        return res.status(201).json(user_details);  

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Something went wrong!"})
  }
}

const login = async (req: Request, res: Response) => {
    try
    {
        const user = await User.findOneOrFail({where: {email: req.body.email}});

        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
                return res.json(err);
            }
            if (result) {
                return res.json('Gucci!');
            }
            return res.status(404).json('Wrong password!');
        });
    } catch (err) {
        console.log(err)
        return res.status(404).json({ user: 'User not found' })
    }
}

module.exports = {
    userIndex,
    register,
    login
};