
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, AlertCircle } from 'lucide-react';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const { signUp, signIn } = useAuth();

  const validateForm = (isSignUp: boolean = false) => {
    const newErrors: {[key: string]: string} = {};
    
    if (!email.trim()) {
      newErrors.email = 'ایمیل الزامی است';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'فرمت ایمیل صحیح نیست';
    }
    
    if (!password.trim()) {
      newErrors.password = 'رمز عبور الزامی است';
    } else if (password.length < 6) {
      newErrors.password = 'رمز عبور باید حداقل ۶ کاراکتر باشد';
    }
    
    if (isSignUp && !name.trim()) {
      newErrors.name = 'نام و نام خانوادگی الزامی است';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm(true)) {
      return;
    }

    setLoading(true);
    setErrors({});
    
    try {
      const { error, data } = await signUp(email.trim(), password, name.trim());
      
      if (error) {
        console.error('خطا در ثبت‌نام:', error);
        
        let errorMessage = 'خطا در ثبت‌نام';
        
        if (error.message?.includes('User already registered')) {
          errorMessage = 'این ایمیل قبلاً ثبت شده است. از تب ورود استفاده کنید.';
        } else if (error.message?.includes('Invalid email')) {
          errorMessage = 'فرمت ایمیل صحیح نیست';
        } else if (error.message?.includes('Password should be at least')) {
          errorMessage = 'رمز عبور باید حداقل ۶ کاراکتر باشد';
        } else if (error.message?.includes('Email not confirmed')) {
          errorMessage = 'لطفاً ایمیل خود را تأیید کنید و سپس وارد شوید';
        } else {
          errorMessage = error.message || 'خطا در ثبت‌نام';
        }
        
        toast({
          title: "خطا در ثبت‌نام",
          description: errorMessage,
          variant: "destructive"
        });
      } else {
        // Check if user is immediately signed in (email confirmation disabled)
        if (data.session) {
          toast({
            title: "ثبت‌نام موفق",
            description: "ثبت‌نام با موفقیت انجام شد و وارد شدید!"
          });
        } else {
          toast({
            title: "ثبت‌نام موفق",
            description: "حساب شما ایجاد شد. اکنون می‌توانید وارد شوید."
          });
        }
        
        // Reset form
        setEmail('');
        setPassword('');
        setName('');
      }
    } catch (error) {
      console.error('خطای غیرمنتظره در ثبت‌نام:', error);
      toast({
        title: "خطا",
        description: "خطای غیرمنتظره در ثبت‌نام",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm(false)) {
      return;
    }

    setLoading(true);
    setErrors({});
    
    try {
      const { error } = await signIn(email.trim(), password);
      
      if (error) {
        console.error('خطا در ورود:', error);
        
        let errorMessage = 'خطا در ورود';
        
        if (error.message?.includes('Invalid login credentials')) {
          errorMessage = 'ایمیل یا رمز عبور اشتباه است';
        } else if (error.message?.includes('Email not confirmed')) {
          errorMessage = 'ایمیل شما تأیید نشده است. لطفاً ایمیل خود را بررسی کنید یا مجدداً ثبت‌نام کنید.';
        } else if (error.message?.includes('Too many requests')) {
          errorMessage = 'تعداد تلاش‌های ورود بیش از حد. لطفاً کمی بعد تلاش کنید';
        } else {
          errorMessage = error.message || 'خطا در ورود';
        }
        
        toast({
          title: "خطا در ورود",
          description: errorMessage,
          variant: "destructive"
        });
      } else {
        toast({
          title: "ورود موفق",
          description: "با موفقیت وارد شدید!"
        });
      }
    } catch (error) {
      console.error('خطای غیرمنتظره در ورود:', error);
      toast({
        title: "خطا",
        description: "خطای غیرمنتظره در ورود",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-space-dark py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md nebula-card">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl cosmic-glow">انجمن افق رویداد</CardTitle>
          <CardDescription>
            به جامعه کاوشگران کیهان بپیوندید
          </CardDescription>
          
          {/* Email confirmation notice */}
          <div className="mt-4 p-3 bg-amber-500/20 border border-amber-500/30 rounded-lg flex items-center gap-2 text-sm text-amber-200">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <div className="text-right">
              اگر مشکل تأیید ایمیل دارید، در تنظیمات Supabase گزینه "Confirm email" را خاموش کنید.
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">ورود</TabsTrigger>
              <TabsTrigger value="signup">ثبت‌نام</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div>
                  <Label htmlFor="email">ایمیل</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-space-dark-blue/50 border-space-stellar/30"
                    disabled={loading}
                    placeholder="example@gmail.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="password">رمز عبور</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-space-dark-blue/50 border-space-stellar/30"
                    disabled={loading}
                    placeholder="حداقل ۶ کاراکتر"
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500 mt-1">{errors.password}</p>
                  )}
                </div>
                <Button 
                  type="submit" 
                  className="w-full cosmic-button" 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      در حال ورود...
                    </>
                  ) : (
                    'ورود'
                  )}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div>
                  <Label htmlFor="name">نام و نام خانوادگی</Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-space-dark-blue/50 border-space-stellar/30"
                    disabled={loading}
                    placeholder="نام کامل خود را وارد کنید"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="signup-email">ایمیل</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-space-dark-blue/50 border-space-stellar/30"
                    disabled={loading}
                    placeholder="example@gmail.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="signup-password">رمز عبور</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-space-dark-blue/50 border-space-stellar/30"
                    disabled={loading}
                    placeholder="حداقل ۶ کاراکتر"
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500 mt-1">{errors.password}</p>
                  )}
                </div>
                <Button 
                  type="submit" 
                  className="w-full cosmic-button" 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      در حال ثبت‌نام...
                    </>
                  ) : (
                    'ثبت‌نام'
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
