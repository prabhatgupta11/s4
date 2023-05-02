const express=require("express")
const {userrouter}=require("./routes/user.routes")
const {serchroute}=require("./routes/searchroute")
const logger = require("./middleware/logger");

const {connection}=require("./db")
const app=express()

app.use(express.json())
// app.use("/ip",serchroute)
app.use("/user",userrouter)



app.listen(process.env.port,async()=>{

    try{
        await connection();
        console.log("connected to db")
        // logger.log("info","Database connected")
       } catch(err) {
         console.log(err.message)
        //  logger.log("error","Database connection fail")
       }
})