import { Link } from 'react-router-dom';
import '../CSS/Header.css';

const Header = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <Link to="/" >
        <li className="nav-item dropdown">
          Home <span className="arrow"></span>
        </li>
        </Link>
         <Link to="/pages" >
        <li className="nav-item dropdown">
          Pages <span className="arrow"></span>
        </li>
        </Link>
         <Link to="/blog" >
        <li className="nav-item">Blog</li>
        </Link>
         <Link to="/shop" >
        <li className="nav-item dropdown">
          Shop <span className="arrow"></span>
        </li>
        </Link>
         <Link to="/portfolio" >
        <li className="nav-item">Portfolio</li>
        </Link>
         <Link to="/contact" >
        <li className="nav-item">Contact</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Header;
