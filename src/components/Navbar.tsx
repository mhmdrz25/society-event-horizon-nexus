
import React, { useState } from 'react';
import { Menu, X, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  return (
    <nav className="py-4 px-6 md:px-16 flex justify-between items-center relative z-50 backdrop-blur-md bg-space-dark-blue/80 sticky top-0">
      <div className="flex items-center">
        <h1 className="text-xl md:text-2xl font-bold cosmic-glow text-space-stellar">
          انجمن<span className="text-space-cosmic-purple">افق</span>رویداد
        </h1>
      </div>
      
      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
        <li><a href="#about" className="hover:text-space-cosmic-purple transition-colors">درباره ما</a></li>
        <li><a href="#events" className="hover:text-space-cosmic-purple transition-colors">رویدادها</a></li>
        <li><a href="#members" className="hover:text-space-cosmic-purple transition-colors">اعضا</a></li>
        <li><a href="/submissions" className="hover:text-space-cosmic-purple transition-colors">ارسال مقاله</a></li>
        {user ? (
          <>
            <li><a href="/dashboard" className="hover:text-space-cosmic-purple transition-colors">داشبورد</a></li>
            <li>
              <Button size="sm" variant="outline" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {user.user_metadata?.name || user.email}
              </Button>
            </li>
          </>
        ) : (
          <li><a href="/auth" className="cosmic-button">ورود / ثبت‌نام</a></li>
        )}
      </ul>
      
      {/* Mobile Menu Button */}
      <button 
        className="md:hidden text-space-stellar-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-space-dark-blue/95 backdrop-blur-lg p-6 md:hidden">
          <ul className="flex flex-col space-y-4">
            <li><a href="#about" className="block py-2 hover:text-space-cosmic-purple" onClick={() => setIsOpen(false)}>درباره ما</a></li>
            <li><a href="#events" className="block py-2 hover:text-space-cosmic-purple" onClick={() => setIsOpen(false)}>رویدادها</a></li>
            <li><a href="#members" className="block py-2 hover:text-space-cosmic-purple" onClick={() => setIsOpen(false)}>اعضا</a></li>
            <li><a href="/submissions" className="block py-2 hover:text-space-cosmic-purple" onClick={() => setIsOpen(false)}>ارسال مقاله</a></li>
            {user ? (
              <>
                <li><a href="/dashboard" className="block py-2 hover:text-space-cosmic-purple" onClick={() => setIsOpen(false)}>داشبورد</a></li>
                <li className="pt-2 border-t border-space-stellar/20">
                  <span className="text-sm text-space-stellar/60">
                    {user.user_metadata?.name || user.email}
                  </span>
                </li>
              </>
            ) : (
              <li><a href="/auth" className="cosmic-button block text-center" onClick={() => setIsOpen(false)}>ورود / ثبت‌نام</a></li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
