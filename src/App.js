import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import Dashboard from './components/Admin Dashboard/Dash';


const App = () => {
  const [loginDetails, setloginDetails] = useState(null);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const handleLogin = (loginDetails) => {
    setloginDetails(loginDetails);
    setisLoggedIn(true);
  };
 return (
   <Router>
     <Routes>
       <Route exact path='/' element={<Login onLogin={handleLogin}/>} />
        <Route path = '/dashboard' element ={<Dashboard isLoggedIn = {isLoggedIn} loginDetails={loginDetails}/>} />     
       
     </Routes>
   </Router>
 );
};

export default App;