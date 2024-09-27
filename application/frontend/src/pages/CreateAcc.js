import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateAcc() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = (event) => {
    event.preventDefault();

    const passwordValidation = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordValidation.test(password)) {
      alert('Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character.');
      return;
    }

    // check back end for registration
    console.log('Account created:', { username, password });
    alert('Account has been made');
    
    navigate('/Welcome');
  };

  return (
    <div>
      <br /> {/* This adds an empty space */}
      <h1>Create Account</h1>
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
      </form>

      <br /> {/* This adds an empty space */}

      {/* Already Have an Account link */}
      <button 
        type="button" 
        onClick={() => navigate('/SignIn')} 
      >
        Already Have an Account?
      </button>
    </div>
  );
}

export default CreateAcc;