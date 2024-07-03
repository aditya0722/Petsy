import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn,getCookie } from "../cookie";
import img from "../img/tspe.png";
function Home({ onLogin }) {
  const history = useNavigate();
  useEffect(() => {
    if (isLoggedIn()) { 
        onLogin(getCookie("username"))
      history("/userDashboard");
    }
  }, []); 

  return (
    <>
     <section className="home-container">
        <div className="home">
            <div className="home-txt">
                <h1><span className="txt-home">Wanted to Sell/Buy pet?</span></h1>
                <br/>
                <h4 className="txt-white">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab quasi consequaturdolor culpa architecto labore asperiores debitis ratione vel vitae!</h4>
                <br/>
                <button type="button" className="btn-buy-sell ">Buy&Sell</button>
            </div>
            <div className="img-home">
                <div className="img-box">
                    <img src={img} alt="img" height="90%" width="100%"/>
                </div>
            </div>

        </div>
    </section>
     
    </>
  );
}

export default Home;
