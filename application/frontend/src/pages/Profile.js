import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext'; // Import AuthContext
import { useNavigate } from 'react-router-dom';

function Profile() {
  const { username, logout } = useContext(AuthContext); // Get username and logout from context
  const navigate = useNavigate(); // To navigate after logout

  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
    navigate('/SignIn'); // Redirect to the Sign In page
  };

  return (
    <div>
      <h1>Welcome, {username}! This is your profile!</h1>
      <button onClick={handleLogout}>Log Out</button> {/* Log Out button */}
    </div>
  );
}

export default Profile;