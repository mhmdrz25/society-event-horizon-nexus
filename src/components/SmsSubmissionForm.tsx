
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { MessageSquare, Send } from 'lucide-react';

interface SmsSubmissionFormProps {
  phoneNumber: string;
}

const SmsSubmissionForm = ({ phoneNumber }: SmsSubmissionFormProps) => {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim() || content.length < 20) {
      toast({
        title: 'خطا',
        description: 'محتوا باید حداقل ۲۰ کاراکتر باشد',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    console.log('شروع ارسال پیامک...', { phoneNumber, contentLength: content.length });
    
    try {
      const guestTitle = `ارسال پیامکی - ${phoneNumber}`;
      
      const { error } = await supabase
        .from('submissions')
        .insert({
          user_id: '00000000-0000-0000-0000-000000000000',
          title: guestTitle,
          content: `شماره تلفن: ${phoneNumber}\n\nمحتوا:\n${content}`,
          status: 'pending'
        });

      if (error) {
        console.error('خطا در ارسال پیامک:', error);
        throw error;
      }

      console.log('پیامک با موفقیت ارسال شد');

      toast({
        title: 'موفقیت',
        description: 'پیام شما ارسال شد و در انتظار بررسی است',
      });

      setContent('');
    } catch (error) {
      console.error('Error submitting SMS:', error);
      toast({
        title: 'خطا',
        description: 'خطا در ارسال پیام. لطفاً دوباره تلاش کنید',
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
          <MessageSquare className="h-5 w-5" />
          ارسال ایده از طریق پیامک
        </CardTitle>
        <CardDescription>
          شماره تأیید شده: {phoneNumber}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              محتوای ایده یا مقاله
            </label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="ایده یا خلاصه مقاله خود را بنویسید..."
              className="min-h-[150px] bg-space-dark-blue/50 border-space-stellar/30 focus:border-space-cosmic-purple"
              maxLength={1000}
            />
            <p className="text-xs text-space-stellar/60 mt-1">
              {content.length}/1000 کاراکتر
            </p>
          </div>
          
          <Button
            type="submit"
            disabled={isLoading || content.length < 20}
            className="w-full cosmic-button"
          >
            <Send className="h-4 w-4 mr-2" />
            {isLoading ? 'در حال ارسال...' : 'ارسال مقاله'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SmsSubmissionForm;
