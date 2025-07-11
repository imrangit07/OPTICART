import Sidebar from './Sidebar';
import '../styles/dashboard.css';
import { Outlet } from 'react-router-dom';

function DashboardLayout() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
