
import React, { useState, useRef } from 'react';
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
import { Upload, FileText, Loader2, X } from 'lucide-react';

const formSchema = z.object({
  title: z.string().min(5, 'عنوان باید حداقل ۵ کاراکتر باشد'),
  content: z.string().min(50, 'محتوا باید حداقل ۵۰ کاراکتر باشد'),
  file: z.any().optional()
});

const SubmissionForm = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      if (file.type === 'application/pdf' && file.size <= 10 * 1024 * 1024) {
        setSelectedFile(file);
        form.setValue('file', file);
        toast({
          title: 'موفقیت',
          description: 'فایل PDF انتخاب شد',
        });
      } else {
        toast({
          title: 'خطا',
          description: 'فقط فایل‌های PDF با حجم کمتر از ۱۰ مگابایت مجاز هستند',
          variant: 'destructive',
        });
      }
    }
  };

  const handleFileButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      if (file.type === 'application/pdf' && file.size <= 10 * 1024 * 1024) {
        setSelectedFile(file);
        form.setValue('file', file);
        toast({
          title: 'موفقیت',
          description: 'فایل PDF انتخاب شد',
        });
      } else {
        toast({
          title: 'خطا',
          description: 'فقط فایل‌های PDF با حجم کمتر از ۱۰ مگابایت مجاز هستند',
          variant: 'destructive',
        });
      }
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    form.setValue('file', undefined);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log('شروع ارسال مقاله...');
    console.log('کاربر فعلی:', user);
    console.log('داده‌های فرم:', { title: values.title, contentLength: values.content.length, hasFile: !!selectedFile });
    
    if (!user) {
      console.error('کاربر وارد نشده است');
      toast({
        title: 'خطا',
        description: 'برای ارسال مقاله ابتدا وارد شوید',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    
    try {
      console.log('ایجاد submission در پایگاه داده...');
      
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

      if (submissionError) {
        console.error('خطا در ایجاد submission:', submissionError);
        throw submissionError;
      }

      console.log('submission با موفقیت ایجاد شد:', submission);

      if (selectedFile && submission) {
        console.log('شروع آپلود فایل...', selectedFile.name);
        const fileName = `${user.id}/${submission.id}/${selectedFile.name}`;
        
        const { error: uploadError } = await supabase.storage
          .from('submissions')
          .upload(fileName, selectedFile, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) {
          console.error('خطا در آپلود فایل:', uploadError);
          throw uploadError;
        }

        console.log('فایل با موفقیت آپلود شد، ذخیره اطلاعات در پایگاه داده...');

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

        if (fileError) {
          console.error('خطا در ذخیره اطلاعات فایل:', fileError);
          throw fileError;
        }

        console.log('اطلاعات فایل با موفقیت ذخیره شد');
      }

      console.log('ارسال مقاله با موفقیت کامل شد');
      
      toast({
        title: 'موفقیت',
        description: 'مقاله شما با موفقیت ارسال شد و در انتظار بررسی است',
      });

      form.reset();
      setSelectedFile(null);
      console.log('فرم ریست شد');
      
    } catch (error) {
      console.error('خطا در ارسال مقاله:', error);
      
      let errorMessage = 'خطا در ارسال مقاله. لطفاً دوباره تلاش کنید';
      
      if (error && typeof error === 'object' && 'message' in error) {
        console.error('جزئیات خطا:', error);
        if (error.message?.includes('row-level security')) {
          errorMessage = 'مشکل در دسترسی پایگاه داده. لطفاً دوباره وارد شوید';
        } else if (error.message?.includes('permission')) {
          errorMessage = 'عدم دسترسی کافی. لطفاً دوباره وارد شوید';
        }
      }
      
      toast({
        title: 'خطا',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    console.log('کاربر وارد نشده است، نمایش دکمه ورود');
    return (
      <Card className="nebula-card">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <p>برای ارسال مقاله ابتدا وارد شوید</p>
            <Button 
              onClick={() => window.location.href = '/auth'}
              className="cosmic-button"
            >
              ورود / ثبت‌نام
            </Button>
          </div>
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
                      className="bg-space-dark-blue/50 border-space-stellar/30 focus:border-space-cosmic-purple"
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
                      className="min-h-[200px] bg-space-dark-blue/50 border-space-stellar/30 focus:border-space-cosmic-purple"
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
              <div 
                className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  dragActive 
                    ? 'border-space-cosmic-purple bg-space-cosmic-purple/10' 
                    : 'border-space-stellar/30 hover:border-space-cosmic-purple/50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                
                {selectedFile ? (
                  <div className="flex items-center justify-between bg-space-dark-blue/50 p-3 rounded border">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-space-cosmic-purple" />
                      <div className="text-right">
                        <p className="font-medium">{selectedFile.name}</p>
                        <p className="text-xs text-space-stellar/60">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={removeFile}
                      className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div 
                    className="cursor-pointer flex flex-col items-center gap-2"
                    onClick={handleFileButtonClick}
                  >
                    <Upload className="h-8 w-8 text-space-cosmic-purple" />
                    <span className="text-sm">
                      فایل PDF خود را انتخاب کنید یا اینجا بکشید
                    </span>
                    <span className="text-xs text-space-stellar/60">
                      حداکثر حجم: ۱۰ مگابایت
                    </span>
                  </div>
                )}
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full cosmic-button"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  در حال ارسال...
                </>
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
