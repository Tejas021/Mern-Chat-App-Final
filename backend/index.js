const express=require('express');
const app = express();
require("dotenv").config()
const cors = require('cors');
const cookieParser = require('cookie-parser')
var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200 // For legacy browser support
}


const authRoutes= require("./routes/authRoutes")
app.use(cors(corsOptions));
app.use(express.json())
app.use(authRoutes)
app.use(cookieParser());
const mongoose = require('mongoose');

const Text = require("./models/Text")
const {addUser,getUser,removeUser}=require('./helper')
const http = require('http').createServer(app);
const socketio = require('socket.io');
const Room =require('./models/Room')

const io = socketio(http);




const PORT = process.env.PORT || 5000
const mongodb="mongodb+srv://admin:admin@cluster0.ovttb.mongodb.net/chat-database?authSource=admin&replicaSet=atlas-8hicat-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true"
mongoose.connect(mongodb,{ useNewUrlParser: true ,useUnifiedTopology: true}).then(()=>{


    console.log("connected")
 
}).catch(err=>console.log(err))

app.get('/set-cookies', (req, res) => {
    res.cookie('username', 'Tony');
    res.cookie('isAuthenticated', true, { maxAge: 24 * 60 * 60 * 1000 });
    res.send('cookies are set');
})
app.get('/get-cookies', (req, res) => {
    const cookies = req.cookies;
   
    res.json(cookies);
})


io.on('connection', (socket) => {
 
    Room.find().then(result => {
    
        result?
        socket.emit('output-rooms', result):
        null
    }
    );

    socket.on('create-room', payload => {
 
        const room = new Room({name:payload.name,password:payload.password})
        room.save()
        
        io.emit('room-created', room)
      
    })
    socket.on("join",payload=>{
        let socket_id=socket.id;
     
        const response=addUser({
            socket_id,
            name:payload.user_name,
            user_id:payload.user_id,
            room_id:payload.room_id

        })
        socket.join(payload.room_id);
        
    })

    socket.on("sendMessage",(message,room_id)=>{
        let user=getUser(socket.id);

        let test={user_id:user.user_id,room_id:user.room_id,text:message,user_name:user.user_name}

        const newmessage=new Text({user_id:user.user_id,room_id:user.room_id,text:message,user_name:user.name});
  
        newmessage.save().then(result=>io.to(room_id).emit("get-message",result));
 
    })
    socket.on("message-history",(room_id)=>{
        Text.find({room_id}).then(result=>{
            socket.emit("get-messages",result)
        })

    })

    socket.on('disconnect',()=>{
        console.log("disconneted")
        removeUser(socket.id)
    })
})

http.listen(PORT, () => {
     console.log(`listening on port ${PORT}`);
});
