import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; 

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setIsAuthenticated, setUsername: setGlobalUsername } = useContext(AuthContext); // Update context
  const navigate = useNavigate(); 

  const handleSubmit = (event) => {
    event.preventDefault(); 

    const correctUsername = 'urmom';
    const correctPassword = 'urmom';

    if (username === correctUsername && password === correctPassword) {
      alert("You're signed in!");
      setIsAuthenticated(true); 
      setGlobalUsername(username); 
      navigate('/Welcome');
    } else {
      alert("Incorrect username/password");
    }
  };

  const handleCantSignIn = () => {
    alert("Damn that sucks...just take the L");
    navigate('/L'); 
  };

  return (
    <div>
      <br />
      <h1>Sign In</h1>
      <br />

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="username"
            required
          />
        </div>
        
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="password"
            required
          />
        </div>
        
        <button type="submit">➺</button>

        <br />
        <br />

        <button type="button" onClick={handleCantSignIn}>
          Can't Sign In?
        </button>

        <br />
        <button 
          type="button" 
          onClick={() => navigate('/create-account')} 
        >
          Create Account
        </button>
      </form>
    </div>
  );
}

export default SignIn;
