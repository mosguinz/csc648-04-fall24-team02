import React from 'react'
import NikoImg from "../assets/Niko.png";

function Niko() {
  return (
    <div>
        <br /> {/* This adds an empty space before the heading */}
        <h1>Niko Galedo</h1>
        <h2>Front End</h2>
        <img 
          src={NikoImg} 
          alt="Niko Galedo" 
          style={{ width: '400px', height: 'auto' }} 
        />
    </div>
  )
}

export default Niko
