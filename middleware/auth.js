
const jwt = require("jsonwebtoken");
const redisClient = require("../helpers/redis");


const authenticator = async (req, res, next) => {

    try {
        const token = req.headers?.authorization?.split(" ")[1];

        
        if (!token) return res.status(401).send("Please login again");

        const isTokenValid = await jwt.verify(token, "masai");

        if (!isTokenValid) return res.send("Authentication failed, Please login again");

        const isTokenBlacklisted = await redisClient.get(token);

        if (isTokenBlacklisted) return res.send("Unauthorized");

      
        next()

    } catch (err) {
        res.send(err.message);
    }
};

module.exports = { authenticator };