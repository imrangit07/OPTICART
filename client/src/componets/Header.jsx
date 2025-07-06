import { Link } from 'react-router-dom';
import { FaSearch, FaHeart, FaBars, FaTimes } from 'react-icons/fa';
import { LuBaggageClaim } from "react-icons/lu";
import { HiUserCircle } from "react-icons/hi";
import '../CSS/Header.css';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const Header = () => {
  const cartProduct = useSelector(state => state.productCart.products);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className='main-logo'>
        <span>OptiCart</span>
      </div>

      <ul className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
          <li className="nav-item dropdown">Home</li>
        </Link>
        <Link to="/pages" onClick={() => setIsMobileMenuOpen(false)}>
          <li className="nav-item dropdown">Pages</li>
        </Link>
        <Link to="/blog" onClick={() => setIsMobileMenuOpen(false)}>
          <li className="nav-item">Blog</li>
        </Link>
        <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)}>
          <li className="nav-item dropdown">Shop</li>
        </Link>
        <Link to="/portfolio" onClick={() => setIsMobileMenuOpen(false)}>
          <li className="nav-item">Portfolio</li>
        </Link>
        <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
          <li className="nav-item">Contact</li>
        </Link>
      </ul>

      <div className="header-icons">
        <div className='icons'>
          <FaHeart className='head-icon header-heart' />
        </div>
        <Link to="/cart">
          <div className='icons'>
            <span className='cart-count'>{cartProduct ? cartProduct.length : 0}</span>
            <LuBaggageClaim className='head-icon header-cart' />
          </div>
        </Link>
        <div className='icons'>
          <HiUserCircle className='head-icon header-heart' />
        </div>
        <div className="hamburger" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
  );
};

export default Header;
