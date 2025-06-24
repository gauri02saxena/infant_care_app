import React from 'react';
import './Header.css'; 
import profileImage from './profile.jpg'; 

const Header = () => {
  return (
    <div className="header">
      <img
        src={profileImage} 
        alt="Profile"
        className="profile-image"
      />
      <h2>Welcome!</h2>
    </div>
  );
};

export default Header;
