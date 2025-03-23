"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Play, ChevronRight, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import VideoPlayer from "@/components/video-player"
import facultyData from "@/lib/faculty-data.json"
import professorsData from "@/lib/professors-data.json"
import { Search, Mail, Phone, GraduationCap, ExternalLink, X, FileText } from "lucide-react"
import { Input } from "@/components/ui/input"
import { DialogClose } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Home() {
  const [videoOpen, setVideoOpen] = useState(false)
  const departments = facultyData.departments || []
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedProfessor, setSelectedProfessor] = useState<any>(null)
  const [professors, setProfessors] = useState<any[]>([])

  useEffect(() => {
    // Load professors from JSON and log to verify data
    setProfessors(professorsData.professors)
    console.log("Loaded professors:", professorsData.professors)
  }, [])

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
      matchesDepartment = professor.department && professor.department.includes(selectedDepartment)
    }

    return matchesSearch && matchesDepartment
  })

  const allDepartments = [
    { id: "all", name: "جميع الأقسام" },
    { id: "أصول التربية", name: "أصول التربية" },
    { id: "مناهج وطرق تدريس", name: "مناهج وطرق تدريس" },
    { id: "علم النفس", name: "علم النفس" },
    { id: "تكنولوجيا التعليم", name: "تكنولوجيا التعليم" },
    { id: "رياض أطفال", name: "قسم رياض الأطفال" },
    { id: "no-department", name: "بدون قسم" }, // Added option for professors with no department
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Search Section */}
      <div className="mt-[80px] mb-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-5xl mx-auto mb-8">
            <div className="glass-card p-6 rounded-2xl flex flex-col md:flex-row gap-4 shadow-lg border border-white/20 backdrop-blur-md">
              <div className="relative flex-1">
                <Search className="absolute right-4 top-3.5 h-5 w-5 text-primary" />
                <Input
                  placeholder="ابحث عن عضو هيئة تدريس..."
                  className="pr-12 rounded-xl border-0 bg-white/70 dark:bg-gray-800/70 focus-visible:ring-primary h-12 text-base shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="w-full md:w-64">
                <select
                  className="w-full h-12 rounded-xl border-0 bg-white/70 dark:bg-gray-800/70 px-4 py-2 focus:ring-2 focus:ring-primary text-base shadow-sm"
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
          </div>

          {/* Display search results */}
          {searchTerm && (
            <div className="max-w-6xl mx-auto mb-12">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium">
                  {filteredProfessors.length > 0
                    ? `تم العثور على ${filteredProfessors.length} ${filteredProfessors.length === 1 ? "عضو" : "أعضاء"}`
                    : "لا توجد نتائج مطابقة"}
                </h3>
                {filteredProfessors.length > 0 && (
                  <p className="text-sm text-muted-foreground">اضغط على بطاقة العضو لعرض التفاصيل</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProfessors.map((professor, index) => (
                  <motion.div
                    key={professor.id}
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
              </div>

              {filteredProfessors.length === 0 && (
                <div className="text-center py-16 glass-card rounded-2xl max-w-md mx-auto mt-8 border border-white/20 backdrop-blur-md">
                  <GraduationCap className="h-16 w-16 mx-auto text-muted-foreground mb-4 opacity-50" />
                  <h3 className="text-xl font-bold mb-3">لا توجد نتائج</h3>
                  <p className="text-muted-foreground mb-6">لم يتم العثور على أعضاء هيئة تدريس مطابقين لمعايير البحث</p>
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
        </div>

        {/* Faculty Member Details Dialog */}
        <Dialog open={!!selectedProfessor} onOpenChange={(open) => !open && setSelectedProfessor(null)}>
          <DialogContent className="max-w-4xl rounded-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-white/20 p-0 overflow-hidden">
            <div className="relative h-48 md:h-64 w-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-600 opacity-90" />
              <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10 mix-blend-overlay" />
              <DialogClose className="absolute top-4 left-4 bg-black/20 hover:bg-black/40 rounded-full p-2 text-white transition-colors">
                <X className="h-5 w-5" />
              </DialogClose>
              <div className="absolute -bottom-16 right-8 w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-4 border-white dark:border-gray-900 shadow-xl">
                <Image
                  src={selectedProfessor?.image || "/placeholder.svg?height=200&width=200"}
                  alt={selectedProfessor?.name || "عضو هيئة تدريس"}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="pt-20 px-8 pb-6">
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
              <div className="flex flex-wrap gap-4 mt-6 mb-8">
                <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full">
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="text-sm">{selectedProfessor?.email}</span>
                </div>
                <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="text-sm">{selectedProfessor?.phone}</span>
                </div>
              </div>
            </div>
            <ScrollArea className="max-h-[30vh] px-8 pb-8">
              <Tabs defaultValue="bio" className="w-full">
                <TabsList className="w-full rounded-xl bg-secondary/50 p-1">
                  <TabsTrigger
                    value="bio"
                    className="rounded-lg flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800"
                  >
                    السيرة الذاتية
                  </TabsTrigger>
                  <TabsTrigger
                    value="publications"
                    className="rounded-lg flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800"
                  >
                    المنشورات
                  </TabsTrigger>
                  <TabsTrigger
                    value="courses"
                    className="rounded-lg flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800"
                  >
                    المقررات
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="bio" className="mt-6">
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="leading-relaxed">{selectedProfessor?.bio}</p>
                  </div>
                </TabsContent>
                <TabsContent value="publications" className="mt-6">
                  <ul className="space-y-4">
                    {selectedProfessor?.publications?.map((pub:any, index:number) => (
                      <li key={index} className="flex items-start gap-3 bg-muted/30 p-4 rounded-xl">
                        <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <FileText className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <div>
                          <p className="leading-relaxed">{pub}</p>
                          <p className="text-xs text-muted-foreground mt-1">تاريخ النشر: {2020 - index}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="courses" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedProfessor?.courses?.map((course: any, index: number) => (
                      <div key={index} className="bg-muted/30 p-4 rounded-xl border border-muted">
                        <div className="flex items-center gap-2 mb-2">
                          <GraduationCap className="h-5 w-5 text-primary" />
                          <h4 className="font-medium">{course}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {["بكالوريوس", "دراسات عليا"][index % 2]} - الفصل الدراسي {["الأول", "الثاني"][index % 2]}
                        </p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </ScrollArea>
          </DialogContent>
        </Dialog>
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
              تعرف على واحدة من أعرق كليات التربية في المنطقة، حيث نقدم تعليماً متميزاً ونخرج أجيالاً من المعلمين المؤهلين
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
