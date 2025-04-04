"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserCircle2, GraduationCap, BookOpen, Facebook } from "lucide-react";

// تصحيح بيانات الفريق
const professors = [
  {
    id: 1,
    name: "م. مي حافظ ",
    title: "معيد",
    specialty: "معيد تكنولوجيا التعليم",
    imagePath: "/مي.jpg",
    email: "mayhafez@du.edu.eg",
    facebook: "https://www.facebook.com/share/18U65Gtatq/",
    linkedIn: "https://www.linkedin.com/in/may-hafez-4b0a1b1a3/",
  },
  {
    id: 2,
    name: "أ.د يسري عطيه ",
    title: "استاذ دكتور",
    specialty: "أستاذ تكنولوجيا التعليم",
    imagePath: "/يسري.jpg",
    email: "dr.yousri@du.edu.eg",
    facebook: "https://www.facebook.com/share/1CBZayXUDv/",
    linkedIn: "https://www.linkedin.com/in/may-hafez-4b0a1b1a3/",
  },
];

const students = [
  {
    id: 1,
    name: "زينب أشرف طلبة",
    specialty: "تكنولوجيا المعلومات",
    year: "السنة الرابعة",
    imagePath: "/us/زينب-أشرف.jpg",
  },
  {
    id: 2,
    name: "شهد رضا الجعيدي",
    specialty: "تكنولوجيا المعلومات",
    year: "السنة الرابعة",
    imagePath: "/us/شهد-رضا.jpg",
  },
  {
    id: 3,
    name: `چيهانً
 حاكم شريف`,
    specialty: "تكنولوجيا المعلومات",
    year: "السنة الرابعة",
    imagePath: "/us/جيهان-حاكم.jpg",
  },
  {
    id: 4,
    name: "ايمان سرور البنا",
    specialty: "تكنولوجيا المعلومات",
    year: "السنة الرابعة",
    imagePath: "/us/ايمان.jpg",
  },
  {
    id: 5,
    name: "مروه أحمد المنشاوي",
    specialty: "تكنولوجيا المعلومات",
    year: "السنة الرابعة",
    imagePath: "/us/مروه-المنشاوي.jpg",
  },
  {
    id: 6,
    name: "سارة مصطفى النجار",
    specialty: "تكنولوجيا المعلومات",
    year: "السنة الرابعة",
    imagePath: "/us/ساره-النجار.png",
  },
  {
    id: 7,
    name: "سالي مصطفي عبدالغني",
    specialty: "تكنولوجيا المعلومات",
    year: "السنة الرابعة",
    imagePath: "/us/سالي-مصطفي.jpg",
  },
  {
    id: 8,
    name: "شروق حسن طه",
    specialty: "تكنولوجيا المعلومات",
    year: "السنة الرابعة",
    imagePath: "/us/شروق.png",
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.2 },
  },
  hover: {
    y: -10,
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
};

export default function TeamSection() {
  const [activeTab, setActiveTab] = useState("professors");
  const [imageLoadError, setImageLoadError] = useState<Record<string, boolean>>(
    {}
  );
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  const handleImageError = (id: string) => {
    setImageLoadError((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  // تحديد ألوان البطاقات بناءً على الفهرس
  const getCardColor = (index: number) => {
    const colors = [
      "bg-gradient-to-br from-blue-500 to-blue-800",
      "bg-gradient-to-br from-purple-600 to-purple-800",
      "bg-gradient-to-br from-emerald-600 to-emerald-800",
      "bg-gradient-to-br from-amber-600 to-amber-800",
      "bg-gradient-to-br from-rose-500 to-rose-800",
      "bg-gradient-to-br from-cyan-500 to-cyan-800",
      "bg-gradient-to-br from-pink-500 to-pink-800",
      "bg-gradient-to-br from-indigo-500 to-indigo-800",
    ];
    return colors[index % colors.length];
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 md:px-6 bg-gradient-to-b from-background via-background to-muted/20 dark:from-background dark:via-background/95 dark:to-background/90 relative overflow-hidden"
    >
      {/* عناصر الخلفية الزخرفية */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 0.4 : 0 }}
          transition={{ duration: 1 }}
          className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 0.4 : 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* عنوان القسم */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <div className="inline-block">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: isInView ? "100%" : 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 mb-4"
            />
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              فريق العمل
            </h2>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: isInView ? "100%" : 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 bg-gradient-to-r from-purple-500 to-blue-500 mt-4"
            />
          </div>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
            نخبة من الأساتذة والطلاب المتميزين في مجال تكنولوجيا المعلومات
          </p>
        </motion.div>

        {/* تبويبات الفريق */}
        <Tabs
          defaultValue="professors"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <div className="flex justify-center mb-16">
            <TabsList className="grid grid-cols-2 w-full max-w-md rounded-full p-1.5 bg-card/80 backdrop-blur-sm border border-muted shadow-xl">
              <TabsTrigger
                value="professors"
                className="rounded-full text-lg py-3 px-6 font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  <span>الأساتذة</span>
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="students"
                className="rounded-full text-lg py-3 px-6 font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  <span>الطلاب</span>
                </span>
              </TabsTrigger>
            </TabsList>
          </div>

          <AnimatePresence mode="wait">
            {/* قسم الأساتذة */}
            <TabsContent key={`tab-${activeTab}`} value="professors">
              <motion.div
                key="professors-container"
                variants={staggerContainer}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                exit="exit"
                className="grid grid-cols-1 md:grid-cols-2 gap-10 mx-auto max-w-5xl"
              >
                {professors.map((professor, index) => (
                  <motion.div
                    key={professor.id}
                    variants={cardVariant}
                    whileHover="hover"
                    className="h-full"
                  >
                    <Card className="overflow-hidden h-full rounded-3xl border-0 shadow-lg">
                      <div className="flex flex-col md:flex-row h-full">
                        <div
                          className={`${getCardColor(index)} p-6 md:w-2/5 flex items-center justify-center`}
                        >
                          <div className="relative w-40 h-40 md:w-full md:h-64 overflow-hidden rounded-2xl border-4 border-white/20 shadow-lg">
                            {!imageLoadError[`prof-${professor.id}`] ? (
                              <Image
                                src={professor.imagePath || "/placeholder.svg"}
                                alt={professor.name}
                                fill
                                className="object-cover"
                                onError={() =>
                                  handleImageError(`prof-${professor.id}`)
                                }
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-white/10">
                                <UserCircle2 className="h-24 w-24 text-white" />
                              </div>
                            )}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"
                              initial={{ opacity: 0 }}
                              whileHover={{ opacity: 1 }}
                            />
                          </div>
                        </div>
                        <div className="p-6 md:p-8 md:w-3/5 flex flex-col justify-center bg-card dark:bg-card/90">
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                          >
                            <h3 className="text-2xl font-bold mb-2 text-foreground">
                              {professor.name}
                            </h3>
                            <p className="text-primary font-medium mb-4">
                              {professor.title}
                            </p>
                            <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 mb-4 rounded-full" />
                            <p className="text-muted-foreground">
                              {professor.specialty}
                            </p>

                            <div className="mt-6 flex gap-3">
                              {professor.linkedIn && (
                                <motion.a
                                  href={professor.linkedIn}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                    <rect
                                      width="4"
                                      height="12"
                                      x="2"
                                      y="9"
                                    ></rect>
                                    <circle cx="4" cy="4" r="2"></circle>
                                  </svg>
                                </motion.a>
                              )}

                              {professor.facebook && (
                                <motion.a
                                  href={professor.facebook}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                                >
                                  <Facebook className="w-5 h-5" />

                                </motion.a>
                              )}

                              {professor.email && (
                                <motion.a
                                  href={`mailto:${professor.email}`}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <rect
                                      width="20"
                                      height="16"
                                      x="2"
                                      y="4"
                                      rx="2"
                                    ></rect>
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                  </svg>
                                </motion.a>
                              )}
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            {/* قسم الطلاب */}
            <TabsContent key={`tab-${activeTab}-students`} value="students">
              <motion.div
                key="students-container"
                variants={staggerContainer}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                exit="exit"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto"
              >
                {students.map((student, index) => (
                  <motion.div
                    key={student.id}
                    variants={cardVariant}
                    whileHover="hover"
                    className="h-full"
                  >
                    <Card className="overflow-hidden h-full rounded-2xl border-0 shadow-lg">
                      <div className={`${getCardColor(index)} p-4 pt-8`}>
                        <div className="relative w-28 h-28 mx-auto overflow-hidden rounded-full border-4 border-white/20 shadow-lg">
                          {!imageLoadError[`student-${student.id}`] ? (
                            <Image
                              src={student.imagePath || "/placeholder.svg"}
                              alt={student.name}
                              fill
                              className="object-cover"
                              onError={() =>
                                handleImageError(`student-${student.id}`)
                              }
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-white/10">
                              <UserCircle2 className="h-16 w-16 text-white" />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="p-5 text-center bg-card dark:bg-card/90">
                        <h3 className="text-xl font-bold mb-1 text-foreground">
                          {student.name}
                        </h3>
                        <p className="text-primary text-sm font-medium">
                          {student.year}
                        </p>
                        <div className="h-0.5 w-12 bg-gradient-to-r from-blue-500 to-purple-500 my-3 mx-auto rounded-full" />
                        <p className="text-muted-foreground text-sm">
                          {student.specialty}
                        </p>

                        <div className="mt-4 flex justify-center gap-3">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                              <rect width="4" height="12" x="2" y="9"></rect>
                              <circle cx="4" cy="4" r="2"></circle>
                            </svg>
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                            </svg>
                          </motion.button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </div>
    </section>
  );
}
