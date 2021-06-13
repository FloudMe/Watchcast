import {Request, Response} from "express";
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
        console.error(err)
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
        console.error(err)
        return res.status(404).json({ user: 'User not found' })
    }
}

const remove = async (req: Request, res: Response) => {

    const uuid = req.params.uuid

    try {
        const user = await User.findOneOrFail({ uuid });

        const user_details = await UserDetails.findOne({ user });

        await user_details.remove();

        await user.remove();

        return res.status(204).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Something went wrong' })
    }
}

const findUser = async (req: Request, res: Response) => {
    const uuid = req.params.uuid

    // try {
    //     const user = await User.findOneOrFail({ uuid });
    //     const userDetails = await UserDetails.findOneOrFail({ user });

    //     const resp = {email: user.email, first_name: userDetails.first_name, last_name: userDetails.last_name, country: userDetails.country};
    //     // const resp = {email: user.email, userDetails};
    //     return res.json(resp);
    // } catch (err) {
    //     console.error(err)
    //     return res.status(404).json({ user: 'User not found' })
    // }

    const data = {
        "email": "aaa",
        "first_name":"a",
        "last_name": "a",
        "country": "a"
    };

    return res.json(data);
}

const updateUser = async (req: Request, res: Response) => {
    const uuid = req.params.uuid;

    try{
        const user = await User.findOneOrFail({uuid});

        const user_details = await UserDetails.findOne({ user });

        user.email = req.body.email;

        await user.save();

        user_details.first_name = req.body.first_name;
        user_details.last_name = req.body.last_name;
        user_details.country = req.body.country;

        await user_details.save();
        
    }
    catch (err) {
        console.error(err)
        return res.status(404).json({ user: 'User not found' })
    }
}

const changePass = async (req: Request, res: Response) => {
    const uuid = req.params.uuid;

    try{
        const user = await User.findOneOrFail({uuid});
        const pass = await bcrypt.hash(req.body.password, 10);

        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
                return res.json(err);
            }
            if (result) {

                user.password = pass;
                user.save();

                return res.json('Gucci!');
            }
            return res.status(404).json('Wrong password!');
        });
    }
    catch (err) {
        console.error(err)
        return res.status(404).json({ user: 'User not found' })
    }
}

module.exports = {
    userIndex,
    register,
    login,
    remove,
    findUser,
    updateUser,
    changePass
};