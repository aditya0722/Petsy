import React, { useState } from 'react';
import { FaDashcube, FaLine, FaUser } from 'react-icons/fa';
import { Fa42Group } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const NavigationBar = ({isAuthenticated,username,onLogout}) => {
  const [style,setstyle]=useState("ul")
  function tooglehandler(){
    if(style==="ul"){
      setstyle("ul-show")
    }
    else{
      setstyle("ul")
    }
    
  }
  return (
    <nav>
      <span>
      <h2><span className='p-text'>P</span>
      <span className='other-text'>etsy</span></h2>
      <div className='toogle'>
        <Fa42Group className='icon' onClick={tooglehandler}/>
      </div>
      </span>
      <span className={style}>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About us</Link></li>
        <li><Link to="/contact">Contact us</Link></li>
      </ul>
      </span>
     {isAuthenticated?(
      <ul className='log-out'>
    <li> <span className='txt-name'><FaUser/>&nbsp;{username}</span></li>
     <li><Link to="/" className='btn-login' onClick={onLogout}>logout</Link></li>
     
     </ul>
     )
     :(<div className='buttons'>
      <Link to="/login" className='btn-login'>login</Link>
      <Link to="/signup" className='btn-signup'>signup</Link>
      </div>)
      }
      
        
      
      
        
      
      
      
      
    </nav>
  );
}
export default NavigationBar;