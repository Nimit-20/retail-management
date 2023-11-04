import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import Dashboard from './components/Admin Dashboard/Dash';
import Analytics from './components/SidebarPages/Analytics';
import Customers from './components/SidebarPages/Customers';
import Purchases from './components/SidebarPages/Purchases';
import Inventory from './components/SidebarPages/Inventory';
import Employees from './components/SidebarPages/Employees';


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
        <Route path = '/analytics' element ={<Analytics loginDetails={loginDetails}/>}/> 
        <Route path = '/purchases' element ={<Purchases loginDetails={loginDetails}/>}/>  
        <Route path = '/employees' element ={<Employees loginDetails={loginDetails}/>}/>  
        <Route path = '/customers' element ={<Customers loginDetails={loginDetails}/>}/>  
        <Route path = '/inventory' element ={<Inventory loginDetails={loginDetails}/>}/>    
     </Routes>
   </Router>
 );
};

export default App;