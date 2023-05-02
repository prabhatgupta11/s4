
const express = require('express');
const axios = require('axios');
const redis = require('redis');
const redisClient = require("../helpers/redis");
const validatorip = require('../middleware/ipvali');
const winston=require("winston");
const logger = require("../middleware/logger");

const serchroute = express.Router();


serchroute.get('/:ip/city', validatorip, async (req, res, next) => {
  try {
    const ip = req.params.ip;

    const isipInCache = await redisClient.get(ip);

   

    if (isipInCache) return res.status(200).send({ data: isipInCache });

   
    const response = await axios.get(`https://ipapi.co/${ip}/json/`);
    const { city } = response.data;

    
    await setexAsync(ip, 21600, JSON.stringify(response.data));

    // return the city
    res.json({ city });
  } catch (err) {
    // log any errors using Winston
    console.error(err);
    logger.log(err)
   
    next(err);
  }
});

// export the serchroute
module.exports = serchroute;
