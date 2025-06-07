
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { Smartphone, MessageSquare, Check } from 'lucide-react';

interface PhoneVerificationProps {
  onVerified: (phoneNumber: string) => void;
}

const PhoneVerification = ({ onVerified }: PhoneVerificationProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sendVerificationCode = async () => {
    if (!phoneNumber || phoneNumber.length < 11) {
      toast({
        title: 'خطا',
        description: 'شماره تلفن معتبر وارد کنید',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      // تولید کد تصادفی ۶ رقمی
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      
      // ذخیره کد در پایگاه داده
      const { error } = await supabase
        .from('verified_phones')
        .upsert({
          phone_number: phoneNumber,
          verification_code: code,
          is_verified: false
        });

      if (error) throw error;

      // در محیط واقعی، اینجا کد پیامک ارسال می‌شود
      // برای تست، کد را در کنسول نمایش می‌دهیم
      console.log(`کد تأیید برای شماره ${phoneNumber}: ${code}`);
      
      setIsCodeSent(true);
      toast({
        title: 'کد ارسال شد',
        description: `کد تأیید به شماره ${phoneNumber} ارسال شد`,
      });
    } catch (error) {
      console.error('Error sending code:', error);
      toast({
        title: 'خطا',
        description: 'خطا در ارسال کد تأیید',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const verifyCode = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      toast({
        title: 'خطا',
        description: 'کد ۶ رقمی وارد کنید',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      // بررسی کد تأیید
      const { data, error } = await supabase
        .from('verified_phones')
        .select('*')
        .eq('phone_number', phoneNumber)
        .eq('verification_code', verificationCode)
        .single();

      if (error || !data) {
        toast({
          title: 'خطا',
          description: 'کد تأیید اشتباه است',
          variant: 'destructive',
        });
        return;
      }

      // تأیید شماره تلفن
      const { error: updateError } = await supabase
        .from('verified_phones')
        .update({
          is_verified: true,
          verified_at: new Date().toISOString()
        })
        .eq('id', data.id);

      if (updateError) throw updateError;

      toast({
        title: 'تأیید شد',
        description: 'شماره تلفن شما تأیید شد',
      });

      onVerified(phoneNumber);
    } catch (error) {
      console.error('Error verifying code:', error);
      toast({
        title: 'خطا',
        description: 'خطا در تأیید کد',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="nebula-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Smartphone className="h-5 w-5" />
          تأیید شماره تلفن
        </CardTitle>
        <CardDescription>
          برای ارسال مقاله از طریق پیامک، ابتدا شماره تلفن خود را تأیید کنید
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4" style={{ pointerEvents: 'auto' }}>
        {!isCodeSent ? (
          <>
            <div>
              <label className="block text-sm font-medium mb-2">
                شماره تلفن همراه
              </label>
              <Input
                type="tel"
                placeholder="09123456789"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="bg-space-dark-blue/50 border-space-stellar/30"
                dir="ltr"
                style={{ pointerEvents: 'auto', zIndex: 10 }}
              />
            </div>
            <Button
              onClick={sendVerificationCode}
              disabled={isLoading}
              className="w-full cosmic-button"
              style={{ pointerEvents: 'auto', zIndex: 10 }}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              ارسال کد تأیید
            </Button>
          </>
        ) : (
          <>
            <div>
              <label className="block text-sm font-medium mb-2">
                کد تأیید ۶ رقمی
              </label>
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={verificationCode}
                  onChange={setVerificationCode}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={verifyCode}
                disabled={isLoading}
                className="flex-1 cosmic-button"
                style={{ pointerEvents: 'auto', zIndex: 10 }}
              >
                <Check className="h-4 w-4 mr-2" />
                تأیید کد
              </Button>
              <Button
                onClick={() => setIsCodeSent(false)}
                variant="outline"
                className="flex-1"
                style={{ pointerEvents: 'auto', zIndex: 10 }}
              >
                تغییر شماره
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default PhoneVerification;
