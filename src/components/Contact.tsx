
import React, { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: 'General Inquiry',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the data to a server
    console.log('Form submitted:', formData);
    toast.success('Thank you for your message! We will be in touch soon.');
    // Reset form
    setFormData({
      name: '',
      email: '',
      interest: 'General Inquiry',
      message: ''
    });
  };

  return (
    <section id="contact" className="py-20 bg-space-deep-blue/30 relative">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-1/2 bg-space-stellar opacity-5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 cosmic-glow">Join Our Community</h2>
          <div className="w-20 h-1 bg-space-stellar mx-auto"></div>
          <p className="mt-4 text-lg max-w-2xl mx-auto">
            Interested in becoming a member or have questions about the Event Horizon Society? Reach out to us!
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-6 text-space-stellar">Contact Information</h3>
              
              <div className="nebula-card mb-8">
                <div className="flex items-center mb-4">
                  <Mail className="w-5 h-5 mr-3 text-space-stellar" />
                  <span>info@eventhorizonsociety.org</span>
                </div>
                
                <p className="mb-4">
                  Our regular meetings are held on the third Monday of each month at the Community Science Center.
                </p>
                
                <p>
                  Membership is open to anyone with an interest in astronomy, astrophysics, or space exploration.
                </p>
              </div>
              
              <div>
                <h4 className="font-bold mb-4">Membership Benefits</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Access to monthly lectures and workshops</li>
                  <li>Participation in exclusive stargazing events</li>
                  <li>Subscription to our quarterly newsletter</li>
                  <li>Networking with fellow space enthusiasts</li>
                  <li>Discounted rates for special events</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-6 text-space-stellar">Get in Touch</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-space-dark-blue/50 border border-space-stellar/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-space-stellar"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-space-dark-blue/50 border border-space-stellar/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-space-stellar"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="interest" className="block mb-2 text-sm font-medium">I'm interested in</label>
                  <select
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-space-dark-blue/50 border border-space-stellar/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-space-stellar"
                  >
                    <option>General Inquiry</option>
                    <option>Becoming a Member</option>
                    <option>Volunteering</option>
                    <option>Speaking at an Event</option>
                    <option>Sponsorship Opportunities</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block mb-2 text-sm font-medium">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-space-dark-blue/50 border border-space-stellar/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-space-stellar"
                    required
                  ></textarea>
                </div>
                
                <button type="submit" className="cosmic-button flex items-center justify-center w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
