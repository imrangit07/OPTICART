import { useState } from 'react';

import '../CSS/Cart.css';

import { incrementQuiantity, decrementQuiantity, removeProduct } from '../slice/cartSlice'
import { useDispatch, useSelector } from 'react-redux';
import emptyimg from "../../public/Empty.webp"
import { useNavigate } from 'react-router-dom';
import ShippingInfo from './ShippingInfo/ShippingInfo';
import UserInfo from './UserInfo/UserInfo';
import axios from 'axios';
import BackendURL from '../config/backendURL';
import { useEffect } from 'react';

const Cart = () => {
    const [isUserInfo,setisUserInfo] = useState(false);
    const [userInfo,setUserInfo] = useState(false);
    const cartProduct = useSelector(state => state.productCart.products);
     const currentUser = useSelector((state) => state.loginUser.user);
       console.log("cart : ",currentUser.id);
       const customerId = currentUser.id;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const totalPrice = (cartProduct.reduce((sum, item) => sum + (item.price * (item.quantity)), 0) * 1.18 + 50).toFixed(2);

    const [isLoginOpen, setIsLoginOpen] = useState(false);
    
   const LoadUserInfo = async () => {
  try {
    const res = await axios.get(`${BackendURL}/user/currentuserinfo/?customerId=${customerId}`);
    console.log(res.data);

    const isUserInfoAvailable = res.data.success;
    const userInfoData = res.data.UserInfo;

    setisUserInfo(isUserInfoAvailable);
    setUserInfo(userInfoData);

    if (isUserInfoAvailable && userInfoData) {
      navigate('/payment');
    } else {
      setIsLoginOpen(true);
    }

  } catch (error) {
    console.log(error);
    setIsLoginOpen(true);
  }
};


    // useEffect(()=>{
    // },[])

    return (
        <>
        
            <div className="cart-wrapper">
                {cartProduct.length <= 0 ? (
                    <div className="empty-cart">
                        <div className="empty-cart-container">
                            <img src={emptyimg} alt="Empty cart" />
                            <h2>Your Cart is Empty</h2>
                            <p>Looks like you haven't added anything to your cart yet</p>
                            <span className="continue-shopping-btn" onClick={() => { navigate("/home") }}>Continue Shopping</span>
                        </div>
                    </div>
                ) : (
                    <div className="cart-page">
                        <div className="cart-container">
                            <div className="cart-header">
                                <h1>SHOPPING CART</h1>
                                <div className="header-underline"></div>
                            </div>

                            <div className="cart-items">
                                {cartProduct.map(product => (
                                    <div key={product.id} className="cart-item">
                                        <div className="cart-item-img">
                                            <img src={product.images[0].url} alt={product.name} />
                                        </div>
                                        <div className="cart-item-details">
                                            <h4>{product.name}</h4>
                                            <span className="original-price">₹{product.price.toFixed(2)}</span>
                                        </div>

                                        <div className="cart-item-quantity">
                                            <button className="quantity-btn decrement"
                                                onClick={() => { dispatch(decrementQuiantity({ id: product.id })) }}
                                            >-</button>
                                            <span className="quantity">{product.quantity}</span>
                                            <button
                                                className="quantity-btn increment"
                                                onClick={() => { dispatch(incrementQuiantity({ id: product.id })) }}
                                            >+</button>
                                        </div>

                                        <div className="cart-item-price">
                                            ₹{(product.price * (product.quantity)).toFixed(2)}
                                        </div>
                                        <button
                                            className="remove-btn"
                                            onClick={() => { dispatch(removeProduct({ id: product.id })) }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="cart-summary">
                            <h2>Order Summary</h2>
                            <div className="summary-item">
                                <span>Subtotal</span>
                                <span>₹{cartProduct.reduce((sum, item) => sum + (item.price * (item.quantity)), 0).toFixed(2)}</span>
                            </div>
                            <div className="summary-item">
                                <span>Shipping</span>
                                <span>₹50.00</span>
                            </div>
                            <div className="summary-item">
                                <span>Tax (CGST 9%)</span>
                                <span>₹{(cartProduct.reduce((sum, item) => sum + (item.price * (item.quantity)), 0) * 0.09).toFixed(2)}</span>
                            </div>
                            <div className="summary-item">
                                <span>Tax (SGST 9%)</span>
                                <span>₹{(cartProduct.reduce((sum, item) => sum + (item.price * (item.quantity)), 0) * 0.09).toFixed(2)}</span>
                            </div>
                            <div className="summary-item total">
                                <span>Total</span>
                                <span>₹{totalPrice}</span>
                            </div>

                            <button className="checkout-btn" onClick={LoadUserInfo} >
                                PROCEED TO CHECKOUT
                            </button>
                            <div className="continue-shopping">
                                or <span onClick={() => { navigate("/home") }}>Continue Shopping</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            
            <UserInfo isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} price={totalPrice}/>

        </>
    );
};

export default Cart;