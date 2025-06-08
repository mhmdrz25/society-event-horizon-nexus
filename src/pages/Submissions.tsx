
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SubmissionForm from '@/components/SubmissionForm';
import PhoneVerification from '@/components/PhoneVerification';
import SmsSubmissionForm from '@/components/SmsSubmissionForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, MessageSquare } from 'lucide-react';

const SubmissionsPage: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [verifiedPhone, setVerifiedPhone] = useState<string>('');

  useEffect(() => {
    if (!user && !loading) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-space-dark">
        <div className="text-space-stellar">در حال بارگذاری...</div>
      </div>
    );
  }

  const handlePhoneVerified = (phoneNumber: string) => {
    setVerifiedPhone(phoneNumber);
  };

  const resetPhoneVerification = () => {
    setVerifiedPhone('');
  };

  return (
    <div className="min-h-screen bg-space-dark text-space-stellar">
      <Navbar />
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold cosmic-glow mb-4">
              ارسال مقاله و ایده
            </h1>
            <p className="text-space-stellar text-lg">
              مقالات و ایده‌های علمی خود را برای بررسی و انتشار ارسال کنید
            </p>
          </div>

          <Tabs defaultValue="form" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="form" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                ارسال مقاله
              </TabsTrigger>
              <TabsTrigger value="sms" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                ارسال پیامکی
              </TabsTrigger>
            </TabsList>

            <TabsContent value="form">
              <SubmissionForm />
            </TabsContent>

            <TabsContent value="sms" className="space-y-6">
              {!verifiedPhone ? (
                <PhoneVerification onVerified={handlePhoneVerified} />
              ) : (
                <div className="space-y-4">
                  <SmsSubmissionForm phoneNumber={verifiedPhone} />
                  <div className="text-center">
                    <button
                      onClick={resetPhoneVerification}
                      className="text-space-stellar/60 hover:text-space-stellar text-sm underline"
                    >
                      تغییر شماره تلفن
                    </button>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SubmissionsPage;
