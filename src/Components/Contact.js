

import React from 'react';
import './Contact.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <h2>Giggles and Growth</h2>
          <p>Your Caring Partner for Child Development</p>
        </div>
        <div className="footer-links">
          <div className="footer-column">
            <h3>Explore</h3>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Contact</h3>
            <p>1234 Elm Street<br />City, State 12345</p>
            <p>Email: contact@example.com</p>
            <p>Phone: +1 (123) 456-7890</p>
          </div>
        </div>
      </div>
      <div className="footer-social">
        <a href="#"><i className="fab fa-facebook"></i></a>
        <a href="#"><i className="fab fa-twitter"></i></a>
        <a href="#"><i className="fab fa-instagram"></i></a>
      </div>
    </footer>
  );
};

export default Footer;
