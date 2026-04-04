import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Destinations from './pages/Destinations';

function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/destinations"
          element={token ? <Destinations /> : <Navigate to="/login" />}
        />
        <Route path="/" element={<Navigate to="/destinations" />} />
      </Routes>
    </Router>
  );
}

export default App;