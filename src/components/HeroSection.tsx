import { ChevronRight, Play, Users, Award, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-school.jpg';

const stats = [
  { icon: Users, value: '2,500+', label: 'นักเรียน' },
  { icon: Award, value: '98%', label: 'ผ่านเข้ามหาวิทยาลัย' },
  { icon: BookOpen, value: '50+', label: 'ปีแห่งความเป็นเลิศ' },
];

const HeroSection = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="โรงเรียนห้องสื่อครูคอมวิทยาคม"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/95 via-navy/80 to-navy/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-school py-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-full px-4 py-2 mb-6 animate-fade-in">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-accent text-sm font-medium">เปิดรับสมัครนักเรียนใหม่ ปีการศึกษา 2568</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-card leading-tight mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            ก้าวสู่อนาคต
            <br />
            <span className="text-accent">ด้วยปัญญา</span>
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-card/80 mb-8 max-w-xl animate-slide-up" style={{ animationDelay: '0.2s' }}>
            โรงเรียนห้องสื่อครูคอมวิทยาคม สถาบันการศึกษาชั้นนำระดับมัธยมศึกษา มุ่งมั่นพัฒนาผู้เรียนให้มีความเป็นเลิศทางวิชาการ 
            มีคุณธรรม จริยธรรม และทักษะชีวิตที่พร้อมสำหรับโลกอนาคต
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-12 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Button
              onClick={() => scrollToSection('#contact')}
              size="lg"
              className="bg-accent text-accent-foreground font-semibold hover:bg-accent/90 gap-2 h-14 px-8"
            >
              สมัครเรียน
              <ChevronRight className="w-5 h-5" />
            </Button>
            <Button
              onClick={() => scrollToSection('#about')}
              size="lg"
              variant="heroOutline"
              className="gap-2 h-14 px-8"
            >
              <Play className="w-5 h-5" />
              เรียนรู้เพิ่มเติม
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-lg animate-fade-in" style={{ animationDelay: '0.5s' }}>
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="w-6 h-6 text-accent mx-auto mb-2" />
                <div className="text-2xl sm:text-3xl font-bold text-card">{stat.value}</div>
                <div className="text-sm text-card/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-8 h-12 border-2 border-card/30 rounded-full flex items-start justify-center pt-2">
          <div className="w-1.5 h-3 bg-card/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
