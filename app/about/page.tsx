"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { History, Users, Target, Lightbulb } from "lucide-react"
import {collegeInfo as info} from "@/lib/data"

export default function AboutPage() {
  const [collegeInfo, setCollegeInfo] = useState<any>(info)



  if (!collegeInfo) {
    return <div className="pt-24 pb-16 container">جاري التحميل...</div>
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 dark:from-primary dark:to-blue-400">
            عن كلية التربية
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            تعرف على تاريخ وإنجازات كلية التربية ورسالتها في إعداد المعلمين المؤهلين
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-2xl overflow-hidden shadow-md"
          >
            <Image
              src="/tarbia.jpg"
              alt="كلية التربية"
              width={640}
              height={480}
              className="w-full h-auto"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col justify-center glass-card p-6 rounded-2xl"
          >
            <h2 className="text-2xl font-bold mb-4">كلمة العميد</h2>
            <p className="mb-4 text-muted-foreground line-clamp-[12]">{collegeInfo.deanMessage}</p>
            <div className="flex items-center gap-2 mt-4">
              <div className="w-16 h-16 rounded-full overflow-hidden mr-4 shadow-md">
                <Image
                  src={collegeInfo.dean.image || "/placeholder.svg"}
                  alt={collegeInfo.dean.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold">{collegeInfo.dean.name}</h4>
                <p className="text-sm text-muted-foreground">عميد الكلية</p>
              </div>
            </div>
          </motion.div>
        </div>

        <Tabs defaultValue="vision" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-4 rounded-xl bg-secondary/50 p-1">
            <TabsTrigger
              value="vision"
              className="rounded-lg flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800"
            >
              <Lightbulb className="h-4 w-4" />
              <span>الرؤية والرسالة</span>
            </TabsTrigger>
            <TabsTrigger
              value="goals"
              className="rounded-lg flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800"
            >
              <Target className="h-4 w-4" />
              <span>الأهداف الإستراتيجية</span>
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="rounded-lg flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800"
            >
              <History className="h-4 w-4" />
              <span>تاريخنا</span>
            </TabsTrigger>
            <TabsTrigger
              value="leadership"
              className="rounded-lg flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800"
            >
              <Users className="h-4 w-4" />
              <span>قيادات الكلية</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="vision" className="mt-6">
            <Card className="border-0 glass-card rounded-2xl">
              <CardHeader>
                <CardTitle>الرؤية والرسالة</CardTitle>
                <CardDescription>رؤية ورسالة كلية التربية</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-white/50 dark:bg-gray-800/50 p-6 rounded-xl shadow-sm">
                    <h3 className="text-xl font-bold mb-3">الرؤية</h3>
                    <p className="text-muted-foreground">{collegeInfo.vision}</p>
                  </div>

                  <div className="bg-white/50 dark:bg-gray-800/50 p-6 rounded-xl shadow-sm">
                    <h3 className="text-xl font-bold mb-3">الرسالة</h3>
                    <p className="text-muted-foreground">{collegeInfo.mission}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="goals" className="mt-6">
            <Card className="border-0 glass-card rounded-2xl">
              <CardHeader>
                <CardTitle>الأهداف الإستراتيجية</CardTitle>
                <CardDescription>الأهداف الإستراتيجية لكلية التربية</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {collegeInfo.strategicGoals.map((goal: string, index: number) => (
                    <div key={index} className="flex gap-4 bg-white/50 dark:bg-gray-800/50 p-4 rounded-xl shadow-sm">
                      <div className="bg-primary/10 text-primary rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-muted-foreground">{goal}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <Card className="border-0 glass-card rounded-2xl">
              <CardHeader>
                <CardTitle>تاريخ الكلية</CardTitle>
                <CardDescription>نبذة عن تاريخ تأسيس كلية التربية ومراحل تطورها</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-4 bg-white/50 dark:bg-gray-800/50 p-4 rounded-xl shadow-sm">
                    <div className="bg-primary/10 text-primary rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                      1970
                    </div>
                    <div>
                      <h3 className="font-bold">تأسيس الكلية</h3>
                      <p className="text-muted-foreground">
                        تأسست كلية التربية في فترة السبعينات من القرن الماضي كإحدى كليات الجامعة لتلبية احتياجات المجتمع
                        من المعلمين المؤهلين.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 bg-white/50 dark:bg-gray-800/50 p-4 rounded-xl shadow-sm">
                    <div className="bg-primary/10 text-primary rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                      1985
                    </div>
                    <div>
                      <h3 className="font-bold">افتتاح المبنى الجديد</h3>
                      <p className="text-muted-foreground">
                        تم افتتاح المبنى الجديد للكلية المجهز بأحدث التقنيات التعليمية والمعامل المتطورة.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 bg-white/50 dark:bg-gray-800/50 p-4 rounded-xl shadow-sm">
                    <div className="bg-primary/10 text-primary rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                      2000
                    </div>
                    <div>
                      <h3 className="font-bold">إنشاء برامج الدراسات العليا</h3>
                      <p className="text-muted-foreground">
                        تم إنشاء برامج الدراسات العليا في مختلف التخصصات التربوية لتلبية احتياجات سوق العمل.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 bg-white/50 dark:bg-gray-800/50 p-4 rounded-xl shadow-sm">
                    <div className="bg-primary/10 text-primary rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                      2015
                    </div>
                    <div>
                      <h3 className="font-bold">اعتماد الكلية</h3>
                      <p className="text-muted-foreground">
                        حصلت الكلية على الاعتماد من الهيئة القومية لضمان جودة التعليم والاعتماد.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leadership" className="mt-6">
            <Card className="border-0 glass-card rounded-2xl">
              <CardHeader>
                <CardTitle>قيادات الكلية</CardTitle>
                <CardDescription>قيادات كلية التربية الحالية</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center bg-white/50 dark:bg-gray-800/50 p-4 rounded-xl shadow-sm hover-scale">
                    <div className="mx-auto w-32 h-32 rounded-full overflow-hidden mb-4 shadow-md">
                      <Image
                        src={collegeInfo.dean.image || "/placeholder.svg"}
                        alt="عميد الكلية"
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-bold text-lg">{collegeInfo.dean.name}</h3>
                    <p className="text-primary">عميد الكلية</p>
                  </div>

                  <div className="text-center bg-white/50 dark:bg-gray-800/50 p-4 rounded-xl shadow-sm hover-scale">
                    <div className="mx-auto w-32 h-32 rounded-full overflow-hidden mb-4 shadow-md">
                      <Image
                        src="https://hr.mans.edu.eg/dpp/2740424/11/00338/00.jpg"
                        alt="وكيل الكلية لشؤون التعليم والطلاب"
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-bold text-lg">
أ.د. محمد حسن أحمد جمعه

                         </h3>
                    <p className="text-primary">وكيل الكلية لشؤون التعليم والطلاب</p>
                  </div>

                  <div className="text-center bg-white/50 dark:bg-gray-800/50 p-4 rounded-xl shadow-sm hover-scale">
                    <div className="mx-auto w-32 h-32 rounded-full overflow-hidden mb-4 shadow-md">
                      <Image
                        src="https://hr.mans.edu.eg/dpp/2680609/21/00611/00.jpg"
                        alt="وكيل الكلية للدراسات العليا والبحوث"
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-bold text-lg">أ.د. الدكتور ربيع عبد العظيم</h3>
                    <p className="text-primary">وكيل الكلية للدراسات العليا والبحوث</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
