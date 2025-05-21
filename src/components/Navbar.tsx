
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="py-4 px-6 md:px-16 flex justify-between items-center relative z-50 backdrop-blur-md bg-space-dark-blue/80 sticky top-0">
      <div className="flex items-center">
        <h1 className="text-xl md:text-2xl font-bold cosmic-glow text-space-stellar">
          Event<span className="text-space-cosmic-purple">Horizon</span>Society
        </h1>
      </div>
      
      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center space-x-8">
        <li><a href="#about" className="hover:text-space-cosmic-purple transition-colors">About</a></li>
        <li><a href="#events" className="hover:text-space-cosmic-purple transition-colors">Events</a></li>
        <li><a href="#members" className="hover:text-space-cosmic-purple transition-colors">Members</a></li>
        <li><a href="#contact" className="cosmic-button">Join Us</a></li>
      </ul>
      
      {/* Mobile Menu Button */}
      <button 
        className="md:hidden text-space-stellar-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-space-dark-blue/95 backdrop-blur-lg p-6 md:hidden">
          <ul className="flex flex-col space-y-4">
            <li><a href="#about" className="block py-2 hover:text-space-cosmic-purple" onClick={() => setIsOpen(false)}>About</a></li>
            <li><a href="#events" className="block py-2 hover:text-space-cosmic-purple" onClick={() => setIsOpen(false)}>Events</a></li>
            <li><a href="#members" className="block py-2 hover:text-space-cosmic-purple" onClick={() => setIsOpen(false)}>Members</a></li>
            <li><a href="#contact" className="cosmic-button block text-center" onClick={() => setIsOpen(false)}>Join Us</a></li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
