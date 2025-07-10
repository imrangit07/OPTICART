import React from 'react';
import '../CSS/Footer.css'; 
import mainLogo from '../../public/main-logo/Logo.webp'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

      
        <div className="footer-section about">
          <div className='main-footer-logo'>

          <img src={mainLogo} alt="OptiCart Logo" className="footer-logo" />
          <span className='footer-logo-text'>PtiCart</span>
  
          </div>
          <p>OptiCart — your trusted online eyewear store. Stylish, affordable, and delivered with care.</p>
        </div>

        <div className="footer-section links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/shop">Shop</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section contact">
          <h4>Contact Us</h4>
          <p>Email: support@opticart.com</p>
          <p>Phone: +91 221-675-90XX</p>
          <p>Address: 123 MP Nagar, Bhopal</p>
        </div>

        {/* Social Icons */}
        <div className="footer-section social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} OptiCart. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
