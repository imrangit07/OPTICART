import { useState } from 'react';
import '../styles/navbar.css';
import { FiUser, FiBell, FiSearch } from 'react-icons/fi';
import { GrUserAdmin } from "react-icons/gr";
import mainLogo from "../../public/main-logo/Logo.webp";


function Navbar() {
  const admin = localStorage.getItem("admin");
  
  return (
    <nav className="navbar">
      <div className="navbar-left">
         <div className='main-logo'>
          <span className='logo-text'><img src={mainLogo} alt="Logo" className='logo-img' />PtiCart</span>
        </div>
        <div className="search-bar">
          <FiSearch className="search-icon" />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="navbar-right">
        <div className="notification-bell">
          <FiBell />
          <span className="notification-badge">3</span>
        </div>
        <div className="user-profile">
          <GrUserAdmin className="" />
          <span className="username">{admin?admin:"Admin"}</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;