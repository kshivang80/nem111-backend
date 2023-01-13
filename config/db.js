const mongoose=require("mongoose")
require("dotenv").config()

//mongodb://127.0.0.1:27017/heroDataBase
const connection=mongoose.connect(process.env.mongoUrl)





module.exports={
    connection,
   
}