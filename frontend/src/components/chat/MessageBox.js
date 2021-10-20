import React from 'react'
import Message from "./Message"
import STB from 'react-scroll-to-bottom';
const MessageBox = ({messages,user}) => {
    return (
        <STB className="messagebox">

<div className="bg-light"style={{"padding":"20px"}}>
            
            {messages.map(message=><Message message={message} user_id={user._id} key={message._id}/>)}
        </div>
   </STB>
        
    )
}

export default MessageBox
