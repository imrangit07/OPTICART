import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToProduct, RemoveWishList } from '../slice/cartSlice';
import emptyimg from "../../public/Empty.webp";
import '../CSS/Wishlist.css';
import { toast, Zoom } from 'react-toastify';

const Wishlist = () => {
    const dispatch = useDispatch();
    const wishList = useSelector(state => state.productCart.wishList);


    return (
        <div className="wishlist-wrapper">
            {wishList.length <= 0 ? (
                <div className="wishlist-empty">
                    <img src={emptyimg} alt="Empty Wishlist" />
                    <h2>Your Wishlist is Empty</h2>
                    <p>Looks like you haven't added anything yet.</p>
                </div>
            ) : (
                <div className="wishlist-container">
                    <h1>My Wishlist</h1>
                    <div className="wishlist-items">
                        {wishList.map(product => (
                            <div key={product.id} className="wishlist-item">
                                <div className="wishlist-item-img">
                                    <img src={product.images[0].url} alt={product.name} />
                                </div>
                                <div className="wishlist-item-details">
                                    <h4>{product.name}</h4>
                                    <p>₹{product.price.toFixed(2)}</p>
                                </div>
                                <div className="wishlist-item-actions">
                                    <button
                                        className="wishlist-add-btn"
                                        onClick={() => {
                                            dispatch(addToProduct({
                                                id: product.id,
                                                name: product.name,
                                                price: product.price,
                                                description: product.description,
                                                stock: product.stock_quantity,
                                                images: product.images,
                                                quantity: 1
                                            }))
                                            dispatch(RemoveWishList({id:product.id}))
                                        }}
                                    >
                                        Add to Cart
                                    </button>
                                    <button
                                        className="wishlist-remove-btn"
                                        onClick={() => { dispatch(RemoveWishList({id:product.id})) }}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Wishlist;
