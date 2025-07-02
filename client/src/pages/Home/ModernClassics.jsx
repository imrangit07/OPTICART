import React from 'react';
import '../../CSS/ModernClassics.css';
import leftGlasses from '../../../public/right-glass.webp';
// import rightModels from '../../../public/left-glass.webp';

const ModernClassics = () => {
  return (
    <section className="modern-classics">
      <div className="modern-left">
        <div className="text-section">
          <h2>GORDON-GLASSES</h2>
          <h3>TRUE MODERN CLASSICS.</h3>
          <p>
            One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed
            in his bed into a horrible vermin. He lay on his armour-like.
          </p>
          <div className="buttons">
            <button className="shop-btn">Shop Now</button>
            <button className="view-btn">View More</button>
          </div>
        </div>
        <img src={leftGlasses} alt="Glasses" className="bottom-glasses" />
        <div className="dotted-bg"></div>
      </div>
      <div className="modern-right">
        {/* <img src={rightModels} alt="Models with Glasses" /> */}
      </div>
    </section>
  );
};

export default ModernClassics;
