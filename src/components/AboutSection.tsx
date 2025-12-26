import { Target, Eye, Heart, Star } from 'lucide-react';

const features = [
  {
    icon: Target,
    title: 'วิสัยทัศน์',
    description: 'เป็นสถานศึกษาชั้นนำที่พัฒนาผู้เรียนให้มีความเป็นเลิศทางวิชาการ มีคุณธรรม และทักษะที่จำเป็นสำหรับศตวรรษที่ 21',
  },
  {
    icon: Eye,
    title: 'พันธกิจ',
    description: 'จัดการศึกษาที่มีคุณภาพ พัฒนาหลักสูตรที่ทันสมัย ส่งเสริมการเรียนรู้ตลอดชีวิต และสร้างพลเมืองที่ดีของสังคม',
  },
  {
    icon: Heart,
    title: 'ค่านิยม',
    description: 'ความซื่อสัตย์ ความรับผิดชอบ ความเคารพ ความมุ่งมั่น และความร่วมมือ เป็นหลักการที่เราปลูกฝังในทุกกิจกรรม',
  },
  {
    icon: Star,
    title: 'ความเป็นเลิศ',
    description: 'มุ่งมั่นสู่ความเป็นเลิศในทุกด้าน ทั้งวิชาการ กีฬา ศิลปะ และการพัฒนาบุคลิกภาพของผู้เรียน',
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-background">
      <div className="container-school">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-accent font-semibold mb-4">เกี่ยวกับเรา</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            สถาบันการศึกษาที่<span className="text-primary">ไว้วางใจ</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            ด้วยประสบการณ์กว่า 50 ปี ในการพัฒนาเยาวชนไทย โรงเรียนห้องสื่อครูคอมวิทยาคมมุ่งมั่นสร้างรากฐานที่แข็งแกร่ง
            เพื่ออนาคตที่สดใสของนักเรียนทุกคน
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-border"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <feature.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-primary rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '50+', label: 'ปีแห่งประสบการณ์' },
              { value: '2,500+', label: 'นักเรียนปัจจุบัน' },
              { value: '200+', label: 'บุคลากรคุณภาพ' },
              { value: '15,000+', label: 'ศิษย์เก่าทั่วประเทศ' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-accent mb-2">{stat.value}</div>
                <div className="text-primary-foreground/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
