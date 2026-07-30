
const { default: mongoose } = require("mongoose")
const Mongoose=require("mongoose")

//  new mongoose.Schema , ithu data structure create panrom.

const userSchema=new mongoose.Schema({
    name: {
      type: String,
      required: true
   },

   email: {
      type: String,
      required: true,
      unique: true
   },

   password: {
      type: String,
      required: true
   },

   role: {
      type: String,
      enum: ["admin", "manager", "employee"],
      default: "employee"
   }
})

module.exports=mongoose.model("Users",userSchema);
