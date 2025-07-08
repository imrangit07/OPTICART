import { NavLink } from 'react-router-dom';
import { FaSearch, FaHeart, FaBars, FaTimes } from 'react-icons/fa';
import { LuBaggageClaim } from "react-icons/lu";
import { HiUserCircle } from "react-icons/hi";
import '../CSS/Header.css';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import LoginModal from '../pages/Login/LoginModel';

const Header = () => {
  const cartProduct = useSelector(state => state.productCart.products);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
    
    <nav className="navbar">
      <div className='main-logo'>
        <span>OptiCart</span>
      </div>

      <ul className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
        <NavLink
          to="/"
          className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <li className="dropdown">Home</li>
        </NavLink>

        <NavLink
          to="/pages"
          className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <li className="dropdown">Pages</li>
        </NavLink>

        <NavLink
          to="/blog"
          className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <li>Blog</li>
        </NavLink>

        <NavLink
          to="/shop"
          className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <li className="dropdown">Shop</li>
        </NavLink>

        <NavLink
          to="/portfolio"
          className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <li>Portfolio</li>
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <li>Contact</li>
        </NavLink>
      </ul>

      <div className="header-icons">
        <div className='icons'>
          <FaHeart className='head-icon header-heart' />
        </div>
        <NavLink to="/cart">
          <div className='icons'>
            <span className='cart-count'>{cartProduct ? cartProduct.length : 0}</span>
            <LuBaggageClaim className='head-icon header-cart' />
          </div>
        </NavLink>
        <div className='icons'>
          <HiUserCircle 
          className='head-icon header-heart'
          onClick={() => setIsLoginOpen(true)}
          />
        </div>
        <div className="hamburger" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>

    <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};

export default Header;
