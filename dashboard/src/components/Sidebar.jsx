import React from 'react';
import '../styles/sidebar.css';

function Sidebar({ setActiveView }) {
  return (
    <div className="sidebar">
      <ul>
        <li onClick={() => setActiveView('products')}>Products</li>
        <li onClick={() => setActiveView('add')}>Add Product</li>
        <li>Orders</li>
        <li>Customers</li>
        <li>Analytics</li>
      </ul>
    </div>
  );
}

export default Sidebar;