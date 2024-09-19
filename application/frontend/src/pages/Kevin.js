import React from 'react'
import KevinImg from '../assets/Kevin.png';

function Kevin() {
  return (
    <div>
        <br /> {/* This adds an empty space before the heading */}
        <h1>
            <a href="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.dexerto.com%2Fcdn-cgi%2Fimage%2Fwidth%3D3840%2Cquality%3D75%2Cformat%3Dauto%2Fhttps%3A%2F%2Feditors.dexerto.com%2Fwp-content%2Fuploads%2F2023%2F06%2F28%2Famong-us-vr.jpg&f=1&nofb=1&ipt=c915298bc7f023d6ac6a957b245fe419c0128c21f233116b5f24c4c05a1276dc&ipo=images">
                Kevin Lam
            </a>
        </h1>
        <h2>Front End</h2>
        <img 
          src={KevinImg} 
          alt="Kevin Lam" 
          style={{ width: '500px', height: 'auto' }} 
        />
        <h4>erm what the sigma!</h4>
    </div>
  )
}

export default Kevin
