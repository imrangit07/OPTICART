import { NavLink } from 'react-router-dom';
import { FaSearch, FaHeart, FaBars, FaTimes } from 'react-icons/fa';
import { LuBaggageClaim } from "react-icons/lu";
import { HiUserCircle } from "react-icons/hi";
import { FaRegUserCircle } from "react-icons/fa";
import { IoHeartOutline } from "react-icons/io5";
import { MdDriveFolderUpload } from "react-icons/md";
import { BiHeartCircle } from "react-icons/bi";
import { IoMdExit } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import '../CSS/Header.css';

import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../slice/userSlice';

import { useState, useEffect } from 'react';

import LoginModal from '../pages/Login/LoginModel';
import mainLogo from "../../public/main-logo/Logo.webp";

import BackendURL from '../config/backendURL';

import axios from 'axios';

const Header = () => {
  const cartProduct = useSelector(state => state.productCart.products);
  const user = useSelector(state => state.loginUser.user);

  const dispatch = useDispatch();

  // console.log("Header-- : ", user);


  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const [user, setUser] = useState()

  // const user = JSON.parse(localStorage.getItem("currentUser"))
  const currentUser = async () => {
    try {
      const res = await axios.post(`${BackendURL}/user/current`, {},
        { withCredentials: true });
      setUser(res.data.user.userName);
    } catch (error) {
      console.log(error.response.data.message);
    }
  }


  const userLogout = async () => {
    try {
      const res = await axios.post(`${BackendURL}/user/logout`, {},
        { withCredentials: true });

      dispatch(removeUser());
      alert(res.data.message);
      currentUser();

    } catch (error) {
      alert(error);
    }
  }
  useEffect(() => {
    currentUser();
  }, []);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>

      <nav className="navbar">
        <div className='main-logo'>
          <span className='logo-text'><img src={mainLogo} alt="Logo" className='logo-img' />PtiCart</span>
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
            <div className='user-icons'
              onMouseEnter={() => setIsDropdownOpen(true)} //  Open dropdown on hover
              onMouseLeave={() => setIsDropdownOpen(false)} // 
            >
              <FaRegUserCircle
                className='head-icon header-heart'
              />
              <div className='icons-text'>
              {user ?
                <>
                  <span className='user-name'>{user.userName}</span>
                </>
                :
                "Login"
              }
              <FaAngleDown id='drop-icon' />
              </div>

              {/* DROPDOWN MENU */}
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <ul>
                    <li className='dropdown-li' onClick={() => setIsLoginOpen(true)}> <FaRegUserCircle /> <span>Login/Register</span></li>
                    <li className='dropdown-li'><MdDriveFolderUpload /> <span>My Orders</span></li>
                    <li className='dropdown-li'><BiHeartCircle /> <span>Wishlist</span></li>
                    <li className='dropdown-li'
                      onClick={userLogout}
                    ><IoMdExit /><span>Logout</span></li>
                  </ul>
                </div>
              )}
            </div>

          </div>

          <div className='icons'>
            <div className='user-icons'>
              <span className='cart-count'>0</span>

              <IoHeartOutline className='head-icon header-heart' />
              <span className='icons-text'>Wishlist</span>
            </div>
          </div>
          <NavLink to="/cart" className="all-nav-link">
            <div className='icons'>
              <div className='user-icons'>

                <span className='cart-count'>{cartProduct ? cartProduct.length : 0}</span>
                <LuBaggageClaim className='head-icon header-cart' />

                <span className='icons-text'>Cart</span>
              </div>
            </div>
          </NavLink>

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
