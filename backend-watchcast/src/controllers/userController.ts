import * as bcrypt from "bcrypt";
import { validate } from "class-validator";
import { Request, Response } from "express";
import * as jwt from 'jsonwebtoken';
import { User } from "../entity/user";
import { UserDetails } from "../entity/user-details";

const userIndex = (req: Request, res: Response) => {
    res.json({ content: 'hello user' });
};

const register = async (req: Request, res: Response) => {

    req.body.user.password = await bcrypt.hash(req.body.user.password, 10);

    try {
        const user_details = await registerNewUser(req);

        return res.status(201).json(user_details);

    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: "Something went wrong!" })
    }
}

const login = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneOrFail({ where: { email: req.body.email } });

        bcrypt.compare(req.body.password, user.password, checkPassword(res, user));
    } catch (err) {
        console.error(err)
        return res.status(404).json('User not found')
    }
}

const remove = async (req: Request, res: Response) => {
    const uuid = req.body.data.id;

    try {
        await deleteUser(uuid);

        return res.status(204).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Something went wrong' })
    }
}

const findUser = async (req: Request, res: Response) => {

    const uuid = req.body.data.id;

    try {
        const { user, userDetails } = await findUserAndDetails(uuid);

        const resp = { email: user.email, first_name: userDetails.first_name, last_name: userDetails.last_name, country: userDetails.country };
        // const resp = {email: user.email, userDetails};
        return res.json(resp);
    } catch (err) {
        console.error(err)
        return res.status(404).json({ user: 'User not found' })
    }
}

const updateUser = async (req: Request, res: Response) => {
    // const uuid = req.params.uuid;
    const uuid = req.body.data.id;

    try {
        await updateUserDetails(uuid, req);
    }
    catch (err) {
        console.error(err)
        return res.status(404).json({ user: 'User not found' })
    }
}

const changePass = async (req: Request, res: Response) => {
    // const uuid = req.params.uuid;
    const uuid = req.body.data.id;

    try {
        const user = await User.findOneOrFail({ uuid });
        const pass = await bcrypt.hash(req.body.password, 10);

        bcrypt.compare(req.body.password, user.password, changePassword(res, user, pass));
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

async function updateUserDetails(uuid: any, req) {
    const { user, userDetails } = await findUserAndDetails(uuid);

    user.email = req.body.email;

    await user.save();

    userDetails.first_name = req.body.first_name;
    userDetails.last_name = req.body.last_name;
    userDetails.country = req.body.country;

    await userDetails.save();
}

function changePassword(res: Response<any, Record<string, any>>, user: User, pass: any): any {
    return (err, result) => {
        if (err) {
            return res.json(err);
        }
        if (result) {

            user.password = pass;
            user.save();

            return res.json('Gucci!');
        }
        return res.status(404).json('Wrong password!');
    };
}

async function findUserAndDetails(uuid: any) {
    const user = await User.findOneOrFail({ uuid });
    const userDetails = await UserDetails.findOneOrFail({ user });
    return { user, userDetails };
}

async function deleteUser(uuid: any) {
    const user = await User.findOneOrFail({ uuid });

    const user_details = await UserDetails.findOne({ user });

    await user_details.remove();

    await user.remove();
}

function checkPassword(res: Response<any, Record<string, any>>, user: User): any {
    return async (err, result) => {
        if (err) {
            return res.json(err);
        }
        if (result) {
            const token = generateAccessToken({ id: user.uuid });

            res.cookie('JWT', token, {
                maxAge: 86400000,
                httpOnly: true,
            });

            const user_details = await UserDetails.findOne({ user });

            return res.json({ "token": token, "role": user_details.role });
        }
        return res.status(404).json('Wrong password!');
    };
}

function generateAccessToken(id) {
    return jwt.sign(id, process.env.TOKEN_SECRET, { expiresIn: '18000s' });
};

async function registerNewUser(req) {
    const { email, password } = req.body.user;

    const user = User.create({ email, password });

    let errors = await validate(user);
    if (errors.length > 0)
        throw errors;

    await user.save();

    const { first_name, last_name, country } = req.body.user_details;

    const user_details = UserDetails.create({ user, first_name, last_name, country });

    errors = await validate(UserDetails);
    if (errors.length > 0)
        throw errors;

    await user_details.save();
    return user_details;
}