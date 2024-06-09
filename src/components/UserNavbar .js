// src/components/UserNavbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { auth } from '../firebaseConfig';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserNavbar.css';

const UserNavbar = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/signin');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/"><h1>Welcome to Ethio Canada Portal</h1></Link>
        <div className="navbar-collapse collapse show" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile">Profile</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about-us">About Us</Link> {/* Added navigation link for About Us */}
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="/signin">Sign In</Link>
            </li> */}
            <li className="nav-item">
              <a className="nav-link" href="https://t.me/abelo1666" target="_blank" rel="noopener noreferrer">Contact us</a>
            </li>
            {currentUser && (
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
