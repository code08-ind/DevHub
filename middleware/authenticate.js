const jwt = require('jsonwebtoken');
const User = require('../model/userSchema.js');

const Authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.jwttoken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token": token });

        if (!rootUser) {
            throw new Error('User Not Found');
        }

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();

    } catch (error) {
        res.status(401).send('UnAuthorized');
        console.log(error);
    }
}

module.exports = Authenticate;