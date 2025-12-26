import { BookOpen, FlaskConical, Languages, Calculator, Palette, Music, Monitor, Dumbbell } from 'lucide-react';
import { Button } from '@/components/ui/button';

const programs = [
  {
    icon: FlaskConical,
    title: 'วิทย์-คณิต',
    description: 'หลักสูตรเน้นวิทยาศาสตร์และคณิตศาสตร์ เตรียมความพร้อมสู่คณะแพทย์ วิศวกรรม และวิทยาศาสตร์',
    color: 'bg-blue-500',
  },
  {
    icon: Languages,
    title: 'ศิลป์-ภาษา',
    description: 'เน้นทักษะภาษาอังกฤษ จีน ญี่ปุ่น และฝรั่งเศส พร้อมสู่ความเป็นสากล',
    color: 'bg-purple-500',
  },
  {
    icon: Calculator,
    title: 'ศิลป์-คำนวณ',
    description: 'รวมศาสตร์สังคมศึกษากับคณิตศาสตร์ เตรียมพร้อมสู่คณะบริหาร เศรษฐศาสตร์ และนิติศาสตร์',
    color: 'bg-green-500',
  },
  {
    icon: Monitor,
    title: 'คอมพิวเตอร์',
    description: 'หลักสูตรเทคโนโลยีสารสนเทศ เขียนโปรแกรม และ AI เตรียมความพร้อมสู่โลกดิจิทัล',
    color: 'bg-orange-500',
  },
];

const activities = [
  { icon: Palette, name: 'ชมรมศิลปะ' },
  { icon: Music, name: 'วงดนตรี' },
  { icon: Dumbbell, name: 'กีฬา' },
  { icon: BookOpen, name: 'ห้องสมุด' },
];

const CurriculumSection = () => {
  return (
    <section id="curriculum" className="section-padding bg-secondary/30">
      <div className="container-school">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-accent font-semibold mb-4">หลักสูตรการศึกษา</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            <span className="text-primary">หลักสูตร</span>ที่หลากหลาย
          </h2>
          <p className="text-muted-foreground text-lg">
            เราออกแบบหลักสูตรที่ตอบโจทย์ความสนใจและเป้าหมายของนักเรียนทุกคน
            พร้อมทีมครูผู้เชี่ยวชาญในแต่ละสาขา
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {programs.map((program, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-border overflow-hidden relative"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 ${program.color} opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500`} />
              <div className="relative">
                <div className={`w-14 h-14 rounded-xl ${program.color} flex items-center justify-center mb-6`}>
                  <program.icon className="w-7 h-7 text-card" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">{program.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">{program.description}</p>
                <Button variant="ghost" className="text-primary hover:text-primary hover:bg-primary/10 p-0 h-auto font-semibold">
                  ดูรายละเอียด →
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Activities */}
        <div className="bg-card rounded-3xl p-8 md:p-12 shadow-lg border border-border">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">กิจกรรมเสริมหลักสูตร</h3>
              <p className="text-muted-foreground">พัฒนาทักษะรอบด้านนอกเหนือจากวิชาการ</p>
            </div>
            <div className="flex flex-wrap gap-4">
              {activities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-secondary rounded-full px-5 py-3 hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer group"
                >
                  <activity.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                  <span className="font-medium">{activity.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurriculumSection;
