import React from 'react'

import pfp from '../assets/Nikopfp.jpg'
function Niko() {
  return (
    <div>
      <h>Niko Galedo</h>
      <p>Hey there I'm Niko and I am one of the front-end developers for our team!</p>
      <img 
        src ={pfp} 
        style={{width: '300px', height: 'auto'}}
      /> 
      
    </div>
  )
}

export default Niko
