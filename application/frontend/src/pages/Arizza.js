import React from 'react';
import ArizzaImg from '../assets/Arizza.png';

function Arizza() {
  return (
    <div>
        <br /> {/* This adds an empty space before the heading */}
        <h1>
            <a href="https://tracker.gg/valorant/profile/riot/rizzabears%23NA1/overview"> Arizza Cristobal </a>
        </h1>
        <h2>Scrum Master</h2>
        <img 
          src={ArizzaImg} 
          alt="Arizza Cristobal" 
          style={{ width: '300px', height: 'auto' }} 
        />
        <h4>click my name!</h4>
    </div>
  );
}

export default Arizza;
