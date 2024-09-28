import React,{useContext} from 'react'; // added the useContext importation
import Logo from "../assets/sfsu.png";
import { Link } from "react-router-dom";
import "../styles/NavBar.css";
import { AuthContext } from '../AuthContext';

function NavBar() {
  const { isAuthenticated, logout } = useContext(AuthContext); // using useContext

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
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/About">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Game">Game</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/More">More</Link>
            </li>
             {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/Profile">Profile</Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn" onClick={logout}>Log Out</button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/SignIn">Sign In</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
