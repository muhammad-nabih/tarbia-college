"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { BookOpen, School, Laptop, Baby, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"
import { departments } from "@/lib/data"

// Map department IDs to icons
const departmentIcons: Record<string, any> = {
  osool: School,
  manahej: BookOpen,
  psychology: Brain,
  technology: Laptop,
  kindergarten: Baby,
}

export default function DepartmentsPage() {
  const [selectedDept, setSelectedDept] = useState<(typeof departments)[0] | null>(null)

  return (
    <div className="pt-24 pb-16">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-4">الأقسام الأكاديمية</h1>
            <p className="text-lg text-muted-foreground">
              تعرف على الأقسام الأكاديمية في كلية التربية والتخصصات المختلفة التي تقدمها
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {departments.map((dept, index) => {
              const Icon = departmentIcons[dept.id] || School

              return (
                <motion.div
                  key={dept.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`${dept.color} rounded-xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer`}
                  onClick={() => setSelectedDept(dept)}
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-white p-2 rounded-full mr-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="text-xl font-bold">{dept.name}</h2>
                  </div>
                  <p className="text-muted-foreground mb-4">{dept.description}</p>
                  <Button variant="outline" className="w-full">
                    عرض التفاصيل
                  </Button>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Department Details Dialog */}
      <Dialog open={!!selectedDept} onOpenChange={(open) => !open && setSelectedDept(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedDept?.name}</DialogTitle>
            <DialogDescription className="text-base mt-2">{selectedDept?.description}</DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            <div className="bg-secondary/30 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-bold mb-2">رئيس القسم</h3>
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                  <Image
                    src={selectedDept?.head.image || "/placeholder.svg"}
                    alt={selectedDept?.head.name || ""}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold">{selectedDept?.head.name}</h4>
                  <p className="text-sm text-muted-foreground">{selectedDept?.head.title}</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold mb-2">رؤية القسم</h3>
              <p className="text-muted-foreground">{selectedDept?.vision}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold mb-2">رسالة القسم</h3>
              <p className="text-muted-foreground">{selectedDept?.mission}</p>
            </div>

            <h3 className="text-xl font-bold mb-4">أعضاء هيئة التدريس</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {selectedDept?.faculty.map((member) => (
                <div key={member.name} className="bg-secondary/50 rounded-lg p-4 text-center">
                  <div className="mx-auto w-24 h-24 rounded-full overflow-hidden mb-3">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-bold">{member.name}</h4>
                  <p className="text-sm text-muted-foreground">{member.title}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <DialogClose asChild>
              <Button>إغلاق</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

