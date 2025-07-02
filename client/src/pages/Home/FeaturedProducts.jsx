import React from 'react';
import '../../CSS/FeaturedProducts.css';
import { FaSearch, FaHeart, FaExchangeAlt } from 'react-icons/fa';
import { LuBaggageClaim } from "react-icons/lu";
import glass1 from '../../../public/glass1.jpg';
import glass2 from '../../../public/glass2.jpg';
import glass3 from '../../../public/glass3.jpg';
import glass4 from '../../../public/glass4.jpg';
const products = [
  {
    id: 1,
    category: 'Men',
    title: 'Burberry Eyeglasses Look',
    price: 23.90,
    image: glass1,
    colors: ['#222', '#ccc'],
  },
  {
    id: 2,
    category: 'Art',
    title: 'Armani Exchange AX4029',
    price: 29.00,
    image: glass2,
    colors: ['#888', '#b38769', '#c69489'],
  },
  {
    id: 3,
    category: 'Art',
    title: 'Premium Aviator Sunglasses',
    price: 29.00,
    image: glass3,
    colors: ['#d2c89a', '#fdf1d5'],
  },
  {
    id: 4,
    category: 'Home Accessories',
    title: 'Rectangle Polarized Magnetic',
    price: 11.90,
    image: glass4,
    colors: ['#2b2d42', '#ffca28'],
  }
];

const FeaturedProducts = () => {
  return (
    <section className="featured-section">
      <h2>FEATURED PRODUCTS</h2>
      <p className="subtitle">
        For our ten-year anniversary, we're re-envisioning our best-selling styles.
      </p>
      <div className="product-grid">
        {products.map((item) => (
          <div className="product-card" key={item.id}>
            <div className="image-wrapper">
              <img src={item.image} alt={item.title} />
              <div className="hover-icons">
                <FaSearch title="Quick View" />
                <FaHeart title="Add to Wishlist" />
                <LuBaggageClaim title="Add to Cart" />
              </div>
            </div>
            <div className="product-info">
              <p className="category">{item.category}</p>
              <h3>{item.title}</h3>
              <div className="colors">
                {item.colors.map((color, idx) => (
                  <span key={idx} style={{ backgroundColor: color }}></span>
                ))}
              </div>
              <p className="price">${item.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
