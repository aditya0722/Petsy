import React from "react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import Login from "./login";
import { useState } from "react";
import axios from "axios";
import bcrypt from "bcryptjs";
export default function signup() {

    const history = useNavigate();
    const [useName, setuseName] = useState("");
    const [email, setemail] = useState("");
    const [Password, setpassword] = useState("");
    const [cPassword, setcPassword] = useState("");
    const [result, setResult] = useState("");
    async function clickHandler(e) {
        e.preventDefault();
        if (Password === cPassword) {
            const password = await bcrypt.hash(Password, 10)
            try {
                await axios.post("https://petsy-34xa.onrender.com/signup", {
                    useName, email, password
                }).then(res => {
                    if (res.data == "exits") {
                        setpassword("")
                        setcPassword("")
                        setResult("Email Already Exits Please Try Again")
                    }
                    else {
                        setemail("")
                        setpassword("")
                        setuseName("")
                        setcPassword("")
                        history("/login");
                    }
                })
            }
            catch (e) {
                setResult("Error Occured please try Again")
            }

        }
        else {
            setResult('check your password again')
        }


    }
    return (
        <>
            <div className="container-login">
                <form className="login-form" onSubmit={clickHandler} method="post">
                    <br />
                    <center>
                        <h2>Register to <span className="txt-foter-special">Petsy</span> Community</h2>
                        <br />

                        <input type="text" placeholder="Username" onChange={(e) => { setuseName(e.target.value) }} required />
                        <input type="email" placeholder="email" onChange={(e) => { setemail(e.target.value) }} required />
                        <input type="password" placeholder="Password" onChange={(e) => { setpassword(e.target.value) }} required />
                        <input type="password" placeholder="Confirm Password" onChange={(e) => { setcPassword(e.target.value) }} required />
                        <input type="submit" value="Sign Up" />

                        <br />
                        <br />
                        <span>Already have an accout?</span>

                        <Link to="/login" className="link-color">Login</Link>
                        <Routes>
                            <Route path='/login' element={<Login />}></Route>
                        </Routes>
                        <br />
                        <br />
                        </center>
                        <span className="result-output">{result}</span>
                    
                </form>
            </div>

        </>
    );
}
