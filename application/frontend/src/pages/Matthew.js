import React from 'react';

// Import the image from the assets folder
import ProfilePicture from '../assets/Matt.jpg';

function Matthew() {
  return (
    <div>
      <h1>Matthew Weesner</h1>
        <img
            src={ProfilePicture}
            alt="Matthew Weesner"
            style={{width: '500px', height: 'auto'}}
        />
    </div>
  );
}

export default Matthew;
