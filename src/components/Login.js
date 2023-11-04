import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";
function Login({ onLogin }) {

     const [username, setUername] = useState("");
     const [password, setPassword] = useState ("");
     
     const [loginStatus, setLoginStatus] = useState("");
    
      // press enter to login
      useEffect(() => { // dont have to press button now, can just hit enter
         const listener = event => {
           if (event.code === "Enter" || event.code === "NumpadEnter") {
             console.log("Enter key was pressed. Run your function.");
             event.preventDefault();
             login()
           }
         };
         document.addEventListener("keydown", listener);
         return () => {
           document.removeEventListener("keydown", listener);
         };
       } );

     const navigate = useNavigate();
     const login = () => {
        axios.post("http://localhost:8080/login", {
          username: username,
          password: password,
        }).then((response) => {
            console.log(response.data);
          if (response.data.message) {
            setLoginStatus ("Invalid password");
          } else if (response.data.err){
            setLoginStatus ("Error occured, check console.");
         } else {
            const loginDetails = response.data.rows[0];
            onLogin(loginDetails)
            setLoginStatus ("Successfully logged in as " + username);
            navigate("/dashboard")
         }
       });
     };
     
     return (
        <div className="App">
           <div className="login">
               <h1>Login</h1>
               <input
                  type="text"
                  placeholder="Username…"
                  onChange = { (e) => {
                     setUername (e.target.value);
                  }}
                  /> <br/>
               <input
                  type="password"
                  placeholder="Password…"
                  onChange = { (e) => {
                     setPassword (e.target.value);
                  }}
               />
               <button className = 'btn' onClick={login}>Login</button>
           </div>
           <h1> {loginStatus} </h1>
        </div>
     );
    }

export default Login;
