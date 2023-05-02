

const winston = require('winston');
const {MongoDB}=require("winston-mongodb")


const logger=winston.createLogger({
    level:"info",
    format:winston.format.json(),
    transports:[
        new MongoDB({
            db:"mongodb+srv://prabhat:prabhat@cluster0.nob5hjt.mongodb.net/?retryWrites=true&w=majority",
            collection:"logs",
            options:{
                useUnifiedTopology:true
            }
        })
    ]
})

module.exports={
    logger
}
