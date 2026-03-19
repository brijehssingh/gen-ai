import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./features/auth/components/Signup";
import Login from "./features/auth/components/login";
import User from "./features/auth/components/User ";


function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user" element={<User/>}/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;