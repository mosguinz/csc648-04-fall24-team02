import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Button, Form, Container, Card } from 'react-bootstrap';

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
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card style={{ width: '25rem' }} className="p-4">
        <Card.Body>
          <h1 className="text-center mb-4">Create Account</h1>

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
              <Form.Text className="text-muted">
                Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character.
              </Form.Text>
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="success" type="submit">
                Create Account ➺
              </Button>
            </div>
          </Form>

          <div className="text-center mt-3">
            <Button variant="link" onClick={() => navigate('/SignIn')}>
              Already Have an Account?
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default CreateAcc;
