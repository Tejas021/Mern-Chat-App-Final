let users=[]

const addUser=(newUser)=>{
    let flag=users.find(user=>user.user_id===newUser.user_id&&user.user_id===newUser.user_id)

    if(flag){
        let error="User Exists";
        return error;
    }
    else{
    users.push(newUser);
    
    return newUser;
}}

const removeUser = (socket_id) => {
    const index = users.findIndex(user => user.socket_id === socket_id);
    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

const getUser = (socket_id) =>{ user1=users.find(user => user.socket_id === socket_id)

return user1
}

module.exports={addUser,getUser,removeUser}