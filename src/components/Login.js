import React from "react";

const Login = () => {
     return (
          <div className="login">
               <h1>Admin Login</h1>
               <input type="text" placeholder="Username" /> <br />
               <input type="password" placeholder="Password" /> <br />
               <button> Login </button>
          </div>
     );
};

export default Login;
