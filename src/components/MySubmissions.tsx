
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { FileText, Download, Calendar } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface Submission {
  id: string;
  title: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
  submitted_at: string;
  submission_files?: Array<{
    id: string;
    file_name: string;
    file_path: string;
    file_size: number;
  }>;
}

const MySubmissions = () => {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchSubmissions();
    }
  }, [user]);

  const fetchSubmissions = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('submissions')
        .select(`
          *,
          submission_files (
            id,
            file_name,
            file_path,
            file_size
          )
        `)
        .eq('user_id', user.id)
        .order('submitted_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      toast({
        title: 'خطا',
        description: 'خطا در بارگذاری ارسال‌ها',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const downloadFile = async (filePath: string, fileName: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('submissions')
        .download(filePath);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
      toast({
        title: 'خطا',
        description: 'خطا در دانلود فایل',
        variant: 'destructive',
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">در انتظار بررسی</Badge>;
      case 'approved':
        return <Badge variant="default" className="bg-green-600">تأیید شده</Badge>;
      case 'rejected':
        return <Badge variant="destructive">رد شده</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (!user) {
    return (
      <Card className="nebula-card">
        <CardContent className="p-6">
          <p className="text-center">برای مشاهده ارسال‌ها ابتدا وارد شوید</p>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="nebula-card">
        <CardContent className="p-6">
          <p className="text-center">در حال بارگذاری...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <FileText className="h-6 w-6 text-space-cosmic-purple" />
        <h2 className="text-2xl font-bold">ارسال‌های من</h2>
      </div>

      {submissions.length === 0 ? (
        <Card className="nebula-card">
          <CardContent className="p-6">
            <p className="text-center text-space-stellar/60">
              هنوز مقاله‌ای ارسال نکرده‌اید
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {submissions.map((submission) => (
            <Card key={submission.id} className="nebula-card">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{submission.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-2">
                      <Calendar className="h-4 w-4" />
                      {new Date(submission.submitted_at).toLocaleDateString('fa-IR')}
                    </CardDescription>
                  </div>
                  {getStatusBadge(submission.status)}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-space-stellar/80 mb-4 line-clamp-3">
                  {submission.content}
                </p>
                
                {submission.submission_files && submission.submission_files.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">فایل‌های ضمیمه:</h4>
                    {submission.submission_files.map((file) => (
                      <div key={file.id} className="flex items-center justify-between bg-space-dark-blue/30 p-3 rounded">
                        <div>
                          <p className="text-sm font-medium">{file.file_name}</p>
                          <p className="text-xs text-space-stellar/60">
                            {(file.file_size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => downloadFile(file.file_path, file.file_name)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MySubmissions;
