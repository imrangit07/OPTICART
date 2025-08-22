
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminLogin.css';
import axios from 'axios';
import { Zoom, toast } from "react-toastify"
const AdminLogin = () => {
  const [adminId, setAdminId] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        'http://localhost:3000/admin/login',
        { adminId, adminPassword },
      );
      // console.log(res.data.adminData);

      localStorage.setItem("admin",res.data.adminData);
      
      toast.success(res.data.message, { transition: Zoom, style: { fontSize: '16px', } });

      navigate("/dashboard");

    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed',
        { transition: Zoom, style: { fontSize: '16px', } });
    }
  };



  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>
      <form className="admin-login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="adminId">Admin ID</label>
          <input
            type="text"
            id="adminId"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
            placeholder="Enter admin ID"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="adminPassword">Password</label>
          <input
            type="password"
            id="adminPassword"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
        </div>

        <button type="submit" className="login-btn">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
