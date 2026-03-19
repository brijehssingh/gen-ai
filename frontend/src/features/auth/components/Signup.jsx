import React, { useState } from "react";
import { signupUser } from "../services/api";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate(); // ✅ add this

  const handleSignup = async (e)=>{
    e.preventDefault();

    try{
      const res = await signupUser({
        name,
        email,
        password
      });

      console.log(res.data);

      // ✅ store token (important for ProtectedRoute)
      localStorage.setItem("token", res.data.token || "dummyToken");

      alert("Signup successful");

      // ✅ redirect to dashboard
      navigate("/dashboard");

    }catch(err){
      console.log(err);
      alert("Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">

      <div className="card w-96 bg-base-100 shadow-lg">

        <form onSubmit={handleSignup} className="card-body">

          <h2 className="text-2xl font-bold text-center">
            Signup
          </h2>

          <div className="form-control mt-4">
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              required
            />
          </div>

          <div className="form-control">
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
            Signup
          </button>

          <p className="text-center text-sm mt-3">
            Already have an account?
            <Link to="/" className="text-primary ml-1">
              Login
            </Link>
          </p>

        </form>

      </div>

    </div>
  );
};

export default Signup;