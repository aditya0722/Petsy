import React from "react";
import "../App.css";
import img from "../img/5450562.png";
export default function contact(){
    return(
        <>
            <section className="Home-container">
                <div className="about">
                    <div className="img-home-contact">
                        <div className="img-box2">
                            <img src={img} height="100%" width="100%"/>
                        </div>
                    </div>

                    <div className="home-txt-contact">
                        <h1>Contact Us</h1><br/>
                        <input type="text" placeholder="name"/>
                        <input type="email" placeholder="email"/>
                        <input type="text" placeholder="address" />
                        <input type="submit"/>
                    </div>
                </div>
            </section>
        </>
    )
    
}