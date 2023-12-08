import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { useState } from 'react'
import { useSelector } from 'react-redux';

import Login from './pages/Login';
import Profile from './pages/Profile';
import Home from "./pages/Home";
import Register from "./pages/Register";
import GraphComponent from './pages/components/GraphComponent';
import UserGraphComponent from './pages/components/UserGraphComponent';

function App() {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<>{user ? <Home /> : <Login />}</>} />
        <Route path="/register" element={<Register />} />
        <Route path="/perfil/:username" element={<Profile />} />
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/social-network" element={<GraphComponent />} />
        <Route path="/user-centered-graph" element={<UserGraphComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
