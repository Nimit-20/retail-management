import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Login from './components/Login';


const App = () => {
 return (
   <Router>
     <Routes>
       <Route exact path='/' element={<Login />} />
     </Routes>
   </Router>

 );
};

export default App;