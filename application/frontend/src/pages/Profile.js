import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; 
import { useNavigate } from 'react-router-dom'; 
import { Button, Container } from 'react-bootstrap'; // Import Bootstrap Button and Container

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
            <Button 
                variant="warning" 
                onClick={handleLogout} 
                className="mt-4"
            >
                Logout
            </Button>
        </div>
    );
}

export default Profile;
