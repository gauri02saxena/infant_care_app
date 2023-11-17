import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import babyImage from './path-to-your-image.jpg'; // Replace with the path to your baby image

const HeaderBar = () => {
  const [infantName, setInfantName] = useState('');

  useEffect(() => {
    // This is where you would fetch the infant's name from the database
    // For now, I will just set a static name
    setInfantName('Charlie');
    // Replace the above line with your actual database fetch logic
  }, []);

  return (
    <div className="header-bar">
      <img src={babyImage} alt="Baby" className="baby-image" />
      <h1>Hello, {infantName}</h1>
    </div>
  );
};

export default HeaderBar;
