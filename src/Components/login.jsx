import React, { useState } from "react";
import "../App.css";
import { Link,Routes,Route, useNavigate } from "react-router-dom";
import Signup from "./signup"
import axios from "axios";
import NavigationBar from "./navigation";
export default function login({onLogin}) {
    const history =useNavigate();
    const[password,setPassword]=useState("")
    const[email,setEmal]=useState("")
    const[result,setResult]=useState("")
   
   async function submitHandler(e){
        e.preventDefault();
        try{
            console.log(password);
            axios.post("http://localhost:5000/login",{
                email,password
            })
            .then(res=>{
                console.log(res.data.status);
                let name=res.data.username;
                if(res.data.status=="exits"){
                    onLogin(name);
                    history("/Home");

                    
                }
                else{
                    setResult("Invalid Email or Pssword")
                }
            })
        }
        catch(e){
            console.log(e);
        }
    }
    return (

        <div class="container-login">
            <form class="login-form" method="post" onSubmit={submitHandler}>
            <br/>
            <center>
                <h2>Welcome to  <span className="txt-foter-special">Petsy</span> Community</h2>
                <br/>
                <input type="email" placeholder="email" required onChange={(e)=>{setEmal(e.target.value)}}/>
                <input type="password" placeholder="Password" required onChange={(e)=>{setPassword(e.target.value)}}/>
                <input type="submit" value="Login"/>
                <br/>
                <br/>
                <span>Don't have an accout?</span>
                
                <Link to="/signup" className="link-color">signup</Link>
                <Routes>
                <Route path='/signup' element={<Signup/>}>Signup</Route>
                    </Routes>
                    <br/>
                    <br/>
                </center>
            <span className="result-output">{result}</span>
            </form>
           
        </div>
        
    );
}
