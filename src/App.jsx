import { useState } from 'react';
import NavigationBar from './Components/navigation';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/login';
import Signup from './Components/signup';
import Review from './Components/review';
import Contact from './Components/contact';
import About from './Components/about';
import UserDashboard from './Components/userDashboard';
import './App.css';
import Footer from './Components/footer';
import { logout } from './cookie';
import AppliedForAddoption from './Components/AppliedForAddoption';
import PetAdoptionList from './Components/PetAdoptionList';
import Registerpet from './Components/RegisterPets';
import UserAppliedAddoption from './Components/userAppliedAddoption';
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
    logout();

  }
  return (
    <>
      
      <NavigationBar isAuthenticated={isAuthenticated} username={username} onLogout={handleLogout}/>
        
        <Routes>
          <Route path='/' element={<Home onLogin={handleLogin}/>}></Route>
          <Route path="/login" element={<Login onLogin={handleLogin} />}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/review' element={<Review/>}></Route>
          <Route path='/contact' element={<Contact/>}></Route>
          <Route path='/About' element={<About/>}></Route>
          <Route path='/userDashboard' element={<UserDashboard username={username} onLogout={handleLogout}/>}></Route>
          <Route path='/AppliedForAddoption' element={<AppliedForAddoption username={username} onLogout={handleLogout}/>}></Route>
          <Route path="/Registerpet" element={<Registerpet username={username} onLogout={handleLogout}/>}></Route>
          <Route path="/PetAdoptionList" element={<PetAdoptionList username={username} onLogout={handleLogout}/>}></Route>
          <Route path="/userAppliedAddoption" element={<UserAppliedAddoption username={username} onLogout={handleLogout}/>}></Route>
        </Routes>

      <Footer/>
      
    </>
  );
}

export default App;
