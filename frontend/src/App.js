
import Chat from "./components/chat/Chat";
import Home from "./components/home/Home";
import {UserContext} from "./UserContext";
import { BrowserRouter as Router,Switch,Route } from "react-router-dom";
import {useState,useEffect} from "react"
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Cookies from 'js-cookie';


function App() {





const [user, setUser] = useState(null)

  useEffect(() => {
    const cookie = Cookies.get()
    // document.cookie="user=Tejas";

    const verifyUser = async () => {
      try {
        const res = await fetch('http://localhost:5000/verifyuser', {
        method:"POST",  
        credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body:JSON.stringify({cookie})
        });
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.log(error)
      }


    }
    verifyUser()


  }, [])


return (
    <Router>
    <div className="App">
      <UserContext.Provider value={{user,setUser}} >
    
<Switch>
  <Route exact path="/" component={Home}/>

  <Route path="/chat/:room_id/:room_name" component={Chat}/>
  <Route path="/signup" component={SignUp} />
  <Route path="/signin" component={SignIn} />
  <Route/>
</Switch>



      </UserContext.Provider>
 


    </div>
    </Router>
  );
}

export default App;
