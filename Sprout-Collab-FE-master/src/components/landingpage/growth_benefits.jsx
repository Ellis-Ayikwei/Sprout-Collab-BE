import React from 'react';
import earth from '../../images/earth.png';
import Handshake from '../../images/handshake.png';
import Rocket from '../../images/rocket.png';
import Sprout from '../../images/sprout.png';

const GrowthBenefits = () => {
  return (
    <section className="growth-benefits">
      <h2>Start Your Growth Journey</h2>
      <ul className="growth-benefits-list">
        <li>
          <div className="growth-benefit-item">
            <img src={Sprout} alt="Sprout" className="growth--icon" />
            <p className="growth--text">Create Projects, Grow Goals</p>
          </div>
        </li>
        <li>
          <div className="growth-benefit-item">
            <img src={Rocket} alt="Rocket" className="growth--icon" />
            <p className="growth--text">Collaborate with Like-Minds</p>
          </div>
        </li>
        <li>
          <div className="growth-benefit-item">
            <img src={Handshake} alt="Handshake" className="growth--icon" />
            <p className="growth--text">Access Shared Resources</p>
          </div>
        </li>
        <li>
          <div className="growth-benefit-item">
            <img src={earth} alt="earth" className="growth--icon" />
            <p className="growth--text">Be part of a Global Community</p>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default GrowthBenefits;
