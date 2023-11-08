import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import Dashboard from './components/Admin Dashboard/Dash';
import Analytics from './components/SidebarPages/Analytics';
import Purchases from './components/SidebarPages/Purchases';
import Inventory from './components/SidebarPages/Inventory';
import Employees from './components/SidebarPages/Employees';
import Orders from './components/SidebarPages/Orders';
import Alerts from './components/SidebarPages/Alerts';
import AddPurchase from './components/SidebarPages/AddPurchase';


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
        <Route path = '/inventory' element ={<Inventory loginDetails={loginDetails}/>}/>
        <Route path = '/orders' element ={<Orders loginDetails={loginDetails}/>}/>     
        <Route path = '/alerts' element ={<Alerts loginDetails={loginDetails}/>}/>  
        <Route path = '/add-purchase' element ={<AddPurchase/>}/>  

     </Routes>
   </Router>
 );
};

export default App;