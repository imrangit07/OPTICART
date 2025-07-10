import React, { useEffect, useState } from 'react';
import '../../css/Payment.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import BackendURL from '../../config/backendURL';

const Payment = () => {
  const [phoneNumber, setPhoneNumber] = useState("");   
  const [address, setAddress] = useState({});          

  const products = useSelector(state => state.productCart.products);
  const currentUser = useSelector((state) => state.loginUser.user);
  const customerId = currentUser.id;

  console.log("Payment ; ", currentUser);
  

  console.log("Customer ID:", customerId);

  const LoadUserInfo = async () => {
    try {
      const res = await axios.get(`${BackendURL}/user/currentuserinfo/?customerId=${customerId}`);
      console.log("Payment user info:", res.data.UserInfo);

      setPhoneNumber(res.data.UserInfo.phoneNumber); 
      setAddress(res.data.UserInfo.shippingAddress); 

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    LoadUserInfo();
  }, []); // ✅ runs once

  const subtotal = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const shipping = 50.00;
  const cgst = subtotal * 0.09;
  const sgst = subtotal * 0.09;
  const total = subtotal + shipping + cgst + sgst;

  return (
    <div className='payment-container'>
      <div className='left-column'>
        <div className='cart-product'>
          <h2>Your Cart</h2>
          {products.map(product => (
            <div key={product.id} className='product-item'>
              <div className='products-image'>
                <img src={product.images[0].url} alt={product.name} />
              </div>
              <div className='product-details'>
                <div className="product-name">{product.name}</div>
                <div className='product-description'>{product.description}</div>
                <div className='product-price'>₹{product.price.toFixed(2)}</div>
                <div className='product-quantity'>Quantity: {product.quantity}</div>
                <div className='delivery-date'>Expected Delivery: 18th July, 2025</div>
              </div>
            </div>
          ))}
          <div className='order-button'>
            <button>PLACE ORDER</button>
          </div>
        </div>
      </div>

      <div className='right-column'>
        <div className='user-details'>
          <h3>Shipping Details</h3>
          <div className='user-name'>Name: {currentUser.userName}</div>
          <div className='phoneNumber' style={{color:"black",fontWeight:"bold"}}>Phone: {phoneNumber}</div>
          <div className='shipping-address'>
            <span>{address.street}</span>
            <span>{address.city}</span>
            <span>{address.state}</span>
            <span>{address.zipCode}</span>
            <span>{address.country}</span>
          </div>
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-item">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <span>Shipping</span>
            <span>₹{shipping.toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <span>Tax (CGST 9%)</span>
            <span>₹{cgst.toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <span>Tax (SGST 9%)</span>
            <span>₹{sgst.toFixed(2)}</span>
          </div>
          <div className="summary-item total">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
