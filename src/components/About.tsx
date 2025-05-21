
import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-20 relative">
      {/* Background accent */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-space-cosmic-blue opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-space-nebula-purple opacity-20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 cosmic-glow">About Our Society</h2>
          <div className="w-20 h-1 bg-space-stellar mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-space-stellar">Our Mission</h3>
            <p className="mb-6 text-lg">
              The Event Horizon Society was founded in 2015 by a group of passionate astronomers, physicists, and space enthusiasts who share a common fascination with the mysteries of black holes, cosmic phenomena, and the boundaries of our universe.
            </p>
            <p className="text-lg">
              Our mission is to foster a community that explores, discusses, and contributes to the understanding of cosmic boundaries, while making complex astrophysical concepts accessible to everyone interested in the wonders of space.
            </p>
          </div>
          
          <div className="nebula-card">
            <h3 className="text-xl font-bold mb-6 text-space-stellar">What We Do</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-space-cosmic-blue flex items-center justify-center mr-4 shrink-0">
                  <span className="text-space-stellar-white font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Monthly Meetups</h4>
                  <p>Regular gatherings featuring talks from experts in astronomy, physics, and space exploration.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-space-cosmic-blue flex items-center justify-center mr-4 shrink-0">
                  <span className="text-space-stellar-white font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Stargazing Events</h4>
                  <p>Organized night sky observation sessions with telescopes and expert guidance.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-space-cosmic-blue flex items-center justify-center mr-4 shrink-0">
                  <span className="text-space-stellar-white font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Research Collaboration</h4>
                  <p>Support for amateur and professional research projects related to astronomy and astrophysics.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
