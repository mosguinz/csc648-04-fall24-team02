import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; 

function Welcome() {
  const { username } = useContext(AuthContext); 

  return (
    <div>
      <br />
      <h1>Welcome, {username}!</h1> {/* Display the username */}
      <br />
      <p style={{ marginTop: '20px', fontStyle: 'italic' }}>
        made with love from @Software-Engineering-Class-SFSU.Section-04.Team-02
      </p> {/* Subtext: please put at the bottom left or right wherever looks pretty, like a water mark at the bottom. */}
    </div>
  );
}

export default Welcome;
