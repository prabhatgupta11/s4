const express=require("express")
const bcrypt = require('bcrypt');
const redisClient=require("../helpers/redis")
var jwt = require('jsonwebtoken');

const {UserModel}=require('../model/user.model')

const userrouter=express.Router()

//signup

userrouter.post("/signup",async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        const isuserpresent= await UserModel.findOne({email})

        if(isuserpresent) return res.send("already present ,please login")

        const haspass= await bcrypt.hashSync(password,7);

        const newuser=new UserModel({email,name,password:haspass})
        await newuser.save()
        res.send({"msg":"user is register",newuser})
    }catch(err)
    {
        res.send({"msg":"went wrng in register"})
    }
})

//login 
userrouter.post("/login",async(req,res)=>{
    try{
        const {email,password}=req.body;
        const isuserpresent= await UserModel.findOne({email})

        if(!isuserpresent) return res.send("please registrer first")

        const iscorrectpss= await bcrypt.compareSync(password,isuserpresent.password);
        
        if(!iscorrectpss)   return res.send("wrng pass")

        const token =await jwt.sign({userId:isuserpresent._id},"masai",{expiresIn:"1hr"})
        
        res.send({"msg":"user is login",token})
    }catch(err)
    {
        res.send({"msg":"went wrng in login"})
    }
})


//logout

userrouter.get("/logout",async(req,res)=>{
    try{

        const token=req.headers?.authorization?.split(" ")[1];

        if(!token) return res.status(401);

        await  redisClient.set(token);
        res.send("logout success")
    }catch(err)
    {
        res.send(err.message) 
    }
})

module.exports={
    userrouter
}