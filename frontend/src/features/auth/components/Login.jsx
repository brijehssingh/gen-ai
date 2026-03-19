import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();

  // 🔥 If already logged in → go dashboard
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  const handleLogin = (e)=>{
    e.preventDefault();

    // ✅ save token
    localStorage.setItem("token", "dummyToken");

    // ✅ redirect
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-lg">

        <form onSubmit={handleLogin} className="card-body">

          <h2 className="text-2xl font-bold text-center">Login</h2>

          <input
            type="email"
            placeholder="Email"
            className="input input-bordered mt-4"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="input input-bordered mt-2"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button className="btn btn-primary mt-4">Login</button>

          <p className="text-center mt-2">
            Don't have account?
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