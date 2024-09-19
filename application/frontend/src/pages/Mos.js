import React from 'react'
import MosImg from '../assets/Mos.png';

function Mos() {
  return (
    <div>
        <br /> {/* This adds an empty space before the heading */}
        <h1>
            <a href="https://www.uscis.gov/green-card"> Mos Kullathon </a>
        </h1>
        <h2>Github Master</h2>
        <img 
          src={MosImg} 
          alt="Mos Kullathon" 
          style={{ width: '300px', height: 'auto' }} 
        />
        <h4>Hello, click my name to see what I need! I also like penguins!</h4>
    </div>
  )
}

export default Mos
