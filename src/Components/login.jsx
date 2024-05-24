import React, { useState } from "react";
import "../App.css";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import Signup from "./signup"
import axios from "axios";
import NavigationBar from "./navigation";
import { isLoggedIn, getCookie, setCookie } from "../cookie";
export default function login({ onLogin }) {
    //some hooks
    const history = useNavigate();
    const [password, setPassword] = useState("")
    const [email, setEmal] = useState("")
    const [result, setresult] = useState("")
    //when submitting the value
    async function submitHandler(e) {
        e.preventDefault();


        axios.post("http://localhost:5000/login", {
            email, password
        })
            .then(res => {
                console.log(res);
                let name = res.data.username;
                setCookie("username", name, 30)
                setCookie("email", email, 30)
                onLogin(name);
                history("/userDashboard");
            }).catch(e => {
                console.log(e.response.data.status);
                if(e.response.data.status==="not exists"){
                    setresult("Incorrect Email or Password");
                    setEmal("")
                    setPassword("")
                    
                }
                else{
                    setresult("Somethang went Wrong try Again!");
                }
                
            })


        if (isLoggedIn()) {
            onLogin(getCookie("username"));
            history("/userDashboard")
        }
        else {
            submitHandler();
        }
    }

    return (

        <div className="container-login">
            <form className="login-form" method="post" onSubmit={submitHandler}>
                <br />
                <center>
                    <h2>Welcome to  <span className="txt-foter-special">Petsy</span> Community</h2>
                    <br />
                    <input type="email" placeholder="email" required onChange={(e) => { setEmal(e.target.value) }} />
                    <input type="password" placeholder="Password" required onChange={(e) => { setPassword(e.target.value) }} />
                    <input type="submit" value="Login" />
                    <br />
                    <br />
                    <span>Don't have an accout?</span>

                    <Link to="/signup" className="link-color">signup</Link>
                    <Routes>
                        <Route path='/signup' element={<Signup />}>Signup</Route>
                    </Routes>
                    <br />
                    <br />
                </center>
                <span className="result-output">{result}</span>
            </form>

        </div>

    );
}
