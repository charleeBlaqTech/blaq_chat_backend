const express    = require("express");
const cors       = require('cors');
const dotenv     = require("dotenv").config();
const http       = require('http');
const mongoose   = require("mongoose");
const {Server}   =require('socket.io');
const chat       = require("./models/chatsModel");

mongoose.connect(process.env.MONGO_DB_ATLAS_CONNECT);

const app = express();
app.use(cors);
const server= http.createServer(app);
const io = new Server(server, {cors:{origin: "*"}});


io.on("connect", (socket)=>{

    socket.on("join_room", async (data)=>{
       socket.join(data)
       const currentRoomMessages = await chat.find({room:data});
       socket.emit('get_messages', currentRoomMessages);
    })
    socket.on("send_message", async (data)=>{

        await chat.create({
            text: data.text,
            user:data.user,
            room:data.room,
            posted:data.posted
        });

        const currentRoomMessages = await chat.find({room:data.room});
        socket.to(data.room).emit('get_messages', currentRoomMessages);
    })
    socket.on('disconnect')
})






server.listen(process.env.PORT || 8080)