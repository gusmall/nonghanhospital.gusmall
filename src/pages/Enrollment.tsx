import { useState } from 'react';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  User,
  Users,
  BookOpen,
  FileText,
  CheckCircle,
  GraduationCap,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const enrollmentSchema = z.object({
  // Student Info
  prefix: z.string().min(1, 'กรุณาเลือกคำนำหน้า'),
  firstName: z.string().min(2, 'กรุณากรอกชื่อ').max(50),
  lastName: z.string().min(2, 'กรุณากรอกนามสกุล').max(50),
  idCard: z.string().length(13, 'เลขบัตรประชาชนต้องมี 13 หลัก'),
  birthDate: z.string().min(1, 'กรุณาเลือกวันเกิด'),
  nationality: z.string().min(1, 'กรุณากรอกสัญชาติ'),
  religion: z.string().min(1, 'กรุณากรอกศาสนา'),
  phone: z.string().min(9, 'กรุณากรอกเบอร์โทรศัพท์').max(10),
  email: z.string().email('รูปแบบอีเมลไม่ถูกต้อง'),
  address: z.string().min(10, 'กรุณากรอกที่อยู่'),
  
  // Parent Info
  fatherName: z.string().min(2, 'กรุณากรอกชื่อบิดา').max(100),
  fatherPhone: z.string().min(9, 'กรุณากรอกเบอร์โทรศัพท์').max(10),
  fatherOccupation: z.string().min(1, 'กรุณากรอกอาชีพ'),
  motherName: z.string().min(2, 'กรุณากรอกชื่อมารดา').max(100),
  motherPhone: z.string().min(9, 'กรุณากรอกเบอร์โทรศัพท์').max(10),
  motherOccupation: z.string().min(1, 'กรุณากรอกอาชีพ'),
  
  // Academic Info
  previousSchool: z.string().min(2, 'กรุณากรอกชื่อโรงเรียนเดิม'),
  previousLevel: z.string().min(1, 'กรุณาเลือกระดับชั้นที่จบ'),
  gpa: z.string().min(1, 'กรุณากรอกเกรดเฉลี่ย'),
  enrollLevel: z.string().min(1, 'กรุณาเลือกระดับชั้นที่ต้องการสมัคร'),
  program: z.string().min(1, 'กรุณาเลือกแผนการเรียน'),
  
  // Agreements
  agreeTerms: z.boolean().refine(val => val === true, 'กรุณายอมรับข้อตกลง'),
  agreePrivacy: z.boolean().refine(val => val === true, 'กรุณายอมรับนโยบายความเป็นส่วนตัว'),
});

type EnrollmentFormData = z.infer<typeof enrollmentSchema>;

const steps = [
  { id: 1, title: 'ข้อมูลนักเรียน', icon: User },
  { id: 2, title: 'ข้อมูลผู้ปกครอง', icon: Users },
  { id: 3, title: 'ข้อมูลการศึกษา', icon: BookOpen },
  { id: 4, title: 'ตรวจสอบข้อมูล', icon: FileText },
];

const programs = [
  { value: 'sci-math', label: 'วิทยาศาสตร์-คณิตศาสตร์' },
  { value: 'arts-lang', label: 'ศิลป์-ภาษา' },
  { value: 'arts-calc', label: 'ศิลป์-คำนวณ' },
  { value: 'computer', label: 'คอมพิวเตอร์' },
];

const Enrollment = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<EnrollmentFormData>({
    resolver: zodResolver(enrollmentSchema),
    defaultValues: {
      prefix: '',
      firstName: '',
      lastName: '',
      idCard: '',
      birthDate: '',
      nationality: 'ไทย',
      religion: 'พุทธ',
      phone: '',
      email: '',
      address: '',
      fatherName: '',
      fatherPhone: '',
      fatherOccupation: '',
      motherName: '',
      motherPhone: '',
      motherOccupation: '',
      previousSchool: '',
      previousLevel: '',
      gpa: '',
      enrollLevel: '',
      program: '',
      agreeTerms: false,
      agreePrivacy: false,
    },
  });

  const nextStep = async () => {
    let fieldsToValidate: (keyof EnrollmentFormData)[] = [];
    
    if (currentStep === 1) {
      fieldsToValidate = ['prefix', 'firstName', 'lastName', 'idCard', 'birthDate', 'nationality', 'religion', 'phone', 'email', 'address'];
    } else if (currentStep === 2) {
      fieldsToValidate = ['fatherName', 'fatherPhone', 'fatherOccupation', 'motherName', 'motherPhone', 'motherOccupation'];
    } else if (currentStep === 3) {
      fieldsToValidate = ['previousSchool', 'previousLevel', 'gpa', 'enrollLevel', 'program'];
    }

    const result = await form.trigger(fieldsToValidate);
    if (result) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const onSubmit = (data: EnrollmentFormData) => {
    console.log('Form submitted:', data);
    setIsSubmitted(true);
    toast({
      title: 'สมัครเรียนสำเร็จ!',
      description: 'เราได้รับใบสมัครของคุณแล้ว จะติดต่อกลับโดยเร็ว',
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <section className="pt-32 pb-16">
          <div className="container-school">
            <Card className="max-w-2xl mx-auto text-center">
              <CardContent className="py-16">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  สมัครเรียนสำเร็จ!
                </h2>
                <p className="text-muted-foreground mb-2">
                  เราได้รับใบสมัครของคุณเรียบร้อยแล้ว
                </p>
                <p className="text-muted-foreground mb-8">
                  หมายเลขใบสมัคร: <span className="font-bold text-primary">ENR-2568-{Math.floor(Math.random() * 9000) + 1000}</span>
                </p>
                <div className="bg-secondary rounded-lg p-6 mb-8 text-left">
                  <h3 className="font-semibold mb-4">ขั้นตอนถัดไป:</h3>
                  <ol className="space-y-2 text-sm text-muted-foreground">
                    <li>1. รอการตรวจสอบเอกสารจากทางโรงเรียน (1-3 วันทำการ)</li>
                    <li>2. รับอีเมลยืนยันและนัดหมายวันสัมภาษณ์</li>
                    <li>3. เข้าสอบวัดความรู้พื้นฐาน</li>
                    <li>4. ประกาศผลการคัดเลือก</li>
                  </ol>
                </div>
                <div className="flex gap-4 justify-center">
                  <Link to="/">
                    <Button variant="outline" className="gap-2">
                      <ArrowLeft className="w-4 h-4" />
                      กลับหน้าหลัก
                    </Button>
                  </Link>
                  <Button onClick={() => window.print()}>
                    พิมพ์ใบสมัคร
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-8 bg-gradient-to-br from-primary via-primary/90 to-primary/80">
        <div className="container-school text-center">
          <Badge className="mb-4 bg-accent/20 text-accent border-0">สมัครเรียน</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-card mb-4">
            สมัครเรียนออนไลน์
          </h1>
          <p className="text-card/80 text-lg max-w-2xl mx-auto">
            ปีการศึกษา 2568 | รับสมัครนักเรียนชั้น ม.1 และ ม.4
          </p>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-8 bg-card border-b">
        <div className="container-school">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                      currentStep >= step.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-muted-foreground'
                    }`}
                  >
                    {currentStep > step.id ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <step.icon className="w-6 h-6" />
                    )}
                  </div>
                  <span className={`text-sm mt-2 hidden md:block ${
                    currentStep >= step.id ? 'text-primary font-medium' : 'text-muted-foreground'
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 md:w-24 h-1 mx-2 rounded ${
                      currentStep > step.id ? 'bg-primary' : 'bg-secondary'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Content */}
      <section className="py-12">
        <div className="container-school">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Card className="max-w-4xl mx-auto">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {currentStep === 1 && <><User className="w-5 h-5" /> ข้อมูลนักเรียน</>}
                    {currentStep === 2 && <><Users className="w-5 h-5" /> ข้อมูลผู้ปกครอง</>}
                    {currentStep === 3 && <><BookOpen className="w-5 h-5" /> ข้อมูลการศึกษา</>}
                    {currentStep === 4 && <><FileText className="w-5 h-5" /> ตรวจสอบและยืนยัน</>}
                  </CardTitle>
                  <CardDescription>
                    {currentStep === 1 && 'กรอกข้อมูลส่วนตัวของนักเรียน'}
                    {currentStep === 2 && 'กรอกข้อมูลบิดาและมารดา'}
                    {currentStep === 3 && 'กรอกข้อมูลการศึกษาและแผนการเรียนที่ต้องการ'}
                    {currentStep === 4 && 'ตรวจสอบความถูกต้องของข้อมูลก่อนส่งใบสมัคร'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Step 1: Student Info */}
                  {currentStep === 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="prefix"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>คำนำหน้า</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="เลือกคำนำหน้า" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="เด็กชาย">เด็กชาย</SelectItem>
                                <SelectItem value="เด็กหญิง">เด็กหญิง</SelectItem>
                                <SelectItem value="นาย">นาย</SelectItem>
                                <SelectItem value="นางสาว">นางสาว</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="hidden md:block" />
                      
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ชื่อ</FormLabel>
                            <FormControl>
                              <Input placeholder="กรอกชื่อ" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>นามสกุล</FormLabel>
                            <FormControl>
                              <Input placeholder="กรอกนามสกุล" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="idCard"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>เลขบัตรประชาชน</FormLabel>
                            <FormControl>
                              <Input placeholder="X-XXXX-XXXXX-XX-X" maxLength={13} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="birthDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>วันเกิด</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="nationality"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>สัญชาติ</FormLabel>
                            <FormControl>
                              <Input placeholder="สัญชาติ" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="religion"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ศาสนา</FormLabel>
                            <FormControl>
                              <Input placeholder="ศาสนา" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>เบอร์โทรศัพท์</FormLabel>
                            <FormControl>
                              <Input placeholder="0XX-XXX-XXXX" maxLength={10} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>อีเมล</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="example@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>ที่อยู่ปัจจุบัน</FormLabel>
                            <FormControl>
                              <Textarea placeholder="บ้านเลขที่ หมู่ ซอย ถนน ตำบล อำเภอ จังหวัด รหัสไปรษณีย์" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {/* Step 2: Parent Info */}
                  {currentStep === 2 && (
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                          <User className="w-5 h-5 text-primary" />
                          ข้อมูลบิดา
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <FormField
                            control={form.control}
                            name="fatherName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>ชื่อ-นามสกุล</FormLabel>
                                <FormControl>
                                  <Input placeholder="นาย..." {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="fatherPhone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>เบอร์โทรศัพท์</FormLabel>
                                <FormControl>
                                  <Input placeholder="0XX-XXX-XXXX" maxLength={10} {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="fatherOccupation"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>อาชีพ</FormLabel>
                                <FormControl>
                                  <Input placeholder="อาชีพ" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                          <User className="w-5 h-5 text-primary" />
                          ข้อมูลมารดา
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <FormField
                            control={form.control}
                            name="motherName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>ชื่อ-นามสกุล</FormLabel>
                                <FormControl>
                                  <Input placeholder="นาง/นางสาว..." {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="motherPhone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>เบอร์โทรศัพท์</FormLabel>
                                <FormControl>
                                  <Input placeholder="0XX-XXX-XXXX" maxLength={10} {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="motherOccupation"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>อาชีพ</FormLabel>
                                <FormControl>
                                  <Input placeholder="อาชีพ" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Academic Info */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="previousSchool"
                          render={({ field }) => (
                            <FormItem className="md:col-span-2">
                              <FormLabel>โรงเรียนเดิม</FormLabel>
                              <FormControl>
                                <Input placeholder="ชื่อโรงเรียน" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="previousLevel"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>ระดับชั้นที่จบ</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="เลือกระดับชั้น" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="ป.6">ประถมศึกษาปีที่ 6</SelectItem>
                                  <SelectItem value="ม.3">มัธยมศึกษาปีที่ 3</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="gpa"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>เกรดเฉลี่ยสะสม (GPA)</FormLabel>
                              <FormControl>
                                <Input placeholder="0.00" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="enrollLevel"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>ระดับชั้นที่ต้องการสมัคร</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="เลือกระดับชั้น" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="ม.1">มัธยมศึกษาปีที่ 1</SelectItem>
                                  <SelectItem value="ม.4">มัธยมศึกษาปีที่ 4</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="program"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>แผนการเรียนที่ต้องการ</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="เลือกแผนการเรียน" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {programs.map((program) => (
                                    <SelectItem key={program.value} value={program.value}>
                                      {program.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 4: Review */}
                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2">
                              <User className="w-4 h-4" />
                              ข้อมูลนักเรียน
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="text-sm space-y-2">
                            <p><span className="text-muted-foreground">ชื่อ:</span> {form.getValues('prefix')} {form.getValues('firstName')} {form.getValues('lastName')}</p>
                            <p><span className="text-muted-foreground">เลขบัตรประชาชน:</span> {form.getValues('idCard')}</p>
                            <p><span className="text-muted-foreground">วันเกิด:</span> {form.getValues('birthDate')}</p>
                            <p><span className="text-muted-foreground">โทรศัพท์:</span> {form.getValues('phone')}</p>
                            <p><span className="text-muted-foreground">อีเมล:</span> {form.getValues('email')}</p>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              ข้อมูลผู้ปกครอง
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="text-sm space-y-2">
                            <p><span className="text-muted-foreground">บิดา:</span> {form.getValues('fatherName')}</p>
                            <p><span className="text-muted-foreground">โทร:</span> {form.getValues('fatherPhone')}</p>
                            <p><span className="text-muted-foreground">มารดา:</span> {form.getValues('motherName')}</p>
                            <p><span className="text-muted-foreground">โทร:</span> {form.getValues('motherPhone')}</p>
                          </CardContent>
                        </Card>
                        
                        <Card className="md:col-span-2">
                          <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2">
                              <GraduationCap className="w-4 h-4" />
                              ข้อมูลการศึกษา
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="text-sm grid grid-cols-2 gap-4">
                            <p><span className="text-muted-foreground">โรงเรียนเดิม:</span> {form.getValues('previousSchool')}</p>
                            <p><span className="text-muted-foreground">ระดับชั้นที่จบ:</span> {form.getValues('previousLevel')}</p>
                            <p><span className="text-muted-foreground">GPA:</span> {form.getValues('gpa')}</p>
                            <p><span className="text-muted-foreground">สมัครเข้า:</span> {form.getValues('enrollLevel')}</p>
                            <p><span className="text-muted-foreground">แผนการเรียน:</span> {programs.find(p => p.value === form.getValues('program'))?.label}</p>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Agreements */}
                      <div className="space-y-4 p-4 bg-secondary rounded-lg">
                        <FormField
                          control={form.control}
                          name="agreeTerms"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  ข้าพเจ้ายืนยันว่าข้อมูลทั้งหมดเป็นความจริงทุกประการ
                                </FormLabel>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="agreePrivacy"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  ข้าพเจ้ายินยอมให้โรงเรียนเก็บและใช้ข้อมูลส่วนบุคคลเพื่อการสมัครเรียน
                                </FormLabel>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-6 border-t">
                    <div>
                      {currentStep > 1 && (
                        <Button type="button" variant="outline" onClick={prevStep} className="gap-2">
                          <ArrowLeft className="w-4 h-4" />
                          ย้อนกลับ
                        </Button>
                      )}
                      <Link to="/" className="ml-2">
                        <Button type="button" variant="ghost" className="gap-2">
                          <ArrowLeft className="w-4 h-4" />
                          กลับหน้าหลัก
                        </Button>
                      </Link>
                    </div>
                    <div>
                      {currentStep < 4 ? (
                        <Button type="button" onClick={nextStep} className="gap-2">
                          ถัดไป
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      ) : (
                        <Button type="submit" className="gap-2">
                          <Check className="w-4 h-4" />
                          ส่งใบสมัคร
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </form>
          </Form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Enrollment;
