"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Book, GraduationCap } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
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
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {currentCourses.map((course: Course, index: number) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  onClick={() => setSelectedCourse(course)}
                  className="glass-card rounded-xl p-4 cursor-pointer hover-scale text-center flex flex-col items-center justify-center aspect-square"
                >
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center mb-3">
                    <Book className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-sm md:text-base line-clamp-2">{course.title}</h3>
                </motion.div>
              ))}
            </div>
          </Tabs>
        </div>
      </div>

      {/* Course Details Dialog */}
      <Dialog open={!!selectedCourse} onOpenChange={(open) => !open && setSelectedCourse(null)}>
        <DialogContent className="max-w-2xl rounded-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedCourse?.title}</DialogTitle>
          </DialogHeader>

          <ScrollArea className="h-[60vh] mt-4">
            <div className="glass-card p-6 rounded-xl">
              <p className="text-muted-foreground whitespace-pre-line">{selectedCourse?.description}</p>
            </div>
          </ScrollArea>

          <div className="flex justify-end mt-4">
            <DialogClose asChild>
              <Button className="rounded-xl">إغلاق</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
