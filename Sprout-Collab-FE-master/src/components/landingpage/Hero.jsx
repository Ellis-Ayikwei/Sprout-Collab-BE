import React from 'react';
import { NavLink } from 'react-router-dom';
import image1 from '../../images/collab1.jpg';
import image2 from '../../images/collab2.jpg';
import image3 from '../../images/collab3.jpg';
import image4 from '../../images/collab4.jpg';
import image5 from '../../images/collab5.jpg';
import image6 from '../../images/collab6.jpg';
import logo1 from '../../images/sclogo-alone.png';
// import '../styles/sass/Hero.scss';

const Hero = () => {
  // const images = [
  //   // Replace with the paths to your images
  //   image1,
  //   image1,
  //   image1,
  //   image1,
  //   image1,
  //   image1,
  // ];

  return (
    <section className="hero">
      <div className="hero__info">
        <img src={logo1} alt="Hero-logo" className='hero-logo'/>
        <p className="hero__info__title">Your Goals, Our Community,
        Endless Possibilities.</p>
        <p className="hero__info__description">Experience the power of shared goals towards 
        your dreams with like minded individuals.</p>
        <NavLink to='/register' className='btn--outline'>Plant Your Goals Today</NavLink>
      </div>
      <div className="hero__image-grid">
        <img src={image1} alt="Hero" className='single-col-content'/>
        <img src={image2} alt="Hero1" className='double-col-content1'/>
        <img src={image3} alt="Hero2" className='double-col-content2'/>
        <img src={image4} alt="Hero3" className='tripple-col-content1'/>
        <img src={image5} alt="Hero4" className='tripple-col-content2'/>
        <img src={image6} alt="Hero5" className='tripple-col-content3'/>
      </div>
    </section>
  );
};

export default Hero;
