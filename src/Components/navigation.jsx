import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <nav>
      <h2><span className='p-text'>P</span>
      <span className='other-text'>etsy</span></h2>
      <div></div>
      <div></div>
      <ul>
        <li><Link to="/Home">Home</Link></li>
        <li><Link to="/login">login</Link></li>
        <li><Link to="/signup">signup</Link></li>
      </ul>
    </nav>
  );
}
export default NavigationBar;