import { Link, useLocation } from 'react-router-dom';
import '../styles/sidebar.css';
import { 
  FiGrid, 
  FiPlusSquare, 
  FiShoppingBag,
  FiUsers,
  FiSettings,
  FiLogOut
} from 'react-icons/fi';

function Sidebar() {
  const location = useLocation();
  
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Opticart</h3>
      </div>
      <ul className="sidebar-menu">
        <li className={location.pathname === '/dashboard' ? 'active' : ''}>
          <Link to="/dashboard">
            <FiGrid className="icon" />
            <span>Dashboard</span>
          </Link>
        </li>
        {/* <li className={location.pathname === '/dashboard/products' ? 'active' : ''}>
          <Link to="/dashboard/products">
            <FiShoppingBag className="icon" />
            <span>Products</span>
          </Link>
        </li> */}
        <li className={location.pathname === '/dashboard/add' ? 'active' : ''}>
          <Link to="/dashboard/add">
            <FiPlusSquare className="icon" />
            <span>Add Product</span>
          </Link>
        </li>
        <li className={location.pathname === '/dashboard/orders' ? 'active' : ''}>
          <Link to="/dashboard/orders">
            <FiUsers className="icon" />
            <span>Orders</span>
          </Link>
        </li>
        <li className={location.pathname === '/dashboard/customers' ? 'active' : ''}>
          <Link to="/dashboard/customers">
            <FiUsers className="icon" />
            <span>Customers</span>
          </Link>
        </li>
      </ul>
      <div className="sidebar-footer">
        <ul className="sidebar-menu">
          <li>
            <Link to="/dashboard">
              <FiSettings className="icon" />
              <span>Settings</span>
            </Link>
          </li>
          <li  >
            <Link  onClick={()=>{localStorage.removeItem("admin")}} to="/">
              <FiLogOut className="icon" />
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;