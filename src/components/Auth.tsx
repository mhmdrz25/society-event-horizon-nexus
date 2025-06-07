
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp, signIn } = useAuth();
  const { toast } = useToast();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await signUp(email, password, name);
    
    if (error) {
      toast({
        title: "خطا در ثبت‌نام",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "ثبت‌نام موفق",
        description: "لطفاً ایمیل خود را بررسی کنید"
      });
    }
    
    setLoading(false);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await signIn(email, password);
    
    if (error) {
      toast({
        title: "خطا در ورود",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "ورود موفق",
        description: "خوش آمدید!"
      });
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-space-dark py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md nebula-card">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl cosmic-glow">انجمن افق رویداد</CardTitle>
          <CardDescription>
            به جامعه کاوشگران کیهان بپیوندید
          </CardDescription>
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
                  />
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
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full cosmic-button" 
                  disabled={loading}
                >
                  {loading ? 'در حال ورود...' : 'ورود'}
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
                  />
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
                  />
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
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full cosmic-button" 
                  disabled={loading}
                >
                  {loading ? 'در حال ثبت‌نام...' : 'ثبت‌نام'}
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
