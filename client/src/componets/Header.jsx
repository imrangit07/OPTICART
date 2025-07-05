import { Link } from 'react-router-dom';
import { FaSearch, FaHeart, FaExchangeAlt } from 'react-icons/fa';
import { LuBaggageClaim } from "react-icons/lu";
import { HiUserCircle } from "react-icons/hi";
import '../CSS/Header.css';
import { useSelector } from 'react-redux';

const Header = () => {
   const cartProduct = useSelector(state=>state.productCart.products);

   console.log("Cart Product : ",cartProduct);
  return (
    <nav className="navbar">
      <div className='main-logo'>
        <span>OptiCart</span>
      </div>
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

      <div className="header-icons">
        <div className='icons'>
          <span className='cart-count'>0</span>
          <FaHeart className='head-icon header-heart' />
        </div>
        <div className='icons'>
          <span className='cart-count'>{cartProduct?cartProduct.length :0}</span>
          <LuBaggageClaim className='head-icon header-cart' />
        </div>
        <div className='icons'>
          {/* <span className='cart-count'>0</span> */}
          <HiUserCircle className='head-icon header-heart' />
        </div>
      </div>
    </nav>
  );
};

export default Header;
