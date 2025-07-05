import React from 'react';
import '../../CSS/ModernClassics.css';
import rightGlasses from '../../../public/right-glass.webp';
import rightModels from '../../../public/left-glass.webp';

const ModernClassics = () => {
  return (
    <section className="modern-classics">
      <div className="modern-container">
        <div className="text-section">
          <div className='gardon-glasses'>
          <h2>GORDON-GLASSES</h2>
          <h3>TRUE MODERN CLASSICS.</h3>
          <p>
            One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed
            in his bed into a horrible vermin. He lay on his armour-like.
          </p>
          <div className="buttons">
            <button className="shop-btn">Shop Now</button>
            <button className="shop-btn modern-view-btn">View More</button>
          </div>
          </div>
        </div>
        <div className='right-position'>
        <img src={rightGlasses} alt="Glasses" className="bottom-glasses" />
        </div>
        <div className="dotted-bg"></div>
      {/* <div className="modern-right">
        <img src={rightModels} alt="Models with Glasses" />
      </div> */}
      </div>
    </section>
  );
};

export default ModernClassics;
