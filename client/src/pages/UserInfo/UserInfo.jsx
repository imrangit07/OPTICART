import React, { useState } from 'react';
import '../../CSS/ShippingInfo.css';
import axios from 'axios';
import BackendURL from '../../config/backendURL';
import { useSelector } from 'react-redux';

const UserInfo = ({ isOpen, onClose, price }) => {
  const cartProduct = useSelector((state) => state.productCart.products);
  const currentUser = useSelector((state) => state.loginUser.user);
  //  console.log("UserInfo : ",currentUser.id);
   const customerId = currentUser?.id;
  // console.log(cartProduct);
  
  const [address, setAddress] = useState({
    phoneNumber: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
        if (!customerId) {
        // setIsLoginOpen(true);
        return;
    }
    try {
      const res = await axios.post(
        `${BackendURL}/user/userinfo`,{...address,customerId},
        { withCredentials: true }
      );
      console.log(res.data);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-btn" onClick={onClose}>
          &times;
        </span>
        <h2>User Information</h2>
        <form onSubmit={handleSubmit}>
          <label>Phone No.</label>
          <input
            type="number"
            name="phoneNumber"
            value={address.phoneNumber}
            onChange={handleChange}
            required
          />

          <label>Street</label>
          <input
            type="text"
            name="street"
            value={address.street}
            onChange={handleChange}
            required
          />

          <div className="row">
            <div className="col">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={address.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col">
              <label>State</label>
              <input
                type="text"
                name="state"
                value={address.state}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label>Zip Code</label>
              <input
                type="text"
                name="zipCode"
                value={address.zipCode}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col">
              <label>Country</label>
              <select
                name="country"
                value={address.country}
                onChange={handleChange}
                required
              >
                <option value="">Select Country</option>
                <option value="India">India</option>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
              </select>
            </div>
          </div>

          <button type="submit">Save Details</button>
        </form>
      </div>
    </div>
  );
};

export default UserInfo;
