const mongoose =require("mongoose");

const chatSchema= new mongoose.Schema({
    text: String,
    user: String,
    room: String,
    posted:String
})

const chatModel= new mongoose.model("chat", chatSchema);

module.exports = chatModel;