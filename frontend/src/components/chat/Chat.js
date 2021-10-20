import React from 'react'
import Navbar from '../utilities/Navbar'
import {UserContext} from "../../UserContext"
import { useEffect,useState,useContext } from 'react'
import {Redirect} from "react-router-dom"
import { useParams } from 'react-router-dom'
import io from 'socket.io-client';
import MessageBox from "./MessageBox";
import "./Chat.css";
let socket
const Chat = () => {

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    
    const {user,setUser}=useContext(UserContext)
    let { room_id, room_name } = useParams();
    
    const ENDPT = 'localhost:5000';



    useEffect(async() => {

        socket = io(ENDPT);
         
        
            socket.emit("join",{room_id,room_name,user_name:user.name,user_id:user._id})
       
       
       
    }, [])


    useEffect(() => {
        socket.emit('message-history',room_id);
        socket.on('get-messages',messages=>setMessages(messages));
    }, [messages])
    
    useEffect(() => {
        socket.on('get-message',message=>setMessages([...messages,message]));
    }, [message])
    
    

    const messageSubmitHandler=(e)=>{
        e.preventDefault();
        socket.emit("sendMessage",message,room_id);
        
    }
  

    return (
        <div>
            <Navbar/>
            <div className="container">
            <h5 className="pb-1 text-light text-end"> Welcome {user?user.name:""} to {room_name}</h5>


<div className="outerContainer ">
<div className="container1 ">


<MessageBox messages={messages} user={user}/>

<form onSubmit={e=>messageSubmitHandler(e)} className="row ">
<div className="col-md-2"></div>
<input type="text" className=" col-md-6 m-1" placeholder="message" value={message} onChange={e=>setMessage(e.target.value)} />
<button className="btn btn-success col-md-2 m-1">Send</button>
</form>

</div>

</div>
            </div>
            

          



                        
        </div>
    )
}

export default Chat
