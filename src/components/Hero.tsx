
import React, { useEffect } from 'react';

const Hero = () => {
  useEffect(() => {
    // Create stars
    const createStars = () => {
      const starField = document.querySelector('.star-field');
      if (!starField) return;
      
      // Clear existing stars
      const existingStars = starField.querySelectorAll('.star');
      existingStars.forEach(star => star.remove());
      
      const starCount = Math.floor(window.innerWidth / 8);
      
      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Random size (0.5px - 3px)
        const size = Math.random() * 2.5 + 0.5;
        
        // Random animation
        const animationClass = `animate-twinkle-${Math.floor(Math.random() * 3) + 1}`;
        star.classList.add(animationClass);
        
        // Set styles
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        starField.appendChild(star);
      }
    };
    
    createStars();
    window.addEventListener('resize', createStars);
    
    return () => {
      window.removeEventListener('resize', createStars);
    };
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20">
      <div className="star-field absolute top-0 left-0 w-full h-full"></div>
      
      {/* Nebula Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-30 blur-3xl rounded-full bg-nebula-gradient"></div>
      
      <div className="container mx-auto px-6 z-10 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 cosmic-glow">
          انجمن افق رویداد
        </h1>
        <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-space-stellar">
          کاوش در مرزهای علم، فضا و رازهای کیهان
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="#about" className="cosmic-button">
            ماموریت ما را کشف کنید
          </a>
          <a href="#events" className="border border-space-stellar text-space-stellar px-6 py-3 rounded-lg font-semibold hover:bg-space-stellar/10 transition-colors">
            رویدادهای آینده
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
