import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
function Login() {

     const [username, setUername] = useState("");
     const [password, setPassword] = useState ("");
     
     const [loginStatus, setLoginStatus] = useState("");
    
     const login = () => {
        axios.post("http://localhost:8080/login", {
          username: username,
          password: password,
        }).then((response) => {
            console.log(response.data);
          if (response.data.message) {
            //  setLoginStatus (response.data.message);
            setLoginStatus ("Invalid password");
          } else if (response.data.err){
            //  setLoginStatus (response.data[0].message);
            setLoginStatus ("Error occured, check console.");
         } else {
            setLoginStatus ("Successfully logged in as " + username);
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
               <button onClick={login}>Login</button>
           </div>
           <h1> {loginStatus} </h1>
        </div>
     );
    }

export default Login;
