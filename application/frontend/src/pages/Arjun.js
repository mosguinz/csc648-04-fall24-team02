import React from 'react'

import ProfilePicture from '../assets/Arjun.jpg';
function Arjun() {
  return (
    <div>
      <img
        src={ProfilePicture}
        alt="Matthew Weesner"
        style={{width: '500px', height: 'auto'}}
      />
      <h1>Arjun Singh Gill</h1>
      <h2>Backend Lead</h2>
    </div>
  )
}

export default Arjun
