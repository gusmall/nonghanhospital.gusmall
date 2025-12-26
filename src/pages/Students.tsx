import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Users, GraduationCap, Trophy, BookOpen, TrendingUp, Star } from 'lucide-react';

const studentStats = [
  { icon: Users, label: 'นักเรียนทั้งหมด', value: '1,250', color: 'text-primary' },
  { icon: GraduationCap, label: 'ม.ปลาย', value: '650', color: 'text-accent' },
  { icon: BookOpen, label: 'ม.ต้น', value: '600', color: 'text-green-500' },
  { icon: Trophy, label: 'นักเรียนเกียรตินิยม', value: '180', color: 'text-purple-500' },
];

const gradeData = [
  {
    level: 'มัธยมศึกษาปีที่ 1',
    rooms: 6,
    students: 210,
    boys: 105,
    girls: 105,
  },
  {
    level: 'มัธยมศึกษาปีที่ 2',
    rooms: 6,
    students: 200,
    boys: 98,
    girls: 102,
  },
  {
    level: 'มัธยมศึกษาปีที่ 3',
    rooms: 6,
    students: 190,
    boys: 95,
    girls: 95,
  },
  {
    level: 'มัธยมศึกษาปีที่ 4',
    rooms: 6,
    students: 220,
    boys: 110,
    girls: 110,
  },
  {
    level: 'มัธยมศึกษาปีที่ 5',
    rooms: 6,
    students: 215,
    boys: 108,
    girls: 107,
  },
  {
    level: 'มัธยมศึกษาปีที่ 6',
    rooms: 6,
    students: 215,
    boys: 107,
    girls: 108,
  },
];

const achievements = [
  {
    title: 'เหรียญทองโอลิมปิกวิชาการ',
    description: 'นักเรียนได้รับเหรียญทองการแข่งขันคณิตศาสตร์โอลิมปิกระดับชาติ',
    year: '2567',
    icon: Trophy,
  },
  {
    title: 'รางวัลชนะเลิศวิทยาศาสตร์',
    description: 'โครงงานวิทยาศาสตร์ได้รับรางวัลชนะเลิศระดับภาค',
    year: '2567',
    icon: Star,
  },
  {
    title: 'ทุนการศึกษาต่อต่างประเทศ',
    description: 'นักเรียนได้รับทุนเรียนต่อมหาวิทยาลัยชั้นนำในต่างประเทศ',
    year: '2567',
    icon: GraduationCap,
  },
  {
    title: 'ผลสอบ O-NET สูงกว่าค่าเฉลี่ย',
    description: 'ผลสอบ O-NET ทุกวิชาสูงกว่าค่าเฉลี่ยระดับประเทศ',
    year: '2566',
    icon: TrendingUp,
  },
];

const activities = [
  {
    name: 'ชมรมวิทยาศาสตร์',
    members: 85,
    description: 'ทดลองและค้นคว้าทางวิทยาศาสตร์',
  },
  {
    name: 'ชมรมคณิตศาสตร์',
    members: 70,
    description: 'พัฒนาทักษะการคิดวิเคราะห์',
  },
  {
    name: 'ชมรมภาษาอังกฤษ',
    members: 90,
    description: 'พัฒนาทักษะการสื่อสารภาษาอังกฤษ',
  },
  {
    name: 'ชมรมดนตรี',
    members: 65,
    description: 'เรียนรู้และแสดงดนตรีหลากหลายแนว',
  },
  {
    name: 'ชมรมกีฬา',
    members: 120,
    description: 'ฝึกฝนกีฬาและส่งเสริมสุขภาพ',
  },
  {
    name: 'ชมรมศิลปะ',
    members: 55,
    description: 'สร้างสรรค์ผลงานศิลปะหลากหลายรูปแบบ',
  },
];

const Students = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block text-accent font-semibold mb-4">นักเรียน</span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
                ข้อมูลนักเรียน
              </h1>
              <p className="text-primary-foreground/80 text-lg">
                ข้อมูลสถิตินักเรียน ผลงานความสำเร็จ และกิจกรรมต่างๆ ของโรงเรียน
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {studentStats.map((stat, index) => (
                <div key={index} className="bg-card rounded-2xl p-6 text-center shadow-md border border-border">
                  <div className={`w-12 h-12 rounded-full ${stat.color}/10 flex items-center justify-center mx-auto mb-4`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Grade Distribution */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-block text-accent font-semibold mb-4">สถิติ</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                จำนวนนักเรียนแยกตามระดับชั้น
              </h2>
              <p className="text-muted-foreground">
                ข้อมูลจำนวนนักเรียนในแต่ละระดับชั้น ปีการศึกษา 2567
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full bg-card rounded-2xl shadow-md border border-border overflow-hidden">
                <thead className="bg-primary text-primary-foreground">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">ระดับชั้น</th>
                    <th className="px-6 py-4 text-center font-semibold">จำนวนห้อง</th>
                    <th className="px-6 py-4 text-center font-semibold">นักเรียนชาย</th>
                    <th className="px-6 py-4 text-center font-semibold">นักเรียนหญิง</th>
                    <th className="px-6 py-4 text-center font-semibold">รวม</th>
                  </tr>
                </thead>
                <tbody>
                  {gradeData.map((grade, index) => (
                    <tr key={index} className="border-t border-border hover:bg-secondary/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-foreground">{grade.level}</td>
                      <td className="px-6 py-4 text-center text-muted-foreground">{grade.rooms}</td>
                      <td className="px-6 py-4 text-center text-blue-500 font-semibold">{grade.boys}</td>
                      <td className="px-6 py-4 text-center text-pink-500 font-semibold">{grade.girls}</td>
                      <td className="px-6 py-4 text-center text-primary font-bold">{grade.students}</td>
                    </tr>
                  ))}
                  <tr className="bg-secondary/50 font-bold">
                    <td className="px-6 py-4 text-foreground">รวมทั้งหมด</td>
                    <td className="px-6 py-4 text-center text-muted-foreground">36</td>
                    <td className="px-6 py-4 text-center text-blue-500">623</td>
                    <td className="px-6 py-4 text-center text-pink-500">627</td>
                    <td className="px-6 py-4 text-center text-primary">1,250</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-block text-accent font-semibold mb-4">ความสำเร็จ</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                ผลงานนักเรียนดีเด่น
              </h2>
              <p className="text-muted-foreground">
                ความสำเร็จและรางวัลที่นักเรียนได้รับจากการแข่งขันต่างๆ
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="bg-card rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-border"
                >
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    <achievement.icon className="w-6 h-6 text-accent" />
                  </div>
                  <span className="text-sm text-primary font-semibold">{achievement.year}</span>
                  <h3 className="text-lg font-bold text-foreground mt-1 mb-2">{achievement.title}</h3>
                  <p className="text-muted-foreground text-sm">{achievement.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Activities */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-block text-accent font-semibold mb-4">กิจกรรม</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                ชมรมและกิจกรรมนักเรียน
              </h2>
              <p className="text-muted-foreground">
                กิจกรรมหลากหลายเพื่อพัฒนาทักษะและความสามารถของนักเรียน
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities.map((activity, index) => (
                <div
                  key={index}
                  className="bg-card rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-border"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-foreground">{activity.name}</h3>
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                      {activity.members} คน
                    </span>
                  </div>
                  <p className="text-muted-foreground">{activity.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Student Council */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block text-accent font-semibold mb-4">สภานักเรียน</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-6">
                คณะกรรมการสภานักเรียน
              </h2>
              <p className="text-primary-foreground/80 mb-8">
                ตัวแทนนักเรียนที่ได้รับเลือกตั้งเพื่อทำหน้าที่เป็นสื่อกลางระหว่างนักเรียนและโรงเรียน
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/20">
                  <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-accent-foreground">ป</span>
                  </div>
                  <h3 className="text-lg font-bold text-primary-foreground">นายประสิทธิ์ เก่งมาก</h3>
                  <p className="text-accent font-semibold">ประธานสภานักเรียน</p>
                  <p className="text-primary-foreground/70 text-sm mt-2">ม.6/1</p>
                </div>
                <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/20">
                  <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-accent-foreground">ส</span>
                  </div>
                  <h3 className="text-lg font-bold text-primary-foreground">นางสาวสุดา รักเรียน</h3>
                  <p className="text-accent font-semibold">รองประธานสภานักเรียน</p>
                  <p className="text-primary-foreground/70 text-sm mt-2">ม.6/2</p>
                </div>
                <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/20">
                  <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-accent-foreground">ว</span>
                  </div>
                  <h3 className="text-lg font-bold text-primary-foreground">นายวิชัย ใจดี</h3>
                  <p className="text-accent font-semibold">เลขานุการสภานักเรียน</p>
                  <p className="text-primary-foreground/70 text-sm mt-2">ม.5/1</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Students;
