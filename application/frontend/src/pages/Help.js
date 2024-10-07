import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap'; // Import Bootstrap Button and Container

function Help() {
  const navigate = useNavigate();

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100">
      <h1>HELP.</h1>
      <h2>Womp Womp.</h2>
      <h3>Don't let them get to your head.</h3>
      <h4>Can't end on a Loss!</h4>
      <h5>Try again!</h5>

      {/* Go Back Button */}
      <Button 
        variant="danger" 
        onClick={() => navigate('/SignIn')} 
        className="mt-4"
      >
        I miss her.
      </Button>
    </Container>
  );
}

export default Help;
