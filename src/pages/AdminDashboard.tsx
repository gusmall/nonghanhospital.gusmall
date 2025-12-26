import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/shared/AdminLayout';
import { NewsManagement } from '@/components/admin/news/NewsManagement';
import { GalleryManagement } from '@/components/admin/gallery/GalleryManagement';
import { Card, CardContent } from '@/components/ui/card';
import { Settings, Newspaper, Image, Calendar, Users } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'dashboard';

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      navigate('/admin');
    }
  }, [navigate]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'news':
        return <NewsManagement />;

      case 'gallery':
        return <GalleryManagement />;

      case 'dashboard':
        return (
          <div className="p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">ยินดีต้อนรับสู่ระบบจัดการโรงเรียน</h1>
              <p className="text-muted-foreground">เลือกเมนูด้านซ้ายเพื่อจัดการข้อมูลต่างๆ</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { label: 'นักเรียนทั้งหมด', value: '-', icon: Users, color: 'bg-blue-500' },
                { label: 'ข่าวประชาสัมพันธ์', value: '-', icon: Newspaper, color: 'bg-orange-500' },
                { label: 'แกลเลอรี่', value: '-', icon: Image, color: 'bg-green-500' },
                { label: 'กิจกรรม', value: '-', icon: Calendar, color: 'bg-purple-500' },
              ].map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-3xl font-bold text-foreground mt-1">{stat.value}</p>
                      </div>
                      <div className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardContent className="p-12 text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Settings className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">เริ่มใช้งานระบบ</h3>
                <p className="text-muted-foreground mb-4">
                  เลือกเมนูด้านซ้ายเพื่อจัดการข้อมูลต่างๆ ของโรงเรียน
                </p>
                <div className="flex flex-wrap gap-2 justify-center mt-6">
                  {[
                    { label: 'ข่าวสาร', tab: 'news', icon: Newspaper },
                    { label: 'แกลเลอรี่', tab: 'gallery', icon: Image },
                    { label: 'ปฏิทิน', tab: 'events', icon: Calendar },
                  ].map((item) => (
                    <button
                      key={item.tab}
                      onClick={() => navigate(`/admin/dashboard?tab=${item.tab}`)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        // Gallery, Events, Students, Staff, etc.
        return (
          <div className="p-8">
            <Card>
              <CardContent className="p-12 text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
                  <Settings className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">กำลังพัฒนา</h3>
                <p className="text-muted-foreground">ฟีเจอร์นี้กำลังอยู่ระหว่างการพัฒนา</p>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <AdminLayout>
      {renderTabContent()}
    </AdminLayout>
  );
};

export default AdminDashboard;
