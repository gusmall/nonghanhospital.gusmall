import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MapPin, Phone, Mail, Clock, Send, Facebook, Youtube, Instagram, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const contactInfo = [
  {
    icon: MapPin,
    title: 'ที่อยู่',
    content: '123 ถนนการศึกษา แขวงวิทยาคม เขตพัฒนา กรุงเทพฯ 10XXX',
  },
  {
    icon: Phone,
    title: 'โทรศัพท์',
    content: '02-XXX-XXXX, 02-XXX-XXXX',
  },
  {
    icon: Mail,
    title: 'อีเมล',
    content: 'info@wittayakom.ac.th',
  },
  {
    icon: Clock,
    title: 'เวลาทำการ',
    content: 'จันทร์ - ศุกร์ 07:30 - 16:30 น.',
  },
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:bg-blue-600' },
  { icon: Youtube, href: '#', label: 'Youtube', color: 'hover:bg-red-600' },
  { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:bg-pink-600' },
  { icon: MessageCircle, href: '#', label: 'Line', color: 'hover:bg-green-500' },
];

const faqItems = [
  {
    question: 'ค่าธรรมเนียมการศึกษาเท่าไหร่?',
    answer: 'ค่าธรรมเนียมการศึกษาต่อภาคเรียน ม.ต้น 15,000 บาท และ ม.ปลาย 18,000 บาท รวมค่าอุปกรณ์การเรียน',
  },
  {
    question: 'มีรถรับส่งนักเรียนหรือไม่?',
    answer: 'มีบริการรถรับส่งนักเรียน ครอบคลุมพื้นที่กรุงเทพฯ และปริมณฑล สอบถามเส้นทางได้ที่ 02-XXX-XXXX',
  },
  {
    question: 'เปิดรับสมัครนักเรียนใหม่เมื่อไหร่?',
    answer: 'เปิดรับสมัครนักเรียนใหม่ทุกปี ช่วงเดือนกุมภาพันธ์ - มีนาคม สำหรับปีการศึกษาถัดไป',
  },
];

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'ส่งข้อความสำเร็จ',
      description: 'เราได้รับข้อความของคุณแล้ว จะติดต่อกลับโดยเร็วที่สุด',
    });
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-primary py-20">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-block text-accent font-semibold mb-4">ติดต่อเรา</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              พร้อมให้บริการ
            </h1>
            <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto">
              มีคำถามหรือต้องการข้อมูลเพิ่มเติม? ติดต่อเราได้ทุกช่องทาง
            </p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-20">
              {contactInfo.map((item, index) => (
                <div key={index} className="bg-card rounded-2xl p-6 shadow-lg border border-border text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="section-padding bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-card rounded-3xl p-8 md:p-10 shadow-lg border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-8">ส่งข้อความถึงเรา</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        ชื่อ-นามสกุล *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="กรอกชื่อ-นามสกุล"
                        required
                        className="h-12"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                        เบอร์โทรศัพท์
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="0XX-XXX-XXXX"
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      อีเมล *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@email.com"
                      required
                      className="h-12"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                      เรื่อง *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="หัวข้อที่ต้องการติดต่อ"
                      required
                      className="h-12"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      ข้อความ *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="รายละเอียดที่ต้องการสอบถาม..."
                      required
                      rows={5}
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 h-14 gap-2"
                  >
                    <Send className="w-5 h-5" />
                    ส่งข้อความ
                  </Button>
                </form>
              </div>

              {/* Map and Social */}
              <div className="space-y-8">
                {/* Map */}
                <div className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border h-80">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.5089977891457!2d100.49877507498095!3d13.756330986608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDQ1JzIyLjgiTiAxMDDCsDMwJzAzLjIiRQ!5e0!3m2!1sth!2sth!4v1234567890123!5m2!1sth!2sth"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="แผนที่โรงเรียนห้องสื่อครูคอมวิทยาคม"
                  />
                </div>

                {/* Social Links */}
                <div className="bg-primary rounded-2xl p-8">
                  <h3 className="text-xl font-bold text-primary-foreground mb-6">ติดตามเราผ่านโซเชียลมีเดีย</h3>
                  <div className="flex gap-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        aria-label={social.label}
                        className={`w-14 h-14 rounded-xl bg-primary-foreground/10 flex items-center justify-center text-primary-foreground ${social.color} transition-colors`}
                      >
                        <social.icon className="w-6 h-6" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* FAQ */}
                <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
                  <h3 className="text-xl font-bold text-foreground mb-6">คำถามที่พบบ่อย</h3>
                  <div className="space-y-4">
                    {faqItems.map((faq, index) => (
                      <div key={index} className="border-b border-border pb-4 last:border-0 last:pb-0">
                        <h4 className="font-semibold text-foreground mb-2">{faq.question}</h4>
                        <p className="text-muted-foreground text-sm">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
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

export default Contact;
