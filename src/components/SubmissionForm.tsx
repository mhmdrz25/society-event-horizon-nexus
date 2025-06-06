
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { Upload, FileText, Loader2 } from 'lucide-react';

const formSchema = z.object({
  title: z.string().min(5, 'عنوان باید حداقل ۵ کاراکتر باشد'),
  content: z.string().min(50, 'محتوا باید حداقل ۵۰ کاراکتر باشد'),
  file: z.any().optional()
});

const SubmissionForm = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf') {
        setSelectedFile(file);
        form.setValue('file', file);
      } else {
        toast({
          title: 'خطا',
          description: 'فقط فایل‌های PDF مجاز هستند',
          variant: 'destructive',
        });
      }
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user) return;

    setIsLoading(true);
    try {
      // ایجاد رکورد ارسال در پایگاه داده
      const { data: submission, error: submissionError } = await supabase
        .from('submissions')
        .insert({
          user_id: user.id,
          title: values.title,
          content: values.content,
          status: 'pending'
        })
        .select()
        .single();

      if (submissionError) throw submissionError;

      // آپلود فایل در صورت انتخاب
      if (selectedFile && submission) {
        const fileName = `${user.id}/${submission.id}/${selectedFile.name}`;
        
        const { error: uploadError } = await supabase.storage
          .from('submissions')
          .upload(fileName, selectedFile);

        if (uploadError) throw uploadError;

        // ذخیره اطلاعات فایل در پایگاه داده
        const { error: fileError } = await supabase
          .from('submission_files')
          .insert({
            submission_id: submission.id,
            user_id: user.id,
            file_name: selectedFile.name,
            file_path: fileName,
            file_size: selectedFile.size,
            file_type: selectedFile.type
          });

        if (fileError) throw fileError;
      }

      toast({
        title: 'موفقیت',
        description: 'مقاله شما با موفقیت ارسال شد و در انتظار بررسی است',
      });

      form.reset();
      setSelectedFile(null);
    } catch (error) {
      console.error('Error submitting:', error);
      toast({
        title: 'خطا',
        description: 'خطا در ارسال مقاله. لطفاً دوباره تلاش کنید',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <Card className="nebula-card">
        <CardContent className="p-6">
          <p className="text-center">برای ارسال مقاله ابتدا وارد شوید</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="nebula-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          ارسال مقاله یا ایده علمی
        </CardTitle>
        <CardDescription>
          مقاله یا ایده علمی خود را برای بررسی و انتشار ارسال کنید
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>عنوان مقاله</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="عنوان مقاله خود را وارد کنید"
                      {...field}
                      className="bg-space-dark-blue/50 border-space-stellar/30"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>محتوای مقاله</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="خلاصه یا محتوای کامل مقاله خود را وارد کنید"
                      className="min-h-[200px] bg-space-dark-blue/50 border-space-stellar/30"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <label className="block text-sm font-medium mb-2">
                فایل PDF (اختیاری)
              </label>
              <div className="border-2 border-dashed border-space-stellar/30 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <Upload className="h-8 w-8 text-space-cosmic-purple" />
                  <span className="text-sm">
                    {selectedFile ? selectedFile.name : 'فایل PDF خود را انتخاب کنید'}
                  </span>
                  <span className="text-xs text-space-stellar/60">
                    حداکثر حجم: ۱۰ مگابایت
                  </span>
                </label>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full cosmic-button"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'ارسال مقاله'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SubmissionForm;
