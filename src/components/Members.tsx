
import React from 'react';

const membersList = [
  {
    id: 1,
    name: "Dr. Michael Chen",
    role: "Founder & Astrophysicist",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    quote: "The event horizon marks not just the boundary of a black hole, but the boundary of our current understanding. That's why we're here—to push beyond."
  },
  {
    id: 2,
    name: "Dr. Sophia Rodriguez",
    role: "Theoretical Physicist",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    quote: "When we look into space, we're looking into our own origins. The Event Horizon Society has given me a community to share that wonder with."
  },
  {
    id: 3,
    name: "James Wilson",
    role: "Astronomy Educator",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    quote: "Making complex science accessible is my passion. Through our events, we turn cosmic curiosity into cosmic understanding."
  }
];

const Members = () => {
  return (
    <section id="members" className="py-20 relative">
      {/* Background accent */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-space-cosmic-blue opacity-10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 cosmic-glow">Our Members</h2>
          <div className="w-20 h-1 bg-space-stellar mx-auto"></div>
          <p className="mt-4 text-lg max-w-2xl mx-auto">
            Meet some of the passionate individuals who make up our cosmic community.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {membersList.map(member => (
            <div key={member.id} className="nebula-card text-center hover:scale-[1.02] transition-transform duration-300">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-2 border-space-stellar/30">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <h3 className="text-xl font-bold mb-1 text-space-stellar">{member.name}</h3>
              <p className="text-space-stellar/80 mb-4">{member.role}</p>
              
              <blockquote className="italic text-sm">
                "{member.quote}"
              </blockquote>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="mb-8 text-lg">
            Our society brings together over 200 members from diverse backgrounds – students, researchers, professionals, and space enthusiasts of all kinds.
          </p>
          
          <a href="#contact" className="cosmic-button">
            Become a Member
          </a>
        </div>
      </div>
    </section>
  );
};

export default Members;
