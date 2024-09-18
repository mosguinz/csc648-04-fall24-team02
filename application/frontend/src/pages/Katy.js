import React from 'react'

import ProfilePicture from '../assets/KatyPFP.png';

function Katy() {
  return (
    <div>
       <img
            src={ProfilePicture}
            alt="Katy Lam"
            style={{width: '300px', height: 'auto'}}
        />
        <h1>Katy Lam</h1>
        <h2>Team Lead</h2>
    </div>
    
  )
}

export default Katy
