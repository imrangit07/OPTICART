import React from 'react';
import '../../CSS/Home.css';
import mainImg from '../../../public/hero-main.webp';
import womanImg from '../../../public/woman-sunglasses.webp';
import glassesImg from '../../../public/glasses.webp';
import FeaturedProducts from './FeaturedProducts';
import ModernClassics from './ModernClassics';

const Home = () => {
  return (
    <>
    <section className="hero-section">
      <div className="hero-left">
        <img src={mainImg} alt="Main Glasses" className="hero-main-img" />
        <div className="hero-text">
          <p className="tagline">GREAT ACCESSORIES</p>
          <h1>Forest Eyes <br /> Glasses</h1>
          <p className="offer">Sale up to <span>30% off</span></p>
          <button className="main-shop-btn">Shop All Glasses</button>
        </div>
      </div>
      <div className="hero-right">
        <div className="box">
          <img src={womanImg} alt="Woman Sunglasses" />
          <div className="box-text">
            <p className='box-para'>WOMAN SUNGLASSES</p>
            <h2>GARAMOND</h2>
            <span >SHOP NOW</span>
          </div>
        </div>
        <div className="box">
          <img src={glassesImg} alt="How to Order Eyeglasses" />
          <div className="box-text">
            <p className='box-para'>FLAT 30% OFF</p>
            <h2>HOW TO ORDER <br /> EYEGLASSES</h2>
            <span >SHOP NOW</span>
          </div>
        </div>
      </div>
    </section>

    <FeaturedProducts/>

    <ModernClassics/>
    </>
  );
};

export default Home;
