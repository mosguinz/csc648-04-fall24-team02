import React, { useContext } from 'react';
import Logo from "../assets/sfsu.png";
import { Link } from "react-router-dom";
import "../styles/NavBar.css";
import { AuthContext } from '../context/AuthContext';

function NavBar() {
  const { isAuthenticated, username } = useContext(AuthContext); 
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={Logo} alt="SFSU Logo" className="d-inline-block align-text-top logo" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              {isAuthenticated ? (
                <Link className="nav-link" to="/Welcome">Welcome</Link> // Show Welcome page when signed in
              ) : (
                <Link className="nav-link" to="/">Home</Link> // Show Home page when not signed in
              )}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/About">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Game">Game</Link>
            </li>
            <li className="nav-item">
              {isAuthenticated ? (
                <Link className="nav-link" to="/Profile">{username}</Link> // Show Profile when signed in
              ) : (
                <Link className="nav-link" to="/SignIn">Sign In</Link> // Show Sign In when not signed in
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
