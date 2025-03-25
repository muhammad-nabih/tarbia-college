"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Play,
  ChevronRight,
  ArrowRight,
  Search,
  Mail,
  Phone,
  GraduationCap,
  ExternalLink,
  X,
  FileText,
  Book,
  Filter,
  School,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog"
import VideoPlayer from "@/components/video-player"
import facultyData from "@/lib/faculty-data.json"
import coursesData from "@/lib/courses-data.json"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import professorsData from "@/lib/professors-data.json"

type Professor = {
  id: number
  name: string
  title: string
  department: string
  image: string
  profile: string
  email: string
  phone: string
  bio: string
  publications: string[]
  courses: string[]
}

type FlattenedCourse = {
  id: string
  title: string
  description: string
  level: string
  semester: string
  image: string
}

export default function Home() {
  const [videoOpen, setVideoOpen] = useState(false)
  const departments = facultyData.departments || []
  const [searchTerm, setSearchTerm] = useState("")
  const [searchType, setSearchType] = useState<"all" | "professors" | "courses">("all")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedProfessor, setSelectedProfessor] = useState<Professor | null>(null)
  const [selectedCourse, setSelectedCourse] = useState<FlattenedCourse | null>(null)
  const [professors, setProfessors] = useState<Professor[]>([])
  const [flattenedCourses, setFlattenedCourses] = useState<FlattenedCourse[]>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  useEffect(() => {
    // Load professors from JSON
    setProfessors(professorsData.professors)

    // Flatten courses data for easier searching
    const flattened: FlattenedCourse[] = []
    Object.entries(coursesData).forEach(([level, semesters]) => {
      Object.entries(semesters as Record<string, any>).forEach(([semester, courses]) => {
        ;(courses as any[]).forEach((course) => {
          flattened.push({
            ...course,
            level: getLevelName(level),
            semester: getSemesterName(semester),
            image: getCourseImage(course.id), // Add this line to set the image property
          })
        })
      })
    })
    setFlattenedCourses(flattened)
  }, [])

  const getLevelName = (levelId: string) => {
    const levelMap: Record<string, string> = {
      level1: "المستوى الأول",
      level2: "المستوى الثاني",
      level3: "المستوى الثالث",
      level4: "المستوى الرابع",
    }
    return levelMap[levelId] || levelId
  }
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
      "photography": "/التصوير-الفوتوغرافي.jpg",
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

  const getSemesterName = (semesterId: string) => {
    const semesterMap: Record<string, string> = {
      semester1: "الفصل الدراسي الأول",
      semester2: "الفصل الدراسي الثاني",
    }
    return semesterMap[semesterId] || semesterId
  }

  const filteredProfessors = professors.filter((professor) => {
    const matchesSearch =
      professor.name.includes(searchTerm) ||
      professor.title.includes(searchTerm) ||
      (professor.department && professor.department.includes(searchTerm))

    let matchesDepartment = true
    if (selectedDepartment === "all") {
      matchesDepartment = true // Show all professors regardless of department
    } else if (selectedDepartment === "no-department") {
      matchesDepartment = !professor.department || professor.department === "" // Show professors with no department
    } else {
      matchesDepartment = !!professor.department && professor.department.includes(selectedDepartment)
    }

    return matchesSearch && matchesDepartment
  })

  const filteredCourses = flattenedCourses.filter((course) => {
    return (
      course.title.includes(searchTerm) ||
      course.description.includes(searchTerm) ||
      course.level.includes(searchTerm) ||
      course.semester.includes(searchTerm)
    )
  })

  const allDepartments = [
    { id: "all", name: "جميع الأقسام" },
    { id: "أصول التربية", name: "أصول التربية" },
    { id: "مناهج وطرق تدريس", name: "مناهج وطرق تدريس" },
    { id: "علم النفس", name: "علم النفس" },
    { id: "تكنولوجيا التعليم", name: "تكنولوجيا التعليم" },
    { id: "رياض أطفال", name: "قسم رياض الأطفال" },
    { id: "no-department", name: "بدون قسم" },
  ]

  const getSearchResults = () => {
    if (searchType === "professors") return filteredProfessors
    if (searchType === "courses") return filteredCourses

    // For "all" type, we need to determine what to show based on search term
    if (!searchTerm) return []

    // If we have results in both categories, show both
    if (filteredProfessors.length > 0 && filteredCourses.length > 0) {
      return [...filteredProfessors, ...filteredCourses]
    }

    // Otherwise show whichever has results
    return filteredProfessors.length > 0 ? filteredProfessors : filteredCourses
  }

  const searchResults = getSearchResults()
  const hasProfessorResults = filteredProfessors.length > 0
  const hasCourseResults = filteredCourses.length > 0

  useEffect(() => {
    // Load professors from JSON and log to verify data
    setProfessors(professorsData.professors)

  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      {/* Search Section  */}
      <div className="pt-24 pb-16">
        <div className="container px-4 mx-auto">


          <div className="max-w-5xl mx-auto mb-8">
            <div className="glass-card p-6 rounded-2xl flex flex-col gap-4 shadow-lg border border-white/20 backdrop-blur-md">
              <Tabs
                defaultValue="all"
                value={searchType}
                onValueChange={(value) => setSearchType(value as any)}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-3 mb-4 rounded-xl bg-secondary/50 p-1">
                  <TabsTrigger
                    value="all"
                    className="rounded-lg flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800"
                  >
                    <Search className="h-4 w-4" />
                    <span>الكل</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="professors"
                    className="rounded-lg flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800"
                  >
                    <School className="h-4 w-4" />
                    <span>أعضاء هيئة التدريس</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="courses"
                    className="rounded-lg flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800"
                  >
                    <Book className="h-4 w-4" />
                    <span>المقررات الدراسية</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute right-4 top-3.5 h-5 w-5 text-primary" />
                  <Input
                    placeholder={
                      searchType === "professors"
                        ? "ابحث عن عضو هيئة تدريس..."
                        : searchType === "courses"
                          ? "ابحث عن مقرر دراسي..."
                          : "ابحث عن عضو هيئة تدريس أو مقرر دراسي..."
                    }
                    className="pr-12 rounded-xl border-0 bg-white/70 dark:bg-gray-800/70 focus-visible:ring-primary h-12 text-base shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                {searchType === "professors" && (
                  <Button
                    variant="outline"
                    className="h-12 rounded-xl flex items-center gap-2"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                  >
                    <Filter className="h-4 w-4" />
                    <span>تصفية</span>
                  </Button>
                )}
              </div>

              {isFilterOpen && searchType === "professors" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="pt-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">القسم</label>
                      <select
                        className="w-full h-10 rounded-xl border-0 bg-white/70 dark:bg-gray-800/70 px-4 py-2 focus:ring-2 focus:ring-primary text-base shadow-sm"
                        value={selectedDepartment}
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                      >
                        {allDepartments.map((dept) => (
                          <option key={dept.id} value={dept.id}>
                            {dept.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Display search results */}
          {searchTerm && (
            <div className="max-w-6xl mx-auto mb-12">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium">
                  {searchResults.length > 0
                    ? `تم العثور على ${searchResults.length} ${searchResults.length === 1 ? "نتيجة" : "نتائج"}`
                    : "لا توجد نتائج مطابقة"}
                </h3>
                {searchResults.length > 0 && (
                  <p className="text-sm text-muted-foreground">اضغط على البطاقة لعرض التفاصيل</p>
                )}
              </div>

              {/* Show results based on search type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {searchType !== "courses" &&
                  filteredProfessors.map((professor, index) => (
                    <motion.div
                      key={`professor-${professor.id}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      whileHover={{ y: -5 }}
                      onClick={() => setSelectedProfessor(professor)}
                      className="cursor-pointer"
                    >
                      <Card className="overflow-hidden h-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-white/20 shadow-lg rounded-2xl transition-all duration-300 hover:shadow-xl">
                        <CardContent className="p-0">
                          <div className="relative w-full pt-[100%] overflow-hidden">
                            <Image
                              src={professor.image || "/placeholder.svg"}
                              alt={professor.name}
                              fill
                              sizes="(max-width: 768px) 100vw, 33vw"
                              className="object-cover transition-all duration-500 hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                            <div className="absolute top-3 right-3 bg-primary/90 text-white text-xs py-1 px-2 rounded-full">
                              {professor.department || "بدون قسم"}
                            </div>
                            <Badge className="absolute top-3 left-3 bg-blue-500/90">عضو هيئة تدريس</Badge>
                          </div>
                          <div className="p-5 relative">
                            <h3 className="text-lg font-bold mb-1 line-clamp-1">{professor.name}</h3>
                            <p className="text-primary text-sm mb-2">{professor.title}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                              <Mail className="h-3.5 w-3.5" />
                              <span className="truncate">{professor.email}</span>
                            </div>
                            <Button className="w-full rounded-xl text-sm py-1" variant="default">
                              عرض الملف الشخصي
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}

                {searchType !== "professors" &&
                  filteredCourses.map((course, index) => (
                    <motion.div
                      key={`course-${course.id}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      whileHover={{ y: -5 }}
                      onClick={() => setSelectedCourse(course)}
                      className="cursor-pointer"
                    >
                      <Card className="overflow-hidden h-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-white/20 shadow-lg rounded-2xl transition-all duration-300 hover:shadow-xl">
                        <CardContent className="p-0">
                          <div className="relative w-full pt-[60%] overflow-hidden">
                            <Image
                              src={course.image || "/placeholder.svg?height=200&width=200"}
                              alt={course.title}
                              fill
                              sizes="(max-width: 768px) 100vw, 33vw"
                              className="object-cover transition-all duration-500 hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                            <div className="absolute top-3 right-3 bg-amber-500/90 text-white text-xs py-1 px-2 rounded-full">
                              {course.level}
                            </div>
                            <Badge className="absolute top-3 left-3 bg-emerald-500/90">مقرر دراسي</Badge>
                          </div>
                          <div className="p-5 relative">
                            <h3 className="text-lg font-bold mb-1 line-clamp-2">{course.title}</h3>
                            <p className="text-primary text-sm mb-2">{course.semester}</p>
                            <p className="text-xs text-muted-foreground line-clamp-2 mb-4">
                              {course.description.substring(0, 80)}...
                            </p>
                            <Button className="w-full rounded-xl text-sm py-1" variant="default">
                              عرض التفاصيل
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
              </div>

              {searchResults.length === 0 && (
                <div className="text-center py-16 glass-card rounded-2xl max-w-md mx-auto mt-8 border border-white/20 backdrop-blur-md">
                  <Search className="h-16 w-16 mx-auto text-muted-foreground mb-4 opacity-50" />
                  <h3 className="text-xl font-bold mb-3">لا توجد نتائج</h3>
                  <p className="text-muted-foreground mb-6">
                    {searchType === "professors"
                      ? "لم يتم العثور على أعضاء هيئة تدريس مطابقين لمعايير البحث"
                      : searchType === "courses"
                        ? "لم يتم العثور على مقررات دراسية مطابقة لمعايير البحث"
                        : "لم يتم العثور على نتائج مطابقة لمعايير البحث"}
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedDepartment("all")
                    }}
                    className="rounded-xl"
                  >
                    إعادة ضبط البحث
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Faculty Member Details Dialog */}
          <Dialog open={!!selectedProfessor} onOpenChange={(open) => !open && setSelectedProfessor(null)}>
            <DialogContent className="max-w-4xl rounded-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-white/20 p-0 overflow-hidden">
              <div className="relative h-32 md:h-[190px] w-full overflow-hidden">
                <Image
                  src={"/tarbia.jpg"}
                  alt="كلية التربية"
                  width={1280}
                  height={720}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#10107453] to-#0000ff2e opacity-90" />
                <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10 mix-blend-overlay" />
                <DialogClose className="absolute top-4 left-4 bg-black/20 hover:bg-black/40 rounded-full p-2 text-white transition-colors">
                  <X className="h-5 w-5" />
                </DialogClose>
                <div className="absolute -bottom-16 right-8 w-24 h-24 md:w-40 md:h-44 rounded-2xl overflow-hidden border-4 border-white dark:border-gray-900 shadow-xl">
                  <Image
                    src={selectedProfessor?.image || "/placeholder.svg?height=200&width=200"}
                    alt={selectedProfessor?.name || "عضو هيئة تدريس"}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="pt-6 px-8 pb-6">
                <div className="flex flex-col md:flex-row justify-between">
                  <div>
                    <h2 className="text-3xl font-bold mb-1">{selectedProfessor?.name}</h2>
                    <p className="text-lg text-primary mb-1">{selectedProfessor?.title}</p>
                    <p className="text-muted-foreground">{selectedProfessor?.department || "بدون قسم"}</p>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
                    <Button variant="outline" size="sm" className="rounded-full flex gap-2 items-center">
                      <Mail className="h-4 w-4" />
                      <span>راسلني</span>
                    </Button>
                    {selectedProfessor?.profile && (
                      <Button variant="outline" size="sm" className="rounded-full flex gap-2 items-center" asChild>
                        <a href={selectedProfessor.profile} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                          <span>الصفحة الشخصية</span>
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 mt-4 mb-8">
                  <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full">
                    <Mail className="h-4 w-4 text-primary" />
                    <span className="text-sm">{selectedProfessor?.email}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full">
                    <Phone className="h-4 w-4 text-primary" />
                    <span className="text-sm " dir="ltr">{selectedProfessor?.phone}</span>
                  </div>
                </div>
              </div>
              <ScrollArea className="max-h-[20vh] px-8 pb-4">
                <Tabs defaultValue="bio" className="w-full">
                  <TabsList className="w-full rounded-xl bg-secondary/50 p-1">
                    <TabsTrigger
                      value="bio"
                      className="rounded-lg flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800"
                    >
                      السيرة الذاتية
                    </TabsTrigger>

                  </TabsList>
                  <TabsContent value="bio" className="mt-6">
                    <div className="prose dark:prose-invert max-w-none">
                      <p className="leading-relaxed" dir="rtl">{selectedProfessor?.bio}</p>
                    </div>
                  </TabsContent>

                </Tabs>
              </ScrollArea>
            </DialogContent>
          </Dialog>

          {/* Course Details Dialog */}
          <Dialog open={!!selectedCourse} onOpenChange={(open) => !open && setSelectedCourse(null)}>
            <DialogContent className="max-w-2xl rounded-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-white/20 p-0 overflow-hidden">
              <div className="relative h-32 md:h-32 w-full overflow-hidden">
                <Image
                  src={selectedCourse?.image || "/placeholder.svg?height=400&width=800"}
                  alt={selectedCourse?.title || "مقرر دراسي"}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30" />
                <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10 mix-blend-overlay" />
                <DialogClose className="absolute top-4 left-4 bg-black/20 hover:bg-black/40 rounded-full p-2 text-white transition-colors">
                  <X className="h-5 w-5" />
                </DialogClose>
                <div className="absolute bottom-4 right-4 max-w-[80%]">
                  <h2 className="text-2xl font-bold text-white drop-shadow-md bg-black/60 px-2 py-2 rounded-lg">{selectedCourse?.title} </h2>
                </div>
              </div>
              <div className="p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge
                    variant="outline"
                    className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800"
                  >
                    {selectedCourse?.level}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800"
                  >
                    {selectedCourse?.semester}
                  </Badge>
                </div>
                <h2 className="text-2xl font-bold mb-4 ">{selectedCourse?.title}</h2>
                <ScrollArea className="h-[35vh]">
                  <div className="prose dark:prose-invert max-w-none">
                    <h3 className="text-lg font-medium mb-2">وصف المقرر</h3>
                    <p className="leading-relaxed text-muted-foreground">{selectedCourse?.description}</p>

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
                  <Button className="rounded-xl">
                    <Link href={`/courses?level=${selectedCourse?.level}&semester=${selectedCourse?.semester}`}>
                      عرض جميع مقررات {selectedCourse?.level}
                    </Link>
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* End Search Section */}

      {/* Hero Section with Video */}
      <section className="bg-gradient-to-b from-background to-secondary/20">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center max-w-4xl mx-auto"
          >
            <h1 className="text-3xl md:text-5xl py-3 font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 dark:from-primary dark:to-blue-400">
              مرحباً بك في كلية التربية
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
              تعرف على واحدة من أعرق كليات التربية في المنطقة، حيث نقدم تعليماً متميز اً ونخرج أجيالاً من المعلمين المؤهلين
            </p>
            <div className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-xl mb-8 glass-card p-1">
              <Image
                src="/tarbia.jpg"
                alt="كلية التربية"
                width={1280}
                height={720}
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-xl">
                <Button
                  size="lg"
                  className="rounded-full w-16 h-16 flex items-center justify-center hover:scale-110 transition-transform duration-300"
                  onClick={() => setVideoOpen(true)}
                >
                  <Play className="h-8 w-8" />
                </Button>
              </div>
            </div>
            <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
              <DialogContent className="max-w-4xl p-1 sm:p-2 rounded-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-md">
                <VideoPlayer url="/placeholder-video.mp4" />
              </DialogContent>
            </Dialog>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button size="lg" className="rounded-xl group" asChild>
                <Link href="/departments" className="flex items-center">
                  <span>تعرف على الأقسام الأكاديمية</span>
                  <ArrowRight className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-xl" asChild>
                <Link href="/buildings">استكشف مباني الكلية</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Departments Preview */}
      <section className="py-12 md:py-16 bg-glass-gradient backdrop-blur-sm dark:bg-glass-gradient-dark">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 dark:from-primary dark:to-blue-400">
              أقسام الكلية
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              تضم كلية التربية مجموعة متنوعة من الأقسام الأكاديمية التي تغطي مختلف مجالات التربية والتعليم
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto">
            {departments.slice(0, 4).map((dept, index) => (
              <motion.div
                key={dept.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/departments/${dept.id}`}>
                  <Card
                    className={`${dept.color} rounded-2xl p-4 text-center h-full transition-all shadow-sm hover:shadow-md hover-scale flex flex-col justify-between`}
                  >
                    <h3 className="text-xl font-bold mb-2 text-white">{dept.name}</h3>
                    <div className="flex justify-center mt-4">
                      <ChevronRight className="h-6 w-6" />
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild className="rounded-xl">
              <Link href="/departments">عرض جميع الأقسام</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Buildings Preview */}
      <section className="py-12 md:py-16">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 py-2 dark:from-primary dark:to-blue-400">
              المباني الأكاديمية والورش العملية
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              تعرف على مرافق الكلية المتطورة من قاعات دراسية وورش عملية ومعامل مجهزة بأحدث التقنيات
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl overflow-hidden shadow-md hover-scale"
            >
              <div className="relative aspect-video">
                <Image
                  src="/placeholder.svg?height=720&width=1280"
                  alt="المباني الأكاديمية"
                  width={640}
                  height={360}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">المباني الأكاديمية</h3>
                <p className="text-muted-foreground mb-4">قاعات دراسية مجهزة بأحدث التقنيات التعليمية</p>
                <Button asChild className="rounded-xl w-full">
                  <Link href="/buildings" className="flex items-center justify-center">
                    <span>رؤية المزيد</span>
                    <ArrowRight className="mr-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl overflow-hidden shadow-md hover-scale"
            >
              <div className="relative aspect-video">
                <Image
                  src="/placeholder.svg?height=720&width=1280"
                  alt="الورش العملية"
                  width={640}
                  height={360}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">الورش العملية</h3>
                <p className="text-muted-foreground mb-4">ورش عملية متخصصة لتطبيق المهارات العملية</p>
                <Button asChild className="rounded-xl w-full">
                  <Link href="/buildings" className="flex items-center justify-center">
                    <span>رؤية المزيد</span>
                    <ArrowRight className="mr-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
