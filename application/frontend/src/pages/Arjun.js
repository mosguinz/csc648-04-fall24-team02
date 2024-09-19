import React from 'react'

import ProfilePicture from '../assets/Arjun.jpg';
function Arjun() {
  return (
    <div>
        <h1>Arjun Singh Gill</h1>
        <h2>Backend Lead</h2>
        <img
        src={ProfilePicture}
        alt="Arjun Singh Gill"
        style={{width: '300px', height: 'auto'}}
        />
    </div>
  )
}

export default Arjun
