
import React from 'react';
import { Facebook, Twitter, Instagram, GitHub } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-space-dark-blue/90 pt-12 pb-6">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-space-stellar">Event Horizon Society</h3>
            <p className="mb-4 text-space-stellar-white/70">
              Exploring the boundaries of science, space, and the mysteries of the cosmos.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-space-stellar-white/70 hover:text-space-stellar transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-space-stellar-white/70 hover:text-space-stellar transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-space-stellar-white/70 hover:text-space-stellar transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-space-stellar-white/70 hover:text-space-stellar transition-colors">
                <GitHub size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-space-stellar">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="text-space-stellar-white/70 hover:text-space-stellar transition-colors">About Us</a></li>
              <li><a href="#events" className="text-space-stellar-white/70 hover:text-space-stellar transition-colors">Events</a></li>
              <li><a href="#" className="text-space-stellar-white/70 hover:text-space-stellar transition-colors">Resources</a></li>
              <li><a href="#" className="text-space-stellar-white/70 hover:text-space-stellar transition-colors">Blog</a></li>
              <li><a href="#contact" className="text-space-stellar-white/70 hover:text-space-stellar transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-space-stellar">Newsletter</h3>
            <p className="mb-4 text-space-stellar-white/70">
              Subscribe to our newsletter for updates on events, astronomical phenomena, and society news.
            </p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 bg-space-dark-blue border border-space-stellar/30 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-space-stellar flex-1"
              />
              <button 
                type="submit" 
                className="px-4 py-2 bg-space-cosmic-blue text-space-stellar-white rounded-r-lg hover:bg-space-stellar hover:text-space-dark-blue transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-space-stellar/20 pt-6 text-center text-space-stellar-white/50 text-sm">
          <p>&copy; {currentYear} Event Horizon Society. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
