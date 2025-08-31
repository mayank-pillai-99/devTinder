const mongoose=require('mongoose')

const connnectDb=async ()=>{
    await mongoose.connect("mongodb+srv://mayank:FJJm0LnxI9dXXOUa@backend.lifpaoi.mongodb.net/devTinder");
}

module.exports=connnectDb
 