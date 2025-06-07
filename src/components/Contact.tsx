
import React, { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: 'سؤال عمومی',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    toast.success('از پیام شما متشکریم! به زودی با شما تماس خواهیم گرفت.');
    setFormData({
      name: '',
      email: '',
      interest: 'سؤال عمومی',
      message: ''
    });
  };

  return (
    <section id="contact" className="py-20 bg-space-deep-blue/30 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-1/2 bg-space-stellar opacity-5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 cosmic-glow">به جامعه ما بپیوندید</h2>
          <div className="w-20 h-1 bg-space-stellar mx-auto"></div>
          <p className="mt-4 text-lg max-w-2xl mx-auto">
            علاقه‌مند به عضویت در انجمن افق رویداد هستید یا سؤالی دارید؟ با ما تماس بگیرید!
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-6 text-space-stellar">اطلاعات تماس</h3>
              
              <div className="nebula-card mb-8">
                <div className="flex items-center mb-4">
                  <Mail className="w-5 h-5 mr-3 text-space-stellar" />
                  <span>info@eventhorizonsociety.org</span>
                </div>
                
                <p className="mb-4">
                  جلسات منظم ما در سومین دوشنبه هر ماه در مرکز علوم اجتماعی برگزار می‌شود.
                </p>
                
                <p>
                  عضویت برای همه علاقه‌مندان به نجوم، اخترفیزیک یا کاوش فضایی باز است.
                </p>
              </div>
              
              <div>
                <h4 className="font-bold mb-4">مزایای عضویت</h4>
                <ul className="list-disc pr-5 space-y-2">
                  <li>دسترسی به سخنرانی‌ها و کارگاه‌های ماهانه</li>
                  <li>شرکت در رویدادهای ویژه رصد ستارگان</li>
                  <li>اشتراک خبرنامه فصلی ما</li>
                  <li>ارتباط با سایر علاقه‌مندان فضا</li>
                  <li>نرخ تخفیف‌دار برای رویدادهای ویژه</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-6 text-space-stellar">با ما در تماس باشید</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium">نام</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-space-dark-blue/50 border border-space-stellar/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-space-stellar text-white"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium">ایمیل</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-space-dark-blue/50 border border-space-stellar/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-space-stellar text-white"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="interest" className="block mb-2 text-sm font-medium">علاقه‌مندی من</label>
                  <select
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-space-dark-blue/50 border border-space-stellar/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-space-stellar text-white"
                  >
                    <option value="سؤال عمومی">سؤال عمومی</option>
                    <option value="عضویت">عضویت</option>
                    <option value="داوطلبی">داوطلبی</option>
                    <option value="سخنرانی در رویداد">سخنرانی در رویداد</option>
                    <option value="فرصت‌های حمایت مالی">فرصت‌های حمایت مالی</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block mb-2 text-sm font-medium">پیام</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-space-dark-blue/50 border border-space-stellar/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-space-stellar text-white"
                    required
                  />
                </div>
                
                <button type="submit" className="cosmic-button flex items-center justify-center w-full">
                  <Send className="w-4 h-4 ml-2" />
                  ارسال پیام
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
