import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; 
import { useNavigate } from 'react-router-dom'; 

function Profile() {
    const { username, logout } = useContext(AuthContext); 
    const navigate = useNavigate(); 

    const handleLogout = () => {
        logout(); 
        navigate('/SignIn'); 
    };

    return (
        <div>
            <br />
            <h1>{username}'s Profile</h1> {/* Display the username */}
            <br />
            <button onClick={handleLogout}>Logout</button> {/* Logout button */}
        </div>
    );
}

export default Profile;
