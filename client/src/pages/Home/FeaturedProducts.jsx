import React from 'react';
import '../../CSS/FeaturedProducts.css';
import { FaSearch, FaHeart, FaExchangeAlt } from 'react-icons/fa';
import { LuBaggageClaim } from "react-icons/lu";
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import BackendURL from '../../config/backendURL';
import { useDispatch } from 'react-redux';
import { addToProduct } from "../../slice/cartSlice";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);



  const dispatch = useDispatch();

  const LoadProducts = async () => {
    try {
      const res = await axios.get(`${BackendURL}/user/getAllProduct`)
      setProducts(res.data.product)
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    LoadProducts();
  }, []);

  return (
    <section className="featured-section">
      <h2>FEATURED PRODUCTS</h2>
      <p className="subtitle">
        For our ten-year anniversary, we're re-envisioning our best-selling styles.
      </p>
      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product._id}>
            <div className="image-wrapper">
              {/* {product.images.map((image)=>{ */}
              <img src={product.images[0].url} alt={product.name} />
              {/* })} */}
              <div className="hover-icons">
                <FaSearch title="Quick View" />
                <FaHeart title="Add to Wishlist" />
                <LuBaggageClaim
                  title="Add to Cart"
                  onClick={() => { dispatch(addToProduct({
                    id:product._id,
                    name:product.name,
                    price:product.price,
                    description:product.description,
                    stock:product.stock_quantity,
                    images:product.images,
                    quantity: 1})) }}
                />
              </div>
            </div>
            <div className="product-info">
              <p className="category">{product.categories}</p>
              <h3>{product.name}</h3>
              <div className="colors">
                {/* {product.colors.map((color, idx) => ( */}
                {/* <span style={{ backgroundColor: product.color }}></span> */}
                {/* ))} */}
              </div>
              <p className="price">₹{product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
