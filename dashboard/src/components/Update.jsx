import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import '../styles/Update.css';
import BackendURL from '../config/backendURL';
import { Zoom, toast } from "react-toastify";


const Update = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const loadOrderData = async () => {
    try {
      const res = await axios.get(`${BackendURL}/product/view/?id=${id}`);
      setOrder(res.data);
      setStatus(res.data.orderStatus);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load order details", { transition: Zoom, style: { fontSize: '16px', } });

    }
  };

  const updateStatus = async () => {
    setIsUpdating(true);
    try {
      await axios.put(`${BackendURL}/product/updateStatus/?id=${id}`, {
        orderStatus: status,
      });
      toast.success("Order status updated successfully!", { transition: Zoom, style: { fontSize: '16px', } });

      loadOrderData();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update order status", { transition: Zoom, style: { fontSize: '16px', } });
          } finally {
      setIsUpdating(false);
    }
  };

  

  useEffect(() => {
    loadOrderData();
  }, []);

  if (!order) return (
    <div className="admin-container">
      <div className="loading-spinner"></div>
    </div>
  );

  const subtotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingFee = order.totalAmount - subtotal;

  return (
    <div className="admin-container">

      <div className="admin-header">
        <h1>Order # {order._id.slice(-8).toUpperCase()}</h1>
        <div className="order-meta">
          <span className={`status-badge ${order.orderStatus.toLowerCase().replace(' ', '-')}`}>
            {order.orderStatus}
          </span>
          <span className="order-date">
            Ordered on {new Date(order.orderDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
      </div>

      <div className="admin-grid">
        {/* Customer Information */}
        <div className="admin-card">
          <div className="card-header">
            <h2>Customer Information</h2>
          </div>
          <div className="card-body">
            <div className="info-row">
              <span className="info-label">Name:</span>
              <span className="info-value">{order.customerId.userName}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Email:</span>
              <span className="info-value">{order.customerId.userEmail}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Member Since:</span>
              <span className="info-value">
                {new Date(order.customerId.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="admin-card">
          <div className="card-header">
            <h2>Shipping Address</h2>
          </div>
          <div className="card-body">
            <div className="address-block">
              <p>{order.shippingAddress.street}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
              <p>{order.shippingAddress.zipCode}, {order.shippingAddress.country}</p>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="admin-card">
          <div className="card-header">
            <h2>Payment Information</h2>
          </div>
          <div className="card-body">
            <div className="info-row">
              <span className="info-label">Razorpay Order ID:</span>
              <span className="info-value">{order.razorpay_order_id}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Payment Status:</span>
              <span className={`info-value payment-status ${order.paymentStatus.toLowerCase()}`}>
                {order.paymentStatus}
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">Total Amount:</span>
              <span className="info-value">₹{order.totalAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="admin-card wide-card">
          <div className="card-header">
            <h2>Order Items ({order.items.length})</h2>
          </div>
          <div className="card-body">
            <div className="order-items-table">
              <div className="table-header">
                <div className="table-row">
                  <div className="table-col product-col">Product</div>
                  <div className="table-col">Price</div>
                  <div className="table-col">Qty</div>
                  <div className="table-col">Total</div>
                </div>
              </div>
              <div className="table-body">
                {order.items.map((item) => (
                  <div className="table-row" key={item._id}>
                    <div className="table-col product-col">
                      <div className="product-info">
                        <div className="product-image">
                          <img
                            src={item.productId.images[0]?.url || 'https://via.placeholder.com/60'}
                            alt={item.productId.name}
                          />
                        </div>
                        <div className="product-details">
                          <h4>{item.productId.name}</h4>
                          <div className="product-meta">
                            <span className="product-sku">SKU: {item.productId.sku}</span>
                            <span className="product-category">{item.productId.categories}</span>
                            <span className="product-color">Color: {item.productId.color}</span>
                          </div>
                          <p className="product-description">{item.productId.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="table-col">₹{item.price.toLocaleString('en-IN')}</div>
                    <div className="table-col">{item.quantity}</div>
                    <div className="table-col">₹{(item.price * item.quantity).toLocaleString('en-IN')}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="admin-card">
          <div className="card-header">
            <h2>Order Summary</h2>
          </div>
          <div className="card-body">
            <div className="info-row">
              <span className="info-label">Subtotal ({order.items.length} items):</span>
              <span className="info-value">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Shipping Fee:</span>
              <span className="info-value">₹{shippingFee.toLocaleString('en-IN')}</span>
            </div>
            <div className="info-row total-row">
              <span className="info-label">Total Amount:</span>
              <span className="info-value">₹{order.totalAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Status Update */}
        <div className="admin-card">
          <div className="card-header">
            <h2>Update Status</h2>
          </div>
          <div className="card-body">
            <div className="status-update-form">
              <div className="form-group">
                <label htmlFor="status">Current Status</label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="status-select"
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Packed">Packed</option>
                  <option value="Out-for-Delivery">Out-for-Delivery</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <button
                onClick={updateStatus}
                className="update-btn"
                disabled={isUpdating}
              >
                {isUpdating ? 'Updating...' : 'Update Status'}
              </button>
            </div>
            <div className="delivery-info">
              <div className="info-row">
                <span className="info-label">Estimated Delivery:</span>
                <span className="info-value">
                  {new Date(order.deliveryDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">Last Updated:</span>
                <span className="info-value">
                  {new Date(order.updatedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update;