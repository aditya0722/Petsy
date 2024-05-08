import React from "react";
import { Route,Routes,Link, useNavigate } from "react-router-dom";
import Login from "./login";
import { useState } from "react";
import axios from "axios";
export default function signup() {
    const history=useNavigate();
    const [useName, setuseName] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [cPassword, setcPassword] = useState("");
    async function clickHandler(e){
        e.preventDefault();

        if(password===cPassword){
            try{
                await axios.post("http://localhost:5000/signup",{
                    useName,email,password
                }).then(res=>{
                    if(res.data=="exits"){
                        alert("Email Already Exits")
                    }
                    else{
                        history("/login");
                    }
                })
            }
            catch(e){
                console.log(e);
            }
            
        }
        else{
            alert('check your password again')
        }
       

    }
    return (
        <>
            <div className="container-login">
            <form className="login-form" onSubmit={clickHandler} method="post">
            <br/>
                <h2>Register to <span className="txt-foter-special">Petsy</span> Community</h2>
                <br/>
                
                <input type="text" placeholder="Username" onChange={(e)=>{setuseName(e.target.value)}}required />
                <input type="email" placeholder="email" onChange={(e)=>{setemail(e.target.value)}} required />
                <input type="password" placeholder="Password" onChange={(e)=>{setpassword(e.target.value)}} required />
                <input type="password" placeholder="Confirm Password" onChange={(e)=>{setcPassword(e.target.value)}} required />
                <input type="submit" value="Sign Up"/>
                
                <br/>
                <br/>
                <span>Already have an accout?</span>
                
                <Link to="/login" className="link-color">Login</Link>
                <Routes>
                <Route path='/login' element={<Login/>}></Route>
                    </Routes>

            </form>
        </div>

        </>
    );
}
