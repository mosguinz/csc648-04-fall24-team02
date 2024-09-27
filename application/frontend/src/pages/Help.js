import React from 'react';
import { useNavigate } from 'react-router-dom';

function Help() {
  const navigate = useNavigate(); 

  return (
    <div>
      <br /> {/* This adds an empty space */}
      <h1>HELP.</h1>
      <h2>Womp Womp.</h2>
      <h3>Don't let them get to your head.</h3>
      <h4>Can't end on a Loss!</h4>
      <h5>Try again!</h5>

      <form>
        {/* Go Back */}
        <button 
          type="button" 
          onClick={() => navigate('/SignIn')} 
        >
          You miss her.
        </button>
      </form>
    </div>
  );
}

export default Help;
