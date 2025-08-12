import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../CSS/MyOrder.css";
import { useSelector } from "react-redux";
import BackendURL from '../../config/backendURL';

const MyOrder = () => {
  const currentUser = useSelector((state) => state.loginUser.user);
  const customerId = currentUser?.id;

  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(1); 
  const ordersPerPage = 3; 

  const handleStatusChange = (status) => {
    setSelectedStatus(selectedStatus === status ? null : status);
    setCurrentPage(1); 
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${BackendURL}/product/myorders/?customerId=${customerId}`);
        setOrders(res.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = Array.isArray(orders)
    ? orders
        .filter(order => !selectedStatus || order.orderStatus === selectedStatus)
        .map(order => ({
          ...order,
          items: order.items.filter(item =>
            item.productId.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        }))
        .filter(order => order.items.length > 0)
    : [];


  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage); 
  const indexOfLast = currentPage * ordersPerPage; 
  const indexOfFirst = indexOfLast - ordersPerPage; 
  const currentOrders = filteredOrders.slice(indexOfFirst, indexOfLast); 

  const goToPage = (pageNum) => setCurrentPage(pageNum); 
  const nextPage = () => currentPage < totalPages && setCurrentPage(prev => prev + 1); 
  const prevPage = () => currentPage > 1 && setCurrentPage(prev => prev - 1); 

  return (
    <div className="page-container">
      <div className="filter-section">
        <h1>Filters</h1>
        <div className="filter-box">
          <div className="order-status-filter">
            <h3>ORDER STATUS</h3>
            <form>
              {['Pending', 'Processing', 'Packed', 'Out for Delivery', 'Completed', 'Cancelled'].map(status => (
                <label key={status}>
                  <input
                    type="radio"
                    name="orderStatus"
                    checked={selectedStatus === status}
                    onChange={() => handleStatusChange(status)}
                  />
                  <span className="filter-text">{status}</span>
                </label>
              ))}
            </form>
          </div>

          <div className="order-time-filter">
            <h3>ORDER TIME</h3>
            <form>
              <label><input type="checkbox" name="weekday" /><span className="filter-text">This Week</span></label>
              <label><input type="checkbox" name="last30days" /><span className="filter-text">Last 30 Days</span></label>
              <label><input type="checkbox" name="in2024" /><span className="filter-text">2024</span></label>
              <label><input type="checkbox" name="in2023" /><span className="filter-text">2023</span></label>
              <label><input type="checkbox" name="in2022" /><span className="filter-text">2022</span></label>
              <label><input type="checkbox" name="in2021" /><span className="filter-text">2021</span></label>
              <label><input type="checkbox" name="in2020" /><span className="filter-text">2020</span></label>
            </form>
          </div>
        </div>
      </div>

      <div className="order-section">
        <div className="order-search">
          <input
            type="text"
            placeholder="Search for an order..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); 
            }}
          />
          <span>Search Orders</span>
        </div>

        {currentOrders.length === 0 ? ( 
          <p>No orders found.</p>
        ) : (
          currentOrders.map(order =>
            order.items.map(item => (
              <div className="order-products" key={item._id}>
                <div className="order-img">
                  <img
                    src={item.productId.images[0]?.url || "https://via.placeholder.com/120"}
                    alt={item.productId.name}
                  />
                </div>

                <div className="order-details">
                  <span className="order-title">{item.productId.name}</span>
                  <span className="order-description">{item.productId.description}</span>
                </div>

                <div className="order-price">
                  ₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}
                </div>

                <div className="order-status">
                  <span data-status={order.orderStatus}>Status: {order.orderStatus}</span>
                  <span>Order Date: {new Date(order.orderDate).toLocaleDateString()}</span>
                </div>
              </div>
            ))
          )
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToPage(idx + 1)}
                className={`pagination-btn ${currentPage === idx + 1 ? 'active' : ''}`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="pagination-btn"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrder;

