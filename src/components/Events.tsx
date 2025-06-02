
import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';

const eventsList = [
  {
    id: 1,
    title: "ریاضیات سیاه‌چاله‌ها",
    date: "۲۵ خرداد ۱۴۰۴",
    time: "۱۹:۰۰ - ۲۱:۰۰",
    location: "مجازی - زوم",
    description: "دکتر الهام وثیقی مدل‌های ریاضی توصیف‌کننده سیاه‌چاله‌ها و رفتار آنها را شرح می‌دهد.",
    featured: true
  },
  {
    id: 2,
    title: "شب رصد ستارگان تابستان",
    date: "۳۱ تیر ۱۴۰۴",
    time: "۲۲:۰۰ - ۰۱:۰۰",
    location: "رصدخانه کوه‌نما",
    description: "برای شبی از رصد ستارگان با تلسکوپ‌های حرفه‌ای به ما بپیوندید. مشروط به مناسب بودن آب و هوا.",
    featured: true
  },
  {
    id: 3,
    title: "کارگاه کاوش سیارات فراخورشیدی",
    date: "۱۴ مرداد ۱۴۰۴",
    time: "۱۴:۰۰ - ۱۷:۰۰",
    location: "آمفی‌تئاتر مرکز علوم",
    description: "کارگاه عملی در مورد شناسایی و مطالعه سیارات خارج از منظومه شمسی.",
    featured: false
  },
  {
    id: 4,
    title: "جلسه ماهانه اعضا",
    date: "۲۷ مرداد ۱۴۰۴",
    time: "۱۸:۳۰ - ۲۰:۳۰",
    location: "مرکز اجتماعی اتاق ۲۰۳",
    description: "جلسه منظم انجمن با به‌روزرسانی‌ها، برنامه‌ریزی و ارائه کوتاه در مورد اکتشافات اخیر.",
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 cosmic-glow">رویدادهای آینده</h2>
          <div className="w-20 h-1 bg-space-stellar mx-auto"></div>
          <p className="mt-4 text-lg max-w-2xl mx-auto">
            در رویدادها و فعالیت‌های آینده ما شرکت کنید. برای اعضا و غیراعضا باز است!
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
                ثبت‌نام رویداد
              </button>
            </div>
          ))}
        </div>
        
        <div className="mt-12">
          <h3 className="text-xl font-bold mb-6 text-center">رویدادهای بیشتر</h3>
          
          <div className="nebula-card">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-space-stellar/20">
                    <th className="text-right py-3 px-4">رویداد</th>
                    <th className="text-right py-3 px-4">تاریخ</th>
                    <th className="text-right py-3 px-4">مکان</th>
                    <th className="text-right py-3 px-4"></th>
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
                          جزئیات
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
              مشاهده تقویم کامل
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
