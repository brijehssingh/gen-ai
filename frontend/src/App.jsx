import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./features/auth/components/Signup";
import Login from "./features/auth/components/Login";
import User from "./features/auth/components/User";
import ProtectedRoute from "./features/auth/components/ProtectedRoute";

import Chat from "./features/auth/pages/Chat";
import Resume from "./features/auth/pages/Resume";
import Dashboard from "./features/auth/pages/Dashboard";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* PROTECTED ROUTES */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />

        <Route
          path="/resume"
          element={
            <ProtectedRoute>
              <Resume />
            </ProtectedRoute>
          }
        />

       

      </Routes>
    </BrowserRouter>
  );
}

export default App;