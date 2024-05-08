import React, { useState } from "react";
import "../App.css";
import { Link,Routes,Route, useNavigate } from "react-router-dom";
import Signup from "./signup"
import axios from "axios";
export default function login() {
    const history =useNavigate();
    const[Password,setPassword]=useState("")
    const[Email,setEmal]=useState("")
    function submitHandler(e){
        e.preventDefault();
        try{
            axios.post("http://localhost:5000/login",{
                Email,Password
            })
            .then(res=>{
                if(res.data=="exits"){
                    history("/Home");
                }
                else{
                    alert("Invalid Username or Psswword")
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
                <h2>Welcome to  <span className="txt-foter-special">Petsy</span> Community</h2>
                <br/>
                <input type="email" placeholder="email" required onChange={(e)=>{setEmal(e.target.value)}}/>
                <input type="password" placeholder="Password" required onChange={(e)=>{setPassword(e.target.value)}}/>
                <button type="submit">Login</button>
                <br/>
                <br/>
                <span>Don't have an accout?</span>
                
                <Link to="/signup" className="link-color">signup</Link>
                <Routes>
                <Route path='/signup' element={<Signup/>}>Signup</Route>
                    </Routes>

            </form>
        </div>

    );
}
