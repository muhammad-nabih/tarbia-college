"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Search, Mail, Phone, GraduationCap } from "lucide-react"
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
import { facultyMembers } from "@/lib/data"

export default function FacultyPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedMember, setSelectedMember] = useState<any>(null)

  const filteredMembers = facultyMembers.filter((member) => {
    const matchesSearch =
      member.name.includes(searchTerm) || member.title.includes(searchTerm) || member.department.includes(searchTerm)

    const matchesDepartment = selectedDepartment === "all" || member.department.includes(selectedDepartment)

    return matchesSearch && matchesDepartment
  })

  const departments = [
    { id: "all", name: "جميع الأقسام" },
    { id: "أصول التربية", name: "أصول التربية" },
    { id: "المناهج وطرق التدريس", name: "المناهج وطرق التدريس" },
    { id: "علم النفس التربوي", name: "علم النفس التربوي" },
    { id: "تكنولوجيا التعليم", name: "تكنولوجيا التعليم" },
    { id: "رياض الأطفال", name: "رياض الأطفال" },
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
          <h1 className="text-3xl md:text-5xl font-bold mb-4">أعضاء هيئة التدريس</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            تعرف على أ��ضاء هيئة التدريس في كلية التربية وتخصصاتهم المختلفة
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="ابحث عن عضو هيئة تدريس..."
                className="pr-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="w-full md:w-64">
              <select
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {filteredMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden h-full">
                <CardContent className="p-0">
                  <div className="aspect-square relative">
                    <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-primary text-sm mb-2">{member.title}</p>
                    <p className="text-muted-foreground text-sm mb-4">{member.department}</p>

                    <Button onClick={() => setSelectedMember(member)} className="w-full">
                      عرض الملف الشخصي
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <GraduationCap className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-bold mb-2">لا توجد نتائج</h3>
            <p className="text-muted-foreground">لم يتم العثور على أعضاء هيئة تدريس مطابقين لمعايير البحث</p>
          </div>
        )}
      </div>

      {/* Faculty Member Details Dialog */}
      <Dialog open={!!selectedMember} onOpenChange={(open) => !open && setSelectedMember(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedMember?.name}</DialogTitle>
            <DialogDescription className="text-base">
              {selectedMember?.title} - {selectedMember?.department}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <div className="rounded-lg overflow-hidden">
                  <Image
                    src={selectedMember?.image || "/placeholder.svg?height=200&width=200"}
                    alt={selectedMember?.name || "عضو هيئة تدريس"}
                    width={300}
                    height={300}
                    className="w-full h-auto object-cover"
                  />
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{selectedMember?.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{selectedMember?.phone}</span>
                  </div>
                </div>
              </div>

              <div className="md:w-2/3">
                <Tabs defaultValue="bio">
                  <TabsList className="w-full">
                    <TabsTrigger value="bio" className="flex-1">
                      السيرة الذاتية
                    </TabsTrigger>
                    <TabsTrigger value="publications" className="flex-1">
                      المنشورات
                    </TabsTrigger>
                    <TabsTrigger value="courses" className="flex-1">
                      المقررات
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="bio" className="mt-4">
                    <p>{selectedMember?.bio}</p>
                  </TabsContent>

                  <TabsContent value="publications" className="mt-4">
                    <ul className="space-y-2">
                      {selectedMember?.publications.map((pub: string) => (
                        <li key={pub} className="flex items-start gap-2">
                          <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
                          <span>{pub}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>

                  <TabsContent value="courses" className="mt-4">
                    <ul className="space-y-2">
                      {selectedMember?.courses.map((course: string) => (
                        <li key={course} className="flex items-start gap-2">
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

          <div className="flex justify-end mt-6">
            <DialogClose asChild>
              <Button>إغلاق</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

