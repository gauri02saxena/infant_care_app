import React from "react";
import "./Contact.css";

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
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Services</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Contact Us</h3>
            <p>
              206 Ashok vihar
              <br />
              Sector52,NewDelhi 15101
            </p>
            <p>Email: infantcare24@gmail.com</p>
            <p>Phone: +91 810333XXXX</p>
          </div>
        </div>
      </div>
      <div className="footer-social">
        <a href="#">
          <i className="fab fa-facebook"></i>
        </a>
        <a href="#">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="#">
          <i className="fab fa-instagram"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
