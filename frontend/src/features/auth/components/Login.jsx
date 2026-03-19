import React, { useState } from "react";
import { Link } from "react-router-dom";
const Login = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = (e)=>{
    e.preventDefault();
    console.log({email,password});
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">

      <div className="card w-96 bg-base-100 shadow-lg">

        <form onSubmit={handleLogin} className="card-body">

          <h2 className="text-2xl font-bold text-center">
            Login
          </h2>

          <div className="form-control mt-4">
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-control">
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-primary mt-4">
            Login
          </button>

          <p className="text-center text-sm mt-3">
            Don't have an account?
           <Link to="/signup" className="text-primary ml-1">
  Signup
</Link>
          </p>

        </form>

      </div>

    </div>
  );
};

export default Login;