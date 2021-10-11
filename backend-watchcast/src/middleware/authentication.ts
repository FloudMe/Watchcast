import * as jwt from 'jsonwebtoken';
import { User } from "../entity/User";

const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if (token == null) return res.sendStatus(401).json('You have to be logged in first.');

        const data = jwt.verify(token, process.env.TOKEN_SECRET);

        if (!data) return res.sendStatus(403).json('Something is wrong with token.');

        req.body['data'] = data;

        next();
    } catch (err) {
        return res.json({ message: "Brak tokena" });
    }
}

const authenticateUser = async (req, res, next) => {
    try {
        const user = User.findOneOrFail({ where: { email: req.body.user.email } });

        return res.json('Email already exists.');
    }
    catch (err) {
        next();
    }
};

module.exports = {
    authenticate,
    authenticateUser
};