import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BookOpen, FlaskConical, Languages, Calculator, Monitor, Palette, Music, Dumbbell, Clock, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const programs = [
  {
    icon: FlaskConical,
    title: 'วิทย์-คณิต',
    description: 'หลักสูตรเน้นวิทยาศาสตร์และคณิตศาสตร์ เตรียมความพร้อมสู่คณะแพทย์ วิศวกรรม และวิทยาศาสตร์',
    color: 'bg-blue-500',
    subjects: ['ฟิสิกส์', 'เคมี', 'ชีววิทยา', 'คณิตศาสตร์ขั้นสูง'],
    careers: ['แพทย์', 'วิศวกร', 'นักวิทยาศาสตร์', 'เภสัชกร'],
  },
  {
    icon: Languages,
    title: 'ศิลป์-ภาษา',
    description: 'เน้นทักษะภาษาอังกฤษ จีน ญี่ปุ่น และฝรั่งเศส พร้อมสู่ความเป็นสากล',
    color: 'bg-purple-500',
    subjects: ['ภาษาอังกฤษ', 'ภาษาจีน', 'ภาษาญี่ปุ่น', 'ภาษาฝรั่งเศส'],
    careers: ['นักแปล', 'มัคคุเทศก์', 'นักการทูต', 'ครูสอนภาษา'],
  },
  {
    icon: Calculator,
    title: 'ศิลป์-คำนวณ',
    description: 'รวมศาสตร์สังคมศึกษากับคณิตศาสตร์ เตรียมพร้อมสู่คณะบริหาร เศรษฐศาสตร์ และนิติศาสตร์',
    color: 'bg-green-500',
    subjects: ['สังคมศึกษา', 'เศรษฐศาสตร์', 'คณิตศาสตร์', 'การบัญชี'],
    careers: ['นักบัญชี', 'นักเศรษฐศาสตร์', 'ทนายความ', 'นักธุรกิจ'],
  },
  {
    icon: Monitor,
    title: 'คอมพิวเตอร์',
    description: 'หลักสูตรเทคโนโลยีสารสนเทศ เขียนโปรแกรม และ AI เตรียมความพร้อมสู่โลกดิจิทัล',
    color: 'bg-orange-500',
    subjects: ['การเขียนโปรแกรม', 'AI และ Machine Learning', 'Web Development', 'Cybersecurity'],
    careers: ['โปรแกรมเมอร์', 'นักวิเคราะห์ข้อมูล', 'UX Designer', 'AI Engineer'],
  },
];

const activities = [
  { icon: Palette, name: 'ชมรมศิลปะ', desc: 'วาดภาพ ปั้น และงานหัตถกรรม' },
  { icon: Music, name: 'วงดนตรี', desc: 'ดนตรีสากลและดนตรีไทย' },
  { icon: Dumbbell, name: 'กีฬา', desc: 'ฟุตบอล บาสเกตบอล ว่ายน้ำ' },
  { icon: BookOpen, name: 'ห้องสมุด', desc: 'ชมรมหนังสือและการอ่าน' },
];

const Curriculum = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-primary py-20">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-block text-accent font-semibold mb-4">หลักสูตรการศึกษา</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              หลักสูตรที่หลากหลาย
            </h1>
            <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto">
              เราออกแบบหลักสูตรที่ตอบโจทย์ความสนใจและเป้าหมายของนักเรียนทุกคน
              พร้อมทีมครูผู้เชี่ยวชาญในแต่ละสาขา
            </p>
          </div>
        </section>

        {/* Programs Detail */}
        <section className="section-padding bg-background">
          <div className="container mx-auto px-4">
            <div className="space-y-12">
              {programs.map((program, index) => (
                <div
                  key={index}
                  className="bg-card rounded-3xl p-8 md:p-10 shadow-lg border border-border overflow-hidden relative"
                >
                  <div className={`absolute top-0 right-0 w-64 h-64 ${program.color} opacity-10 rounded-full -translate-y-1/2 translate-x-1/2`} />
                  
                  <div className="relative grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                      <div className={`w-16 h-16 rounded-2xl ${program.color} flex items-center justify-center mb-6`}>
                        <program.icon className="w-8 h-8 text-card" />
                      </div>
                      <h2 className="text-3xl font-bold text-foreground mb-4">{program.title}</h2>
                      <p className="text-muted-foreground text-lg mb-6">{program.description}</p>
                      <Link to="/enrollment">
                        <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                          สมัครเรียน
                        </Button>
                      </Link>
                    </div>

                    <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
                      <div className="bg-secondary/50 rounded-2xl p-6">
                        <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                          <BookOpen className="w-5 h-5 text-primary" />
                          รายวิชาหลัก
                        </h3>
                        <ul className="space-y-2">
                          {program.subjects.map((subject, i) => (
                            <li key={i} className="text-muted-foreground flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                              {subject}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-secondary/50 rounded-2xl p-6">
                        <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                          <Award className="w-5 h-5 text-primary" />
                          อาชีพในอนาคต
                        </h3>
                        <ul className="space-y-2">
                          {program.careers.map((career, i) => (
                            <li key={i} className="text-muted-foreground flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                              {career}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Schedule Info */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {[
                { icon: Clock, value: '07:30 - 15:30', label: 'เวลาเรียน' },
                { icon: Users, value: '30-35 คน', label: 'จำนวนนักเรียนต่อห้อง' },
                { icon: Award, value: '6 ปี', label: 'ระยะเวลาหลักสูตร (ม.1-ม.6)' },
              ].map((info, index) => (
                <div key={index}>
                  <info.icon className="w-10 h-10 text-accent mx-auto mb-4" />
                  <div className="text-3xl font-bold text-primary-foreground mb-2">{info.value}</div>
                  <div className="text-primary-foreground/80">{info.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Activities */}
        <section className="section-padding bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="inline-block text-accent font-semibold mb-4">กิจกรรมเสริมหลักสูตร</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                พัฒนาทักษะรอบด้าน
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {activities.map((activity, index) => (
                <div key={index} className="bg-card rounded-2xl p-8 shadow-md border border-border text-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <activity.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{activity.name}</h3>
                  <p className="text-muted-foreground">{activity.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Curriculum;
