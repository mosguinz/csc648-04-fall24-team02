import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; 

function CreateAcc() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setIsAuthenticated, setUsername: setGlobalUsername } = useContext(AuthContext); 
  const navigate = useNavigate(); 

  const handleSubmit = (event) => {
    event.preventDefault();

    const passwordValidation = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordValidation.test(password)) {
      alert('Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character.');
      return;
    }

    console.log('Account created:', { username, password });
    alert('Account has been made');
    
    setIsAuthenticated(true);
    setGlobalUsername(username); 
    navigate('/Welcome');
  };

  return (
    <div>
      <br />
      <h1>Create Account</h1>
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
      </form>

      <br />
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
