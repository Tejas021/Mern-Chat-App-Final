import React from 'react'
import Room from './Room'
const RoomList = ({rooms}) => {
    return (
        <div>{
            
            rooms?
            rooms.map(room=>(<Room name={room.name} id={room._id} key={room._id}/>)):
            "nothing"
        }
        </div>
    )
}

export default RoomList
