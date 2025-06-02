
import React from 'react';
import { Facebook, Twitter, Instagram, Github } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-space-dark-blue/90 pt-12 pb-6">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-space-stellar">انجمن افق رویداد</h3>
            <p className="mb-4 text-space-stellar-white/70">
              کاوش در مرزهای علم، فضا و رازهای کیهان
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
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-space-stellar">پیوندهای سریع</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="text-space-stellar-white/70 hover:text-space-stellar transition-colors">درباره ما</a></li>
              <li><a href="#events" className="text-space-stellar-white/70 hover:text-space-stellar transition-colors">رویدادها</a></li>
              <li><a href="#" className="text-space-stellar-white/70 hover:text-space-stellar transition-colors">منابع</a></li>
              <li><a href="#" className="text-space-stellar-white/70 hover:text-space-stellar transition-colors">وبلاگ</a></li>
              <li><a href="#contact" className="text-space-stellar-white/70 hover:text-space-stellar transition-colors">تماس</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-space-stellar">خبرنامه</h3>
            <p className="mb-4 text-space-stellar-white/70">
              برای دریافت آخرین اخبار رویدادها، پدیده‌های نجومی و اخبار انجمن مشترک شوید.
            </p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="ایمیل شما" 
                className="px-4 py-2 bg-space-dark-blue border border-space-stellar/30 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-space-stellar flex-1"
              />
              <button 
                type="submit" 
                className="px-4 py-2 bg-space-cosmic-blue text-space-stellar-white rounded-r-lg hover:bg-space-stellar hover:text-space-dark-blue transition-colors"
              >
                عضویت
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-space-stellar/20 pt-6 text-center text-space-stellar-white/50 text-sm">
          <p>&copy; {currentYear} انجمن افق رویداد. تمامی حقوق محفوظ است.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
