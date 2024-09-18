import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/About.css';

function About() {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <div className="container mt-5 custom-background">
      <div className="text-center mb-4">
        <h1>About</h1>
        <h2>Meet the Team!</h2>
      </div>

      <div className="row">
        <div className="col-12 mb-2">
          <Button variant="primary" className="w-25 custom-button" onClick={() => handleClick('/Katy')}>Katy</Button>
        </div>
        <div className="col-12 mb-2">
          <Button variant="secondary" className="w-25 custom-button" onClick={() => handleClick('/Kevin')}>Kevin</Button>
        </div>
        <div className="col-12 mb-2">
          <Button variant="success" className="w-25 custom-button" onClick={() => handleClick('/Niko')}>Niko</Button>
        </div>
        <div className="col-12 mb-2">
          <Button variant="danger" className="w-25 custom-button" onClick={() => handleClick('/Arjun')}>Arjun</Button>
        </div>
        <div className="col-12 mb-2">
          <Button variant="warning" className="w-25 custom-button" onClick={() => handleClick('/Matthew')}>Matthew</Button>
        </div>
        <div className="col-12 mb-2">
          <Button variant="info" className="w-25 custom-button" onClick={() => handleClick('/Mos')}>Mos</Button>
        </div>
        <div className="col-12 mb-2">
          <Button className="w-25 custom-button pink-button" onClick={() => handleClick('/Arizza')}>Arizza</Button>
        </div>
      </div>
    </div>
  );
}

export default About;
