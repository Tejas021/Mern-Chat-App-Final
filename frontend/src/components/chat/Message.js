import React from 'react'
import "./MessageText.css"
{/* {isuser?<div className="row"><div className="col-md-9  col-xs-1"></div><div className="bg-success  col-md-3 col-xs-5 user"> <h4>{message.text}</h4><div>{message.created}</div></div></div>:<div className="bg-warning col-md-3  notuser"><h6>{message.user_name}</h6><h4>{message.text}</h4><div></div></div>} */}
const Message = ({message,user_id}) => {
    let isuser=true
    if((message.user_id)!==user_id){
        isuser=false
    }
    
    
    return (
        <div>
            {isuser?  <div class="mine messages">
    <div class="message ">
    <h5>{message.text}</h5>
    </div>
  </div>
:
<div class="yours messages">

    <div class="message last">
    <h7>{message.user_name}</h7> 
    <h5>    {message.text}</h5> 

     </div>
        </div>}

    </div>
    )}

export default Message;
