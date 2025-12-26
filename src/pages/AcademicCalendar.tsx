import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Calendar, Clock, MapPin, BookOpen, GraduationCap, Trophy, Users } from 'lucide-react';

const semesters = [
  { id: '1', label: 'ภาคเรียนที่ 1' },
  { id: '2', label: 'ภาคเรียนที่ 2' },
];

const eventTypes = {
  academic: { label: 'วิชาการ', color: 'bg-blue-500', icon: BookOpen },
  ceremony: { label: 'พิธีการ', color: 'bg-purple-500', icon: GraduationCap },
  activity: { label: 'กิจกรรม', color: 'bg-green-500', icon: Users },
  exam: { label: 'สอบ', color: 'bg-red-500', icon: Clock },
  competition: { label: 'การแข่งขัน', color: 'bg-orange-500', icon: Trophy },
};

const calendarEvents = {
  '1': [
    {
      id: 1,
      title: 'เปิดภาคเรียนที่ 1',
      date: '16 พฤษภาคม 2568',
      time: '08:00 น.',
      location: 'โรงเรียนห้องสื่อครูคอมวิทยาคม',
      type: 'academic',
      description: 'วันเปิดภาคเรียนปีการศึกษา 2568',
    },
    {
      id: 2,
      title: 'ปฐมนิเทศนักเรียนใหม่',
      date: '17-18 พฤษภาคม 2568',
      time: '08:00 - 16:00 น.',
      location: 'หอประชุมโรงเรียน',
      type: 'ceremony',
      description: 'การปฐมนิเทศสำหรับนักเรียนชั้น ม.1 และ ม.4 ใหม่',
    },
    {
      id: 3,
      title: 'พิธีไหว้ครู',
      date: '13 มิถุนายน 2568',
      time: '09:00 น.',
      location: 'หอประชุมโรงเรียน',
      type: 'ceremony',
      description: 'พิธีไหว้ครูประจำปีการศึกษา 2568',
    },
    {
      id: 4,
      title: 'สอบกลางภาค 1/2568',
      date: '22-26 กรกฎาคม 2568',
      time: '08:30 - 15:30 น.',
      location: 'ห้องเรียนประจำ',
      type: 'exam',
      description: 'การสอบวัดผลกลางภาคเรียนที่ 1',
    },
    {
      id: 5,
      title: 'วันแม่แห่งชาติ',
      date: '9 สิงหาคม 2568',
      time: '08:00 น.',
      location: 'หอประชุมโรงเรียน',
      type: 'ceremony',
      description: 'กิจกรรมวันแม่แห่งชาติ',
    },
    {
      id: 6,
      title: 'กีฬาสีภายใน',
      date: '25-27 สิงหาคม 2568',
      time: '08:00 - 17:00 น.',
      location: 'สนามกีฬาโรงเรียน',
      type: 'activity',
      description: 'การแข่งขันกีฬาสีประจำปี',
    },
    {
      id: 7,
      title: 'สอบปลายภาค 1/2568',
      date: '23-27 กันยายน 2568',
      time: '08:30 - 15:30 น.',
      location: 'ห้องเรียนประจำ',
      type: 'exam',
      description: 'การสอบวัดผลปลายภาคเรียนที่ 1',
    },
    {
      id: 8,
      title: 'ปิดภาคเรียนที่ 1',
      date: '1 ตุลาคม 2568',
      time: '-',
      location: '-',
      type: 'academic',
      description: 'วันปิดภาคเรียนที่ 1/2568',
    },
  ],
  '2': [
    {
      id: 9,
      title: 'เปิดภาคเรียนที่ 2',
      date: '1 พฤศจิกายน 2568',
      time: '08:00 น.',
      location: 'โรงเรียนห้องสื่อครูคอมวิทยาคม',
      type: 'academic',
      description: 'วันเปิดภาคเรียนที่ 2/2568',
    },
    {
      id: 10,
      title: 'วันลอยกระทง',
      date: '15 พฤศจิกายน 2568',
      time: '17:00 น.',
      location: 'สวนโรงเรียน',
      type: 'activity',
      description: 'กิจกรรมวันลอยกระทง',
    },
    {
      id: 11,
      title: 'วันพ่อแห่งชาติ',
      date: '4 ธันวาคม 2568',
      time: '08:00 น.',
      location: 'หอประชุมโรงเรียน',
      type: 'ceremony',
      description: 'กิจกรรมวันพ่อแห่งชาติ',
    },
    {
      id: 12,
      title: 'การแข่งขันวิชาการระดับเขต',
      date: '10-12 ธันวาคม 2568',
      time: '08:00 - 17:00 น.',
      location: 'โรงเรียนประจำเขต',
      type: 'competition',
      description: 'การแข่งขันทักษะวิชาการระดับเขตพื้นที่การศึกษา',
    },
    {
      id: 13,
      title: 'สอบกลางภาค 2/2568',
      date: '20-24 มกราคม 2569',
      time: '08:30 - 15:30 น.',
      location: 'ห้องเรียนประจำ',
      type: 'exam',
      description: 'การสอบวัดผลกลางภาคเรียนที่ 2',
    },
    {
      id: 14,
      title: 'ค่ายวิชาการ',
      date: '7-9 กุมภาพันธ์ 2569',
      time: 'ค้างคืน',
      location: 'อุทยานการเรียนรู้',
      type: 'activity',
      description: 'กิจกรรมค่ายพัฒนาทักษะวิชาการ',
    },
    {
      id: 15,
      title: 'สอบปลายภาค 2/2568',
      date: '10-14 มีนาคม 2569',
      time: '08:30 - 15:30 น.',
      location: 'ห้องเรียนประจำ',
      type: 'exam',
      description: 'การสอบวัดผลปลายภาคเรียนที่ 2',
    },
    {
      id: 16,
      title: 'พิธีมอบประกาศนียบัตร',
      date: '25 มีนาคม 2569',
      time: '09:00 น.',
      location: 'หอประชุมโรงเรียน',
      type: 'ceremony',
      description: 'พิธีมอบประกาศนียบัตรสำหรับนักเรียนชั้น ม.3 และ ม.6',
    },
    {
      id: 17,
      title: 'ปิดภาคเรียนที่ 2',
      date: '31 มีนาคม 2569',
      time: '-',
      location: '-',
      type: 'academic',
      description: 'วันปิดภาคเรียนปีการศึกษา 2568',
    },
  ],
};

const AcademicCalendar = () => {
  const [activeSemester, setActiveSemester] = useState('1');
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const events = calendarEvents[activeSemester as keyof typeof calendarEvents];
  const filteredEvents = selectedType
    ? events.filter(e => e.type === selectedType)
    : events;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary via-primary/90 to-primary/80">
        <div className="container-school text-center">
          <Badge className="mb-4 bg-accent/20 text-accent border-0">ปฏิทินการศึกษา</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-card mb-4">
            ปฏิทินการศึกษา 2568
          </h1>
          <p className="text-card/80 text-lg max-w-2xl mx-auto">
            กำหนดการสำคัญตลอดปีการศึกษาของโรงเรียนห้องสื่อครูคอมวิทยาคม
          </p>
        </div>
      </section>

      {/* Calendar Content */}
      <section className="py-16">
        <div className="container-school">
          {/* Event Type Legend */}
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            <Button
              variant={selectedType === null ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedType(null)}
              className="rounded-full"
            >
              ทั้งหมด
            </Button>
            {Object.entries(eventTypes).map(([key, value]) => (
              <Button
                key={key}
                variant={selectedType === key ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedType(key)}
                className="rounded-full gap-2"
              >
                <div className={`w-3 h-3 rounded-full ${value.color}`} />
                {value.label}
              </Button>
            ))}
          </div>

          {/* Semester Tabs */}
          <Tabs value={activeSemester} onValueChange={setActiveSemester} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              {semesters.map((sem) => (
                <TabsTrigger key={sem.id} value={sem.id} className="text-base">
                  {sem.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {semesters.map((sem) => (
              <TabsContent key={sem.id} value={sem.id}>
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

                  {/* Events */}
                  <div className="space-y-6">
                    {filteredEvents.map((event, index) => {
                      const eventType = eventTypes[event.type as keyof typeof eventTypes];
                      const Icon = eventType.icon;
                      
                      return (
                        <div key={event.id} className="relative flex gap-6">
                          {/* Timeline Dot */}
                          <div className="hidden md:flex flex-shrink-0 w-16 items-start justify-center pt-6">
                            <div className={`w-4 h-4 rounded-full ${eventType.color} ring-4 ring-background`} />
                          </div>

                          {/* Event Card */}
                          <Card className="flex-1 hover:shadow-lg transition-shadow">
                            <CardContent className="p-6">
                              <div className="flex flex-col md:flex-row md:items-start gap-4">
                                <div className={`w-12 h-12 rounded-xl ${eventType.color} flex items-center justify-center flex-shrink-0`}>
                                  <Icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex flex-wrap items-center gap-2 mb-2">
                                    <Badge variant="secondary" className="text-xs">
                                      {eventType.label}
                                    </Badge>
                                    <span className="text-sm text-muted-foreground">
                                      {event.date}
                                    </span>
                                  </div>
                                  <h3 className="text-lg font-bold text-foreground mb-2">
                                    {event.title}
                                  </h3>
                                  <p className="text-muted-foreground mb-4">
                                    {event.description}
                                  </p>
                                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                    {event.time !== '-' && (
                                      <span className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        {event.time}
                                      </span>
                                    )}
                                    {event.location !== '-' && (
                                      <span className="flex items-center gap-1">
                                        <MapPin className="w-4 h-4" />
                                        {event.location}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {/* Download Calendar */}
          <div className="text-center mt-12 space-y-4">
            <Button variant="outline" className="gap-2">
              <Calendar className="w-4 h-4" />
              ดาวน์โหลดปฏิทินการศึกษา (PDF)
            </Button>
            <div>
              <Link to="/">
                <Button variant="ghost" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  กลับหน้าหลัก
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AcademicCalendar;
