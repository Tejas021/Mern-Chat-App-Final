import {useState} from 'react'
import { Link,Redirect } from 'react-router-dom'

const Room = ({name,id}) => {
  const [val, setval] = useState(false)
  const [password, setpassword] = useState("")
  const [go, setgo] = useState(false)
  const changer=()=>{
    setval(!val)
  }
const [text, settext] = useState("")
  const SubmitPassword=async ()=>{
    const res = await fetch("http://localhost:5000/roomverify",{
        method:"POST",    
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({name:name,password:password})
        })
        const data = await res.json();
        if(data){
          setgo(true)
        }
        else{
          settext("wrong password")
                }
  }

  return (
        // <Link to={'/chat/' + id + '/' + name}>
        <div  className="card bg-primary mb-1 text-light">
  <div className="card-body text-center " >
        <h6  onClick={changer}>{name}</h6>
       
  
{val? 

<>


<input value={password} placeholder="password" onChange={e=>setpassword(e.target.value)} className="form-control"/>
<div className="text-light bg-danger-outline">{text}</div>
{/* <Link className="btn btn-warning m-1" >go</Link> */}
<button onClick={SubmitPassword} className="btn btn-warning m-1">Add</button>

{go?<Redirect to={'/chat/' + id + '/' + name}/>:<></>}

</>




:null}
 

  
  </div>
</div>
//  </Link>
  )
}

export default Room
