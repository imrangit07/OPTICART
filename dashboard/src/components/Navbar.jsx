import React from 'react';
import '../styles/navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">E-Commerce Dashboard</div>
      <div className="navbar-user">Admin</div>
    </nav>
  );
}

export default Navbar;