import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AllOrders.css';
import { useNavigate } from 'react-router-dom';


const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const navigate = useNavigate();
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3000/product/allorders');
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error('Error fetching orders:', err);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading orders...</p>
      </div>
    );
  }

 
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const pendingOrders = orders.filter(order => order.orderStatus === 'Pending').length;

  return (
    <div className="orders-container">
      <h1 className="orders-header">Order Management</h1>

      <div className="summary-cards">
        <div className="summary-card">
          <h3>Total Orders</h3>
          <p>{totalOrders}</p>
        </div>
        <div className="summary-card">
          <h3>Total Revenue</h3>
          <p>₹{totalRevenue.toLocaleString()}</p>
        </div>
        <div className="summary-card">
          <h3>Pending Orders</h3>
          <p>{pendingOrders}</p>
        </div>
      </div>

   
      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Items</th>
              <th>Amount</th>
              <th>Status</th>
              {/* <th>Payment</th> */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="order-id">{order._id.slice(-6)}</td>
                <td>
                  <div className="customer-info">
                    <p className="customer-name">{order.customerId.userName}</p>
                    <p className="customer-email">{order.customerId.userEmail}</p>
                  </div>
                </td>
                <td>
                  {new Date(order.orderDate).toLocaleDateString()}
                  <br />
                  {new Date(order.orderDate).toLocaleTimeString()}
                </td>
                <td>
                  <div className="items-list">
                    {order.items.map((item, index) => (
                      <div key={index} className="item">
                        {item.quantity} × {item.productId.name}
                      </div>
                    ))}
                  </div>
                </td>
                <td>₹{order.totalAmount.toLocaleString()}</td>
                <td>
                  <span className={`status-badge ${order.orderStatus.toLowerCase()}`}>
                    {order.orderStatus}
                  </span>
                </td>
                {/* <td>
                  <span className={`payment-status ${order.paymentStatus.toLowerCase()}`}>
                    {order.paymentStatus}
                  </span>
                </td> */}
                <td>
                  <button className="action-btn view-btn"
                  onClick={()=>{navigate(`/dashboard/update/${order._id}`)}}
                  >View</button>
                  {/* <button className="action-btn edit-btn">Update</button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllOrders;