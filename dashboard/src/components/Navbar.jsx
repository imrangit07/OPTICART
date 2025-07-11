import '../styles/navbar.css';
import { FiUser, FiBell, FiSearch } from 'react-icons/fi';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-brand">Opticart Dashboard</div>
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
          <FiUser className="user-icon" />
          <span className="username">Admin</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;