
import React from 'react';

const membersList = [
  {
    id: 1,
    name: "دکتر محمد کریمی",
    role: "بنیانگذار و اخترفیزیکدان",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    quote: "افق رویداد نه تنها مرز سیاه‌چاله بلکه مرز درک کنونی ما را نشان می‌دهد. به همین دلیل ما اینجا هستیم - تا فراتر برویم."
  },
  {
    id: 2,
    name: "دکتر سارا احمدی",
    role: "فیزیکدان نظری",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    quote: "وقتی به فضا نگاه می‌کنیم، در واقع به آغاز خودمان نگاه می‌کنیم. انجمن افق رویداد جامعه‌ای برای تسهیم این شگفتی به من داده است."
  },
  {
    id: 3,
    name: "علی رضایی",
    role: "مربی نجوم",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    quote: "قابل دسترس کردن علوم پیچیده، شور و شوق من است. از طریق رویدادهایمان، کنجکاوی کیهانی را به درک کیهانی تبدیل می‌کنیم."
  }
];

const Members = () => {
  return (
    <section id="members" className="py-20 relative">
      {/* Background accent */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-space-cosmic-blue opacity-10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 cosmic-glow">اعضای ما</h2>
          <div className="w-20 h-1 bg-space-stellar mx-auto"></div>
          <p className="mt-4 text-lg max-w-2xl mx-auto">
            با برخی از افراد پرشوری که جامعه کیهانی ما را تشکیل می‌دهند آشنا شوید.
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
            انجمن ما بیش از ۲۰۰ عضو از پیشینه‌های مختلف را گرد هم می‌آورد - دانشجویان، محققان، متخصصان و علاقه‌مندان فضا از همه نوع.
          </p>
          
          <a href="#contact" className="cosmic-button">
            عضو شوید
          </a>
        </div>
      </div>
    </section>
  );
};

export default Members;
