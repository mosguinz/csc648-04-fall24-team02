import React, { useState } from 'react';
import Cookie from "../assets/cookie.png";
import '../styles/Game.css'; //Added a CSS file for styling

function Game() {
  const [cookieCount, setCookieCount] = useState(0);
  const [cookiesPerClick, setCookiesPerClick] = useState(1);

  const handleClick = () => {
    setCookieCount(cookieCount + cookiesPerClick);
  };

  const handleUpgrade = () => {
    if (cookieCount >= 10) {
      setCookieCount(cookieCount - 10);
      setCookiesPerClick(cookiesPerClick + 1);
    }
  };

  return (
    <div className="cookie-clicker-game">
      <h1>Cookie Clicker Game</h1>
      <div className="cookie-container">
        <img
          src={Cookie}
          alt="Cookie"
          onClick={handleClick}
          className="cookie"
        />
      </div>
      <p>Cookies: {cookieCount}</p>
      <button onClick={handleUpgrade}>Upgrade (10 Cookies)</button>
    </div>
  );
}

export default Game;