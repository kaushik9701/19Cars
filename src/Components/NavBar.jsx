// src/components/Navbar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { Menu, X } from 'lucide-react'; // Optional icon library
import logo from "../assets/logo.jpg"


const Navbar = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-black shadow-md sticky top-0 z-50 text-white">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
      <Link to="/" className="flex items-center">
  <img src={logo} alt="Logo" className="h-10 w-auto" />
</Link>


        {/* Mobile menu button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-indigo-400 transition">
            Home
          </Link>
          <Link to="/contact" className="hover:text-indigo-400 transition">
            Contact
          </Link>

          {currentUser ? (
            <>
              <Link to="/admin/dashboard" className="hover:text-indigo-400 transition">
                Dashboard
              </Link>
              <Link to="/admin/settings" className="hover:text-indigo-400 transition">
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded text-white transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/admin/login"
              className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded transition"
            >
              Admin Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden bg-black px-6 pb-4 space-y-3 text-sm">
          <Link to="/" className="block hover:text-indigo-400" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/contact" className="block hover:text-indigo-400" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>
          {currentUser ? (
            <>
              <Link to="/admin/dashboard" className="block hover:text-indigo-400" onClick={() => setMenuOpen(false)}>
                Dashboard
              </Link>
              <Link to="/admin/settings" className="block hover:text-indigo-400" onClick={() => setMenuOpen(false)}>
                Settings
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="block bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded w-full text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/admin/login"
              className="block bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded w-full text-center"
              onClick={() => setMenuOpen(false)}
            >
              Admin Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
