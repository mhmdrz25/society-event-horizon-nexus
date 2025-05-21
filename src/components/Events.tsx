
import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';

const eventsList = [
  {
    id: 1,
    title: "The Mathematics of Black Holes",
    date: "June 15, 2025",
    time: "7:00 PM - 9:00 PM",
    location: "Virtual - Zoom",
    description: "Dr. Elena Vasquez explains the mathematical models that describe black holes and their behavior.",
    featured: true
  },
  {
    id: 2,
    title: "Summer Stargazing Night",
    date: "July 22, 2025",
    time: "10:00 PM - 1:00 AM",
    location: "Mountain View Observatory",
    description: "Join us for a night of stargazing with professional telescopes. Weather permitting.",
    featured: true
  },
  {
    id: 3,
    title: "Exploring Exoplanets Workshop",
    date: "August 5, 2025",
    time: "2:00 PM - 5:00 PM",
    location: "Science Center Auditorium",
    description: "A hands-on workshop about detecting and studying planets outside our solar system.",
    featured: false
  },
  {
    id: 4,
    title: "Monthly Member Meeting",
    date: "August 18, 2025",
    time: "6:30 PM - 8:30 PM",
    location: "Community Center Room 203",
    description: "Regular society meeting with updates, planning, and a short presentation on recent discoveries.",
    featured: false
  }
];

const Events = () => {
  return (
    <section id="events" className="py-20 bg-space-deep-blue/30 relative">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-1/2 bg-space-stellar opacity-5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 cosmic-glow">Upcoming Events</h2>
          <div className="w-20 h-1 bg-space-stellar mx-auto"></div>
          <p className="mt-4 text-lg max-w-2xl mx-auto">
            Join us for our upcoming events and activities. Open to members and non-members alike!
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {eventsList.filter(event => event.featured).map(event => (
            <div key={event.id} className="nebula-card hover:scale-[1.02] transition-transform duration-300">
              <h3 className="text-xl font-bold mb-3 text-space-stellar">{event.title}</h3>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-space-stellar" />
                  <span>{event.date}</span>
                </div>
                
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-space-stellar" />
                  <span>{event.time}</span>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-space-stellar" />
                  <span>{event.location}</span>
                </div>
              </div>
              
              <p className="mb-6">{event.description}</p>
              
              <button className="cosmic-button text-sm">
                Register for Event
              </button>
            </div>
          ))}
        </div>
        
        <div className="mt-12">
          <h3 className="text-xl font-bold mb-6 text-center">More Upcoming Events</h3>
          
          <div className="nebula-card">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-space-stellar/20">
                    <th className="text-left py-3 px-4">Event</th>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Location</th>
                    <th className="text-left py-3 px-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {eventsList.filter(event => !event.featured).map(event => (
                    <tr key={event.id} className="border-b border-space-stellar/10 hover:bg-space-stellar/5">
                      <td className="py-4 px-4">
                        <div className="font-medium">{event.title}</div>
                        <div className="text-sm text-space-stellar/70">{event.description}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div>{event.date}</div>
                        <div className="text-sm text-space-stellar/70">{event.time}</div>
                      </td>
                      <td className="py-4 px-4">{event.location}</td>
                      <td className="py-4 px-4">
                        <button className="px-4 py-2 text-sm border border-space-stellar rounded hover:bg-space-stellar/10 transition-colors">
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <button className="cosmic-button">
              View Full Calendar
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
