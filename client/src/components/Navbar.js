import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link className="navbar-logo" to="/">
          iNotebook
        </Link>
        <div className={`menu-icon ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link
              className={`nav-link ${location.pathname === "/mynotes" ? "active" : ""}`}
              to="/mynotes"
              onClick={toggleMenu}
            >
              My Notes
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}
              to="/about"
              onClick={toggleMenu}
            >
              About
            </Link>
          </li>
        </ul>
        <div className="nav-auth">
          {localStorage.getItem('token') === null ? (
            <>
              <Link to="/login" className="auth-btn login" onClick={toggleMenu}>
                Login
              </Link>
              <Link to="/signup" className="auth-btn signup" onClick={toggleMenu}>
                Signup
              </Link>
            </>
          ) : (
            <button className="auth-btn logout" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}