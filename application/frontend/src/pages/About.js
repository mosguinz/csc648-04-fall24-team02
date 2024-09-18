import React from 'react';
import { useNavigate } from 'react-router-dom';

function About() {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <div>
      <h1>About</h1>
      <h2>Meet the Team!</h2>

      <div className="button-container">
        <button onClick={() => handleClick('/Katy')}>Katy</button>
        <button onClick={() => handleClick('/Kevin')}>Kevin</button>
        <button onClick={() => handleClick('/Niko')}>Niko</button>
        <button onClick={() => handleClick('/Arjun')}>Arjun</button>
        <button onClick={() => handleClick('/Matthew')}>Matthew</button>
        <button onClick={() => handleClick('/Mos')}>Mos</button>
        <button onClick={() => handleClick('/Arizza')}>Arizza</button>
      </div>
    </div>
  );
}

export default About;
