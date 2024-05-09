import { useState } from 'react';
import NavigationBar from './Components/navigation';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/login';
import Signup from './Components/signup';
import Review from './Components/review';
import Contact from './Components/contact';
import About from './Components/about';
import './App.css';
import Footer from './Components/footer';
function App() {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (username) => {
    setUsername(username);
    setIsAuthenticated(true);
  }

  const handleLogout = () => {
    setUsername('');
    setIsAuthenticated(false);
  }
  return (
    <>
      
      <NavigationBar isAuthenticated={isAuthenticated} username={username} onLogout={handleLogout}/>
        
        <Routes>
          <Route path='/Home' element={<Home/>}></Route>
          <Route path="/login" element={<Login onLogin={handleLogin} />}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/review' element={<Review/>}></Route>
          <Route path='/contact' element={<Contact/>}></Route>
          <Route path='/About' element={<About/>}></Route>
        </Routes>
  
      <Footer/>
      
    </>
  );
}

export default App;
