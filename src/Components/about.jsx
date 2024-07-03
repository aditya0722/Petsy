import React from "react";
import "../App.css";
import img from "../img/5450562.png"
export default function about() {
    return (
        <>
            <section className="Home-container">
                <div className="about">
                    <div className="img-home">
                        <div className="img-box">
                            <img src={img} height="100%" width="100%"/>
                        </div>
                    </div>

                    <div className="home-txt">
                        <h1>Petsy</h1><br/>
                        <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Asperiores qui natus similique, nam distinctio ipsa cumque 
                            beatae, officiis architecto nostrum cupiditate, eum quae velit 
                            praesentium aspernatur corrupti non dolore unde quod a itaque 
                            aut tempora inventore recusandae? Quia velit rem incidunt nihil 
                            architecto temporibus consequuntur est voluptatum. Unde similique 
                            temporibus eveniet at nisi aperiam ipsa odit omnis, aliquam, 
                            accusantium provident possimus doloremque exercitationem, commodi 
                            vero animi itaque dolorem non tempore consectetur? Ab impedit fugit
                             a, ex sed repellendus dignissimos reprehenderit et dolorum unde 
                             similique iste, expedita pariatur mollitia dolores rerum inventore,
                              exercitationem modi at odit qui obcaecati esse. Perspiciatis, 
                              voluptatem.

                        </h4>
                    </div>
                </div>
            </section>
        </>
    )
}