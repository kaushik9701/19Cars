import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

 // ✅ Import the provider

import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminSettings from './pages/AdminSettings';
import Navbar from './Components/NavBar';
import Home from './pages/HomePage';
import { AuthProvider } from './Context/AuthContext';
import Contact from './pages/ContactPage';
import ProtectedRoute from './Utils/ProtectedRoutes';
// src/App.js or wherever your routes are defined


function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Wrap all protected admin routes */}
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/settings" 
            element={
              <ProtectedRoute>
                <AdminSettings />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

