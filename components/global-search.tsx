"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search, X, School } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import professorsData from "@/lib/professors-data.json"
import coursesData from "@/lib/courses-data.json"
import Image from "next/image"

// Update the FlattenedCourse type to include an image property
type FlattenedCourse = {
  id: string
  title: string
  description: string
  level: string
  semester: string
  image?: string
}

export default function GlobalSearch() {
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [professors, setProfessors] = useState<any[]>([])
  const [flattenedCourses, setFlattenedCourses] = useState<FlattenedCourse[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // In the useEffect where we flatten courses, add image mapping
  useEffect(() => {
    // Load professors from JSON
    setProfessors(professorsData.professors)

    // Flatten courses data for easier searching
    const flattened: FlattenedCourse[] = []
    Object.entries(coursesData).forEach(([level, semesters]) => {
      Object.entries(semesters as Record<string, any>).forEach(([semester, courses]) => {
        ;(courses as any[]).forEach((course) => {
          // Map course ID to image filename
          const courseImage = getCourseImage(course.id)

          flattened.push({
            ...course,
            level: getLevelName(level),
            semester: getSemesterName(semester),
            image: courseImage,
          })
        })
      })
    })
    setFlattenedCourses(flattened)
  }, [])

  // Add a function to map course IDs to image filenames
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

  const getLevelName = (levelId: string) => {
    const levelMap: Record<string, string> = {
      level1: "المستوى الأول",
      level2: "المستوى الثاني",
      level3: "المستوى الثالث",
      level4: "المستوى الرابع",
    }
    return levelMap[levelId] || levelId
  }

  const getSemesterName = (semesterId: string) => {
    const semesterMap: Record<string, string> = {
      semester1: "الفصل الدراسي الأول",
      semester2: "الفصل الدراسي الثاني",
    }
    return semesterMap[semesterId] || semesterId
  }

  const filteredProfessors = professors
    .filter((professor) => professor.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, 5)

  const filteredCourses = flattenedCourses
    .filter((course) => course.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, 5)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleSelect = (item: any, type: "professor" | "course") => {
    setOpen(false)
    if (type === "professor") {
      router.push(`/search?type=professors&q=${encodeURIComponent(item.name)}`)
    } else {
      router.push(`/search?type=courses&q=${encodeURIComponent(item.title)}`)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2 rounded-full"
        >
          <Search className="h-4 w-4 xl:mr-2" />
          <span className="hidden xl:inline-flex">بحث...</span>
          <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100 xl:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 max-w-2xl rounded-xl overflow-hidden">
        <Command className="rounded-lg border shadow-md">
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandInput
              ref={inputRef}
              placeholder="ابحث عن أعضاء هيئة التدريس أو المقررات..."
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              value={searchTerm}
              onValueChange={setSearchTerm}
            />
            <DialogClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-4 w-4" />
              <span className="sr-only">إغلاق</span>
            </DialogClose>
          </div>
          <CommandList>
            <CommandEmpty>لا توجد نتائج مطابقة</CommandEmpty>
            {filteredProfessors.length > 0 && (
              <CommandGroup heading="أعضاء هيئة التدريس">
                {filteredProfessors.map((professor) => (
                  <CommandItem
                    key={professor.id}
                    onSelect={() => handleSelect(professor, "professor")}
                    className="flex items-center gap-2 px-4 py-2"
                  >
                    <School className="h-4 w-4 text-primary" />
                    <div>
                      <p>{professor.name}</p>
                      <p className="text-xs text-muted-foreground">{professor.department || "بدون قسم"}</p>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            {filteredCourses.length > 0 && (
              // Update the CommandItem for courses to include a small thumbnail image
              <CommandGroup heading="المقررات الدراسية">
                {filteredCourses.map((course) => (
                  <CommandItem
                    key={course.id}
                    onSelect={() => handleSelect(course, "course")}
                    className="flex items-center gap-3 px-4 py-2"
                  >
                    <div className="h-8 w-8 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={course.image || "/placeholder.svg?height=32&width=32"}
                        alt={course.title}
                        width={32}
                        height={32}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p>{course.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {course.level} - {course.semester}
                      </p>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            <div className="py-2 px-4 text-xs text-muted-foreground">
              <p>اضغط على Enter للبحث، أو Esc للإغلاق</p>
            </div>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  )
}
