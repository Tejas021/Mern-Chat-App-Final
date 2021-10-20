import React from 'react'
import { useState,useContext } from 'react'
import { Redirect } from 'react-router'
import {UserContext} from "../../UserContext"
import Navbar from "../utilities/Navbar"
const SignUp = () => {
    const {user,setUser}=useContext(UserContext)
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [nameError, setNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const onSubmitHandler=async (e)=>{
        e.preventDefault();
        setEmailError('');
        setNameError('');
        setPasswordError('');
   
        try {
            const res = await fetch('http://localhost:5000/signup', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({ name, email, password }),
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res.json();
 
            if (data.errors) {
                setEmailError(data.errors.email);
                setNameError(data.errors.name);
                setPasswordError(data.errors.password);

            }
            if (data.user) {
                setUser(data.user)
            }
        } catch (error) {
            console.log(error)
        }
    
    }
    if (user) {
        return <Redirect to="/" />
    }
    return (
        <div>
            <Navbar/>
            <div className="container  p-5 mt-5" style={{background:"#121212"}}><h1 className="text-center p-5 text-light ">Sign Up</h1>

            <form className=" text-center pb-5" onSubmit={e=>onSubmitHandler(e)}>
            <input className="form-control mt-5 " placeholder="Your Name" value={name} onChange={e=>setname(e.target.value)}/>
            <div className="text-danger">{nameError}</div>
            <input className="form-control mt-5" placeholder="Your Email" value={email} onChange={e=>setemail(e.target.value)}/>
            <div className="text-danger">{emailError}</div>
            <input className="form-control mt-5" placeholder="Enter a Password" value={password} onChange={e=>setpassword(e.target.value)}/>
            <div className="text-danger" type="password">{passwordError}</div>
            <button type="submit" className="btn m-3 btn-success">Sign Up</button>
            </form></div>
            
        </div>
    )
}

export default SignUp
