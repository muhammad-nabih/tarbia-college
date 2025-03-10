"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Search, Mail, Phone, GraduationCap, ExternalLink } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import professorsData from "@/lib/professors-data.json"

export default function FacultyPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedProfessor, setSelectedProfessor] = useState<any>(null)
  const [professors, setProfessors] = useState<any[]>([])

  useEffect(() => {
    // Load professors from JSON
    setProfessors(professorsData.professors)
  }, [])

  const filteredProfessors = professors.filter((professor) => {
    const matchesSearch =
      professor.name.includes(searchTerm) ||
      professor.title.includes(searchTerm) ||
      professor.department.includes(searchTerm)

    const matchesDepartment = selectedDepartment === "all" || professor.department.includes(selectedDepartment)

    return matchesSearch && matchesDepartment
  })

  const departments = [
    { id: "all", name: "جميع الأقسام" },
    { id: "أصول التربية", name: "أصول التربية" },
    { id: "مناهج وطرق تدريس", name: "مناهج وطرق تدريس" },
    { id: "علم النفس", name: "علم النفس" },
    { id: "تكنولوجيا التعليم", name: "تكنولوجيا التعليم" },
{id:"رياض أطفال" , name:"قسم رياض الاطفال"}
]

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
            أعضاء هيئة التدريس
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            تعرف على أعضاء هيئة التدريس في كلية التربية وتخصصاتهم المختلفة
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto mb-8">
          <div className="glass-card p-4 rounded-2xl flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="ابحث عن عضو هيئة تدريس..."
                className="pr-10 rounded-xl border-0 bg-white/50 dark:bg-gray-800/50 focus-visible:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="w-full md:w-64">
              <select
                className="w-full h-10 rounded-xl border-0 bg-white/50 dark:bg-gray-800/50 px-3 py-2 focus:ring-2 focus:ring-primary"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {filteredProfessors.map((professor, index) => (
            <motion.div
              key={professor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Card className="overflow-hidden h-full hover-scale bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-md rounded-2xl">
                <CardContent className="p-0">
                  <div className="relative w-full pt-[100%]">

  {/* الصورة مع Blur خفيف */}
  <Image
    src={professor.image || "/placeholder.svg"}
    alt={professor.name}
    layout="fill"
    objectFit="cover"
    className="blur-sm hover:blur-0 transition duration-500"
  />

  {/* Overlay داكن شفاف */}
  <div className="absolute inset-0 bg-black/30 transition-opacity hover:bg-black/10" />

  {/* Pattern خفيف لتحسين المظهر */}
  <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10 mix-blend-overlay" />



                  </div>
                  <div className="p-4">
                    <h3 className="text-base font-bold mb-1 line-clamp-1">{professor.name}</h3>
                    <p className="text-primary text-xs mb-1">{professor.title}</p>
                    <p className="text-muted-foreground text-xs mb-3">{professor.department}</p>

                    <Button
                      onClick={() => setSelectedProfessor(professor)}
                      className="w-full rounded-xl text-xs py-1 h-8"
                      variant="default"
                    >
                      عرض الملف الشخصي
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredProfessors.length === 0 && (
          <div className="text-center py-12 glass-card rounded-2xl max-w-md mx-auto mt-8">
            <GraduationCap className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-bold mb-2">لا توجد نتائج</h3>
            <p className="text-muted-foreground">لم يتم العثور على أعضاء هيئة تدريس مطابقين لمعايير البحث</p>
          </div>
        )}
      </div>

      {/* Faculty Member Details Dialog */}
      <Dialog open={!!selectedProfessor} onOpenChange={(open) => !open && setSelectedProfessor(null)}>
        <DialogContent className="max-w-3xl rounded-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedProfessor?.name}</DialogTitle>
            <DialogDescription className="text-base">
              {selectedProfessor?.title} - {selectedProfessor?.department}
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="max-h-[70vh]">
            <div className="p-4">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <div className="rounded-xl overflow-hidden shadow-md">
                    <Image
                      src={selectedProfessor?.image || "/placeholder.svg?height=200&width=200"}
                      alt={selectedProfessor?.name || "عضو هيئة تدريس"}
                      width={300}
                      height={300}
                      className="w-full h-auto object-cover"
                    />
                  </div>

                  <div className="mt-4 space-y-3 glass-card p-4 rounded-xl">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" />
                      <span className="text-sm">{selectedProfessor?.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary" />
                      <span className="text-sm">{selectedProfessor?.phone}</span>
                    </div>
                    {selectedProfessor?.profile && (
                      <div className="flex items-center gap-2">
                        <ExternalLink className="h-4 w-4 text-primary" />
                        <a
                          href={selectedProfessor.profile}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          الصفحة الشخصية
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <div className="md:w-2/3">
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

                    <TabsContent value="bio" className="mt-4 glass-card p-4 rounded-xl">
                      <p>{selectedProfessor?.bio}</p>
                    </TabsContent>

                    <TabsContent value="publications" className="mt-4 glass-card p-4 rounded-xl">
                      <ul className="space-y-2">
                        {selectedProfessor?.publications.map((pub: string, index: number) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
                            <span>{pub}</span>
                          </li>
                        ))}
                      </ul>
                    </TabsContent>

                    <TabsContent value="courses" className="mt-4 glass-card p-4 rounded-xl">
                      <ul className="space-y-2">
                        {selectedProfessor?.courses.map((course: string, index: number) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
                            <span>{course}</span>
                          </li>
                        ))}
                      </ul>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </ScrollArea>

          <div className="flex justify-end mt-6">
            <DialogClose asChild>
              <Button className="rounded-xl">إغلاق</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
