import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/Login';


const App = () => {
 return (
   <Router>
     <Routes>
       <Route exact path='/' element={<Login />} />
       {/* <Route path='/admin' element={<AdminDashboard />} />
       <Route path='/dash' element={<AdminDashboard />} /> */}
     </Routes>
   </Router>
 );
};

export default App;