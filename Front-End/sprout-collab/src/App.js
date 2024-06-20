import React from 'react';
import './App.scss';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import BenefitSection from './components/benefits_section';

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <BenefitSection />
      <Footer />
    </div>
  );
};

export default App;
