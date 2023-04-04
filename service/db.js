//import mongoose
const mongoose=require("mongoose")

//connection a string

mongoose.connect("mongodb://127.0.0.1:27017/bankServer",{useNewUrlParser:true})


//model creation 
//schema means fields and valus or which design we have to follow
 
const User=mongoose.model("User", { username: String, accno: Number, password: String, balance: Number, transaction: [] })


module.exports={
    User
}

