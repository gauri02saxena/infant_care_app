// src/components/Header.jsx

import React from 'react';
import './Header.css'; // Import the CSS for styling
import profileImage from './profile.jpg'; // Import the image

const Header = () => {
  return (
    <div className="header">
      <img
        src={profileImage} // Use the imported image here
        alt="Profile"
        className="profile-image"
      />
      <h2>Welcome!</h2>
    </div>
  );
};

export default Header;
