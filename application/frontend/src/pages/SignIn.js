import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap'; 

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setIsAuthenticated, setUsername: setGlobalUsername } = useContext(AuthContext);
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
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card style={{ width: '25rem' }} className="p-4">
        <Card.Body>
          <h1 className="text-center mb-4">Sign In</h1>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
              />
            </Form.Group>

            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">
                Sign In ➺
              </Button>
            </div>

            <div className="mt-3 text-center">
              <Button variant="link" onClick={handleCantSignIn}>
                Can't Sign In?
              </Button>
            </div>

            <div className="text-center mt-3">
              <Button 
                variant="outline-secondary" 
                onClick={() => navigate('/create-account')} 
              >
                Create Account
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default SignIn;
