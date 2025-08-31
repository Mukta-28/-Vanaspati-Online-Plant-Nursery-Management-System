import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import './Footer.css'; // create this file next

const Footer = () => {
  return (
    <footer className="footer">
      <div className="about-vanaspati">
        <h2>🌿 About वनस्पति</h2>
        <p>
          Vanaspati (वनस्पति) is your green companion and trusted destination for all things plants. Born out of a love for nature, Vanaspati brings the joy of gardening to every doorstep with a curated selection of indoor plants, outdoor greens, flowering varieties, succulents, and air-purifying plants  all carefully nurtured and ready to thrive in your space.
        </p>
      </div>
      <div className="footer-columns">
        <div>
          <h4>About Us</h4>
          <ul>
            
            <li>Contact Us</li>
         
          </ul>
        </div>
       
        <div>
          <h4>Get In Touch</h4>
          <ul>
            <li>Contact: +91-9112312423</li>
            <li>Email: support@vanaspati.com</li>
          </ul>
        </div>
        <div>
          <h4>Follow Us</h4>
          <ul className="social-icons">
            <li><FaInstagram /> vanaspati_ig</li>
            <li><FaTwitter /> vanaspati.co</li>
            <li><FaLinkedin /> vanaspati_shop</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
