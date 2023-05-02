const mongoose=require("mongoose")

const userschema=mongoose.Schema({
    name:String,
    email:String,
    password:String,

})

const searchschema= mongoose.Schema({
    ipaddress:String,
    city:String,
    timestamp:{type:Date,default:Date.now}
})

const UserModel=mongoose.model("user",userschema)
const SearchModel=mongoose.model("search",searchschema)
module.exports={
    UserModel,
    SearchModel
}
