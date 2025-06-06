
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Users, FileText, Bell } from 'lucide-react';
import MySubmissions from '@/components/MySubmissions';

const Dashboard = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold cosmic-glow">داشبورد</h1>
          <p className="text-space-stellar mt-2">خوش آمدید، {user?.user_metadata?.name || user?.email}</p>
        </div>
        <Button onClick={handleSignOut} variant="outline">
          خروج
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="nebula-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">رویدادهای آینده</CardTitle>
            <Calendar className="h-4 w-4 text-space-cosmic-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-space-stellar/60">
              رویداد در این ماه
            </p>
          </CardContent>
        </Card>

        <Card className="nebula-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">اعضای فعال</CardTitle>
            <Users className="h-4 w-4 text-space-cosmic-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-space-stellar/60">
              عضو در این ماه
            </p>
          </CardContent>
        </Card>

        <Card className="nebula-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ارسال‌های جدید</CardTitle>
            <FileText className="h-4 w-4 text-space-cosmic-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-space-stellar/60">
              ارسال در انتظار بررسی
            </p>
          </CardContent>
        </Card>

        <Card className="nebula-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">اعلان‌ها</CardTitle>
            <Bell className="h-4 w-4 text-space-cosmic-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-space-stellar/60">
              اعلان خوانده نشده
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <Card className="nebula-card">
          <CardHeader>
            <CardTitle>آخرین رویدادها</CardTitle>
            <CardDescription>
              رویدادهای پیش رو انجمن
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-space-stellar/20 pb-2">
                <div>
                  <p className="font-medium">جلسه رصد آسمان شب</p>
                  <p className="text-sm text-space-stellar/60">۱۵ آذر ۱۴۰۳</p>
                </div>
                <Button size="sm" className="cosmic-button">
                  ثبت‌نام
                </Button>
              </div>
              <div className="flex items-center justify-between border-b border-space-stellar/20 pb-2">
                <div>
                  <p className="font-medium">سخنرانی در مورد سیاه‌چاله‌ها</p>
                  <p className="text-sm text-space-stellar/60">۲۰ آذر ۱۴۰۳</p>
                </div>
                <Button size="sm" className="cosmic-button">
                  ثبت‌نام
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="nebula-card">
          <CardHeader>
            <CardTitle>آخرین اعلانات</CardTitle>
            <CardDescription>
              جدیدترین اخبار انجمن
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b border-space-stellar/20 pb-2">
                <p className="font-medium">کارگاه آموزشی تلسکوپ</p>
                <p className="text-sm text-space-stellar/60">
                  کارگاه آموزشی استفاده از تلسکوپ برای مبتدیان برگزار می‌شود.
                </p>
              </div>
              <div className="border-b border-space-stellar/20 pb-2">
                <p className="font-medium">مسابقه عکاسی نجومی</p>
                <p className="text-xs text-space-stellar/60">
                  مسابقه عکاسی نجومی انجمن شروع شده است.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <MySubmissions />
    </div>
  );
};

export default Dashboard;
