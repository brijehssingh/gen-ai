import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./features/auth/components/Login";
import Signup from "./features/auth/components/Signup";
import ProtectedRoute from "./features/auth/components/ProtectedRoute";

import Dashboard from "./features/auth/pages/Dashboard";
import Chat from "./features/auth/pages/Chat";
import Resume from "./features/auth/pages/Resume";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🔓 PUBLIC */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 🔐 PROTECTED */}
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