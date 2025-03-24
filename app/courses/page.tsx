"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Book, GraduationCap } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from "next/image"
import coursesData from "@/lib/courses-data.json"

// Define types for our course data structure
type Course = {
  id: string
  title: string
  description: string
}

type CoursesData = {
  [key: string]: {
    [key: string]: Course[]
  }
}

// Type assertion for our data
const typedCoursesData = coursesData as CoursesData

export default function CoursesPage() {
  const [activeLevel, setActiveLevel] = useState<string>("level1")
  const [activeSemester, setActiveSemester] = useState<string>("semester1")
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

  const levels = [
    { id: "level4", name: "المستوى الرابع" },
    { id: "level3", name: "المستوى الثالث" },
    { id: "level2", name: "المستوى الثاني" },
    { id: "level1", name: "المستوى الأول" },
  ]

  const semesters = [
    { id: "semester2", name: "الفصل الدراسي الثاني" },
    { id: "semester1", name: "الفصل الدراسي الأول" },
  ]

  // Function to get course image path
  const getCourseImage = (courseId: string): string => {
    const imageMap: Record<string, string> = {
      "educational-tv-programs-design-and-production": "/تصميم-وانتاج-برامج-التليفزيون.jpg",
      "augmented-reality-technology": "/تكنولوجيا-الواقع-المعزز.jpg",
      "educational-games-design-and-production": "/تصميم-وانتاج-الالعاب-التعليمية.jpg",
      "educational-websites-design-and-production": "/تصميم-وانتاج-المواقع-التعليمية.jpg",
      "e-book-design": "/تصميم-كتاب-الكتروني.jpg",
      "simulation-methods-and-design": "/اساليب-المحاكاه.jpg",
      "digital-images-production-and-processing": "/الصور-الرقمية.jpg",
      "adaptive-learning-environments": "/بيئات-التعليم-التكيفيه.jpg",
      "digital-applications-in-education": "/توظيف-التطبيقات-الرقمية-في-التعليم.jpg",
      "graduation-project-extended": "/مشروع-التخرج.jpg",
      "action-research-extended": "/بحوث-الفعل.jpg",
      "cybersecurity-in-education": "/الامن-السيبراني.jpg",
      "field-training-4": "/تدريب-ميداني.jpg",
      "field-training-5": "/تدريب-ميداني.jpg",
      "digital-empowerment": "/مصادر-ثلاثيه-الابعاد.jpg",
      "3d-learning-resources": "/مصادر-ثلاثيه-الابعاد.jpg",
      "programming-and-applications": "/البرمجة-وتطبيقاتها.jpg",
      "learning-analytics-in-educational-environments": "/تحليلات-التعلم.jpg",
      "e-courses-design-and-production": "/تصميم-المقررات-وانتاجها.jpg",
      "educational-robotics": "/الروبوتات.jpg",
      "digital-content-management-systems": "/نظم-ادارة-المحتوي-الرقمي.jpg",
      "educational-game-motivators": "/محفزات-الالعاب.jpg",
      "theoretical-foundations-for-special-groups": "/الاسس-النظرية-لتعليم-ذوي-الفئات-الخاصة.jpg",
      "digital-learning-resource-centers": "/مركز-مصادر-التعلم-الرقمي.jpg",
      photography: "/التصوير-الفوتوغرافي.jpg",
      "introduction-to-instructional-design": "/مدخل-الي-التصميم-التعليمي.jpg",
      "theoretical-foundations-of-integrated-media": "/الاسس-النظرية-للوسائط-المتكاملة.jpg",
      "radio-and-audio-recordings": "/الاذاعة-والتسجيلات-الصوتية.jpg",
      "e-learning": "/التعليم-الالكتروني.jpg",
      "digital-educational-communication": "/الاتصال-التعليمي-الرقمي.jpg",
      "educational-computer-networks": "/شبكات-الكمبيوتر-التعليمية.jpg",
      "e-learning-environments": "/بيئات-التعلم-الالكتروني.jpg",
      "static-and-animated-educational-graphics": "/الرسوم-التعليمية-المتحركة-والثابته.jpg",
      "readings-in-english": "/قراءات-في-التخصص-باللغه-الانحليزية.jpg",
      "multimedia-environments-for-special-groups": "/تصميم-وانتاج-بيئات-الوسائط-المتكاملة-للفئات-الخاصه.jpg",
      "accelerated-learning-and-smart-surfaces": "/التعليم-المعجل.jpg",
      "user-interfaces-in-virtual-learning-environments": "/وجهات-المستخدم.jpg",
      "interactive-video-environments": "/بيئات-الفيديو-التفاعلي.jpg",
      "educational-virtual-museums": "/المتاحف-الافتراضية.jpg",
      "educational-websites-production": "/انتاج-المواقع-التعليمية.jpg",
      "digital-learning-environments-and-tools": "/بيئات-التعلم-الرقمي-وادواتها.jpg",
      "interactive-virtual-technology": "/التكنولوجيا-الافتراضية-التفاعلية.jpg",
      "learning-resources-for-special-groups": "/مصادر-التعلم-للفئات-الخاصة.png",
    }

    // Return the mapped image or a default image if not found
    return imageMap[courseId] || "/placeholder.svg?height=200&width=200"
  }

  // Get courses for the active level and semester with proper type checking
  const currentCourses = typedCoursesData[activeLevel]?.[activeSemester] || []

  return (
    <div className="pt-24 pb-16">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-5xl font-bold py-2 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 dark:from-primary dark:to-blue-400">
            توصيف المقررات الدراسية
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            تعرف على المقررات الدراسية المتاحة في البرنامج ومحتوياتها وأهدافها التعليمية
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Level Tabs */}
          <Tabs value={activeLevel} onValueChange={setActiveLevel} className="mb-8">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8 rounded-xl bg-secondary/50 p-1">
              {levels.map((level) => (
                <TabsTrigger
                  key={level.id}
                  value={level.id}
                  className="rounded-lg flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800"
                >
                  <GraduationCap className="h-5 w-5" />
                  <span>{level.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Semester Tabs - Now as a separate Tabs component */}
            <Tabs value={activeSemester} onValueChange={setActiveSemester} className="mb-8">
              <TabsList className="grid w-full grid-cols-2 rounded-xl bg-secondary/50 p-1">
                {semesters.map((semester) => (
                  <TabsTrigger key={semester.id} value={semester.id} className="rounded-lg flex items-center gap-2">
                    <Book className="h-5 w-5" />
                    <span>{semester.name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {currentCourses.map((course: Course, index: number) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  onClick={() => setSelectedCourse(course)}
                  className="glass-card rounded-xl overflow-hidden cursor-pointer hover-scale shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="relative w-full aspect-video">
                    <Image
                      src={getCourseImage(course.id) || "/placeholder.svg"}
                      alt={course.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-2 right-2 left-2">
                      <h3 className="font-bold text-sm md:text-base text-white line-clamp-2">{course.title}</h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Tabs>
        </div>
      </div>

      {/* Course Details Dialog */}
      <Dialog open={!!selectedCourse} onOpenChange={(open) => !open && setSelectedCourse(null)}>
        <DialogContent className="max-w-2xl rounded-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-md p-0 overflow-hidden">
          {selectedCourse && (
            <>
              <div className="relative h-48 md:h-64 w-full">
                <Image
                  src={getCourseImage(selectedCourse.id) || "/placeholder.svg"}
                  alt={selectedCourse.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 right-4 left-4">
                  <h2 className="text-2xl font-bold text-white">{selectedCourse.title}</h2>
                </div>
                <DialogClose className="absolute top-4 left-4 bg-black/20 hover:bg-black/40 rounded-full p-2 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-x"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </DialogClose>
              </div>
              <div className="p-6">
                <ScrollArea className="h-[40vh] mt-4">
                  <div className="prose dark:prose-invert max-w-none">
                    <h3 className="text-lg font-medium mb-2">وصف المقرر</h3>
                    <p className="text-muted-foreground whitespace-pre-line">{selectedCourse.description}</p>

                    <h3 className="text-lg font-medium mt-6 mb-2">أهداف المقرر</h3>
                    <ul className="space-y-2">
                      <li>فهم المفاهيم الأساسية في المجال</li>
                      <li>تطوير المهارات العملية والتطبيقية</li>
                      <li>القدرة على تحليل وتقييم الحالات العملية</li>
                      <li>تنمية مهارات التفكير النقدي والإبداعي</li>
                    </ul>

                    <h3 className="text-lg font-medium mt-6 mb-2">محتوى المقرر</h3>
                    <ul className="space-y-2">
                      <li>المفاهيم الأساسية والنظريات</li>
                      <li>التطبيقات العملية والتدريبات</li>
                      <li>دراسات الحالة والمشروعات</li>
                      <li>التقييم والاختبارات</li>
                    </ul>
                  </div>
                </ScrollArea>

                <div className="flex justify-end mt-6">
                  <DialogClose asChild>
                    <Button className="rounded-xl">إغلاق</Button>
                  </DialogClose>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

