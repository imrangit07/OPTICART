import Sidebar from './Sidebar';
import '../styles/dashboard.css';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function DashboardLayout() {
  return (
    <>
    <Navbar/>
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
    </>
  );
}

export default DashboardLayout;
