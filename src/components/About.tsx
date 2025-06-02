
import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-20 relative">
      {/* Background accent */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-space-cosmic-blue opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-space-nebula-purple opacity-20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 cosmic-glow">درباره انجمن ما</h2>
          <div className="w-20 h-1 bg-space-stellar mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-space-stellar">ماموریت ما</h3>
            <p className="mb-6 text-lg">
              انجمن افق رویداد در سال ۲۰۱۵ توسط گروهی از ستاره‌شناسان، فیزیکدانان و علاقه‌مندان فضا تأسیس شد که همگی شیفته رازهای سیاه‌چاله‌ها، پدیده‌های کیهانی و مرزهای کیهان هستند.
            </p>
            <p className="text-lg">
              ماموریت ما پرورش جامعه‌ای است که مرزهای کیهانی را کاوش، بحث و درک کند و در عین حال مفاهیم پیچیده اخترفیزیک را برای همه علاقه‌مندان به شگفتی‌های فضا قابل دسترس کند.
            </p>
          </div>
          
          <div className="nebula-card">
            <h3 className="text-xl font-bold mb-6 text-space-stellar">کارهای ما</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-space-cosmic-blue flex items-center justify-center mr-4 shrink-0">
                  <span className="text-space-stellar-white font-bold">۱</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">جلسات ماهانه</h4>
                  <p>گردهمایی‌های منظم با سخنرانی‌هایی از متخصصان نجوم، فیزیک و کاوش فضایی.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-space-cosmic-blue flex items-center justify-center mr-4 shrink-0">
                  <span className="text-space-stellar-white font-bold">۲</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">رویدادهای رصد آسمان</h4>
                  <p>جلسات رصد آسمان شب با تلسکوپ و راهنمایی متخصصان.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-space-cosmic-blue flex items-center justify-center mr-4 shrink-0">
                  <span className="text-space-stellar-white font-bold">۳</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">همکاری تحقیقاتی</h4>
                  <p>پشتیبانی از پروژه‌های تحقیقاتی آماتور و حرفه‌ای مرتبط با نجوم و اخترفیزیک.</p>
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
