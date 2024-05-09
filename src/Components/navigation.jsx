import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = ({isAuthenticated,username,onLogout}) => {
  
  return (
    <nav>
      <h2><span className='p-text'>P</span>
      <span className='other-text'>etsy</span></h2>
      <div></div>
      
      <ul>
        <li><Link to="/Home">Home</Link></li>
        <li><Link to="/about">About us</Link></li>
        <li><Link to="/contact">Contact us</Link></li>
        <li><Link to="/review">Review</Link></li>
      </ul>
     {isAuthenticated?(
      <ul>
    <li> <span className='txt-name'>{username}</span></li>
     <li><Link to="/Home" className='btn-login' onClick={onLogout}>logout</Link></li>
     
     </ul>
     )
     :(<div>
      <Link to="/login" className='btn-login'>login</Link>
      <Link to="/signup" className='btn-signup'>signup</Link>
      </div>)
      }
        
      
      
        
      
      
      
      
    </nav>
  );
}
export default NavigationBar;