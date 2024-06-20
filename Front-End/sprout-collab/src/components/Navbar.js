import React from 'react';
import logo from '../images/sclogo-alone.png'
// import '../styles/sass/Navbar.scss'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <div class="main-logo">
        <img className="logo" src={logo} alt="Logo" />
        <p className='logo-text'><b>Sprout</b>Collab</p>
      </div>
      <nav className="nav-buttons">
        <button className='btn--outline'>Goals</button>
        <button className='btn--primary'>Get Started</button>
        <button className='btn--secondary'>Login</button>
      </nav>
    </nav>
  );
};

export default Navbar;
