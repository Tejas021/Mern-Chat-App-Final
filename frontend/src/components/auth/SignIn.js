import React from 'react'
import {useState,useContext} from "react"
import { Redirect } from 'react-router'
import {UserContext} from "../../UserContext"
import Navbar from "../utilities/Navbar"
const SignIn = () => {
 
    const {user,setUser}=useContext(UserContext)

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setpasswordError] = useState("")
    const onSubmitHandler=async (e)=>{
        e.preventDefault();
      
        setEmailError("")
        setpasswordError("")
        try{

            const response=await fetch("http://localhost:5000/signin",{
            method:"POST",
            credentials: 'include',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({email,password}),
            

        })
        let data=await response.json()

        if(data.errors){
            setEmailError(data.errors.email);
            setpasswordError(data.errors.password);
        }
        else{
  
            await setUser(data.user)
     
           
        }
        

        }
        catch(err){
            console.log(err)

        }
        
        
    }
    if (user) {
        return <Redirect to="/"/>
    }
    return (
        <div>
            <Navbar/>
            <div className="container  p-5 mt-5" style={{background:"#121212"}}>
            <h1 className="text-center pt-5 text-light">Sign In</h1>
            <form className=" text-center pb-5" onSubmit={e=>onSubmitHandler(e)}>
            
            <input className="form-control mt-5" placeholder="Your Email" value={email} onChange={e=>setemail(e.target.value)}/>
            <div className="text-danger">{emailError}</div>
            <input className="form-control mt-5" type="password" placeholder="Enter a Password" value={password} onChange={e=>setpassword(e.target.value)}/>
            <div className="text-danger" >{passwordError}</div>
            <button type="submit" className="btn m-3 btn-success">Sign IN</button>
            </form>
            
            </div>
           
           
        </div>
    )
}

export default SignIn
