import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn,getCookie } from "../cookie";
function Home({ onLogin }) {
  const history = useNavigate();

  useEffect(() => {
    if (isLoggedIn()) { 
        onLogin(getCookie("username"))
      history("/userDashboard");
    }
  }, []); 

  return (
    <div>
      <h1> Home page content </h1>
     
    </div>
  );
}

export default Home;
