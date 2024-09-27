import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [staySignedIn, setStaySignedIn] = useState(false); 
  const navigate = useNavigate(); 

  const handleSubmit = (event) => {
    event.preventDefault(); 
    console.log('Username:', username);
    console.log('Password:', password);
  };

  {/* Can navigate to a help page if we want or we can remove this whole function as well, just added for giggles */}
  const handleCantSignIn = () => {
    alert("Damn that sucks...just take the L");
    navigate('/L'); 
  };

  return (
    <div>
      <br /> {/* This adds an empty space */}
      <h1>Sign In</h1>
      <br /> {/* This adds an empty space */}

      <form onSubmit={handleSubmit}>
        {/* Username field */}
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
        
        {/* Password field */}
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
        
        {/* Submit button */}
        <button type="submit">➺</button>

        <br /> {/* This adds an empty space */}
        <br /> {/* This adds an empty space */}

        {/* Can't Sign In button */}
        <button type="button" onClick={handleCantSignIn}>
          Can't Sign In?
        </button>

        <br /> {/* This adds an empty space */}

        {/* Create Account button */}
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