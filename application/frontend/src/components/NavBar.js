import React from 'react'
import Logo from "../assets/sfsu.png";
import {Link} from "react-router-dom";
import "../styles/NavBar.css";

function NavBar() {
  return (
    <div className="NavBar">
        <div className="left side">
            {/* <img src={Logo} alt="TEST SFSU" /> */}
        </div>
      <div className="right side">
        <Link to="/"> Home </Link>
        <Link to="/About"> About </Link>
        <Link to="/Game"> Game </Link>
        <Link to="/More"> More </Link>
      </div>
    </div>
  )
}

export default NavBar
