
import React, { useState } from 'react';
import { Menu, X, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(false);
    
    if (href.startsWith('#')) {
      // Internal anchor link
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // External route
      window.location.href = href;
    }
  };

  return (
    <nav className="py-4 px-6 md:px-16 flex justify-between items-center relative z-50 backdrop-blur-md bg-space-dark-blue/80 sticky top-0">
      <div className="flex items-center">
        <h1 className="text-xl md:text-2xl font-bold cosmic-glow text-space-stellar cursor-pointer"
            onClick={(e) => handleNavClick(e, '/')}>
          انجمن<span className="text-space-cosmic-purple">افق</span>رویداد
        </h1>
      </div>
      
      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
        <li>
          <button 
            onClick={(e) => handleNavClick(e, '#about')} 
            className="hover:text-space-cosmic-purple transition-colors cursor-pointer bg-transparent border-none text-space-stellar"
          >
            درباره ما
          </button>
        </li>
        <li>
          <button 
            onClick={(e) => handleNavClick(e, '#events')} 
            className="hover:text-space-cosmic-purple transition-colors cursor-pointer bg-transparent border-none text-space-stellar"
          >
            رویدادها
          </button>
        </li>
        <li>
          <button 
            onClick={(e) => handleNavClick(e, '#members')} 
            className="hover:text-space-cosmic-purple transition-colors cursor-pointer bg-transparent border-none text-space-stellar"
          >
            اعضا
          </button>
        </li>
        <li>
          <button 
            onClick={(e) => handleNavClick(e, '/submissions')} 
            className="hover:text-space-cosmic-purple transition-colors cursor-pointer bg-transparent border-none text-space-stellar"
          >
            ارسال مقاله
          </button>
        </li>
        {user ? (
          <>
            <li>
              <button 
                onClick={(e) => handleNavClick(e, '/dashboard')} 
                className="hover:text-space-cosmic-purple transition-colors cursor-pointer bg-transparent border-none text-space-stellar"
              >
                داشبورد
              </button>
            </li>
            <li>
              <Button size="sm" variant="outline" className="flex items-center gap-2 pointer-events-auto">
                <User className="h-4 w-4" />
                {user.user_metadata?.name || user.email}
              </Button>
            </li>
          </>
        ) : (
          <li>
            <Button 
              onClick={(e) => handleNavClick(e, '/auth')}
              className="cosmic-button pointer-events-auto"
            >
              ورود / ثبت‌نام
            </Button>
          </li>
        )}
      </ul>
      
      {/* Mobile Menu Button */}
      <button 
        className="md:hidden text-space-stellar-white z-50 relative bg-transparent border-none cursor-pointer p-2"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-space-dark-blue/95 backdrop-blur-lg p-6 md:hidden z-40">
          <ul className="flex flex-col space-y-4">
            <li>
              <button 
                onClick={(e) => handleNavClick(e, '#about')} 
                className="block py-2 hover:text-space-cosmic-purple bg-transparent border-none text-space-stellar w-full text-right cursor-pointer"
              >
                درباره ما
              </button>
            </li>
            <li>
              <button 
                onClick={(e) => handleNavClick(e, '#events')} 
                className="block py-2 hover:text-space-cosmic-purple bg-transparent border-none text-space-stellar w-full text-right cursor-pointer"
              >
                رویدادها
              </button>
            </li>
            <li>
              <button 
                onClick={(e) => handleNavClick(e, '#members')} 
                className="block py-2 hover:text-space-cosmic-purple bg-transparent border-none text-space-stellar w-full text-right cursor-pointer"
              >
                اعضا
              </button>
            </li>
            <li>
              <button 
                onClick={(e) => handleNavClick(e, '/submissions')} 
                className="block py-2 hover:text-space-cosmic-purple bg-transparent border-none text-space-stellar w-full text-right cursor-pointer"
              >
                ارسال مقاله
              </button>
            </li>
            {user ? (
              <>
                <li>
                  <button 
                    onClick={(e) => handleNavClick(e, '/dashboard')} 
                    className="block py-2 hover:text-space-cosmic-purple bg-transparent border-none text-space-stellar w-full text-right cursor-pointer"
                  >
                    داشبورد
                  </button>
                </li>
                <li className="pt-2 border-t border-space-stellar/20">
                  <span className="text-sm text-space-stellar/60">
                    {user.user_metadata?.name || user.email}
                  </span>
                </li>
              </>
            ) : (
              <li>
                <Button 
                  onClick={(e) => handleNavClick(e, '/auth')}
                  className="cosmic-button block text-center w-full pointer-events-auto"
                >
                  ورود / ثبت‌نام
                </Button>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
