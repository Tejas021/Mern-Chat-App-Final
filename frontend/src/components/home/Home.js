import React from 'react'
import Navbar from '../utilities/Navbar'
import {UserContext} from "../../UserContext"
import { useEffect,useState,useContext } from 'react'
import RoomList from "./RoomList"
import io from 'socket.io-client';
import { Redirect } from 'react-router'

let socket;
const Home = () => {
    const [room, setRoom] = useState("")
    const [roompass, setRoompass] = useState("")
    const [rooms, setRooms] = useState([])
    const {user,setUser}=useContext(UserContext)

    const ENDPT = 'localhost:5000';
    useEffect(() => {
        socket = io(ENDPT);
        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [ENDPT])

    useEffect(() => {
        socket.on("output-rooms",results=>{setRooms(results)})
    }, [])
    useEffect(() => {
        socket.on("room-created",results=>setRooms([...rooms,results]))
    }, [rooms])



const onSubmitHandler=(e)=>{
    e.preventDefault();

   socket.emit('create-room',{name:room,password:roompass});



}
if(!user){
    return <Redirect to="/signin"/>
}

    return (
        <div >
            <Navbar/>
    
        <div className="container">


        <h3 className="text-light text-center m-4">Welcome {user.name}</h3>
        <div className="row p-3">
            <div className="col-md-6 ">    
         <div className="bg-warning  p-5 text-center">

         <h3 className="text-start ">Create New Room</h3>
            <form onSubmit={e=>onSubmitHandler(e)}>
                <input placeholder="Room Name" className="form-control m-3" type="name"value={room} 
                onChange={e=>setRoom(e.target.value)}
                />
                <input placeholder="Create Password" type="password" className="form-control m-3" 
                value={roompass} 
                onChange={e=>setRoompass(e.target.value)}/>

                <button className="btn btn-success m-3 " type="submit">Create</button>
            </form>
          


         </div>
           
            </div>
            
            
            
            
            
            <div className="col-md-6 p-5 bg-danger">
                <h3>RoomList:</h3>
            <RoomList rooms={rooms}/>
            </div>
        </div>
        
            
        </div>
         
 
        </div>
    )
}

export default Home
