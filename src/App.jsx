import { useState } from 'react';
import NavigationBar from './Components/navigation';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/login';
import Signup from './Components/signup';
import './App.css';
import Footer from './Components/footer';
function App() {
  

  return (
    <>
      
        <NavigationBar />
        <Routes>
          <Route path='/Home' element={<Home/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
        </Routes>
      <Footer/>
      
    </>
  );
}

export default App;
