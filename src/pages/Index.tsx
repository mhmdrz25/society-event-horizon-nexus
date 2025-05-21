
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Events from '../components/Events';
import Members from '../components/Members';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-space-gradient bg-fixed">
      <Navbar />
      <Hero />
      <About />
      <Events />
      <Members />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
