"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  School,
  BookOpen,
  Brain,
  Laptop,
  Baby,
  GraduationCap,
  Mail,
  Phone,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import professorsData from "@/lib/professors-data.json";
import Link from "next/link";
import SectionTitle from "@/components/section-title";
// Map department IDs to icons
const departmentIcons: Record<string, any> = {
  osool: School,
  manahej: BookOpen,
  psychology: Brain,
  technology: Laptop,
  kindergarten: Baby,
};

export default function DepartmentPage() {
  const params = useParams();
  const departmentId = params.id as string;
  console.log(departmentId);
  const [department, setDepartment] = useState<any>(null);
  const [professors, setProfessors] = useState<any[]>([]);
  const [selectedProfessor, setSelectedProfessor] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the department
    const dept = professorsData.departments.find((d) => d.id === departmentId);
    if (dept) {
      setDepartment(dept);

      // Get professors for this department
      const deptProfessors = professorsData.professors.filter((p) =>
        dept.professors.includes(p.id),
      );

      setProfessors(deptProfessors);
    }
    setLoading(false);
  }, [departmentId]);

  if (loading) {
    return (
      <div className="pt-24 pb-16 container">
        <div className="flex items-center justify-center h-64">
          <p className="text-lg">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  if (!department) {
    return (
      <div className="pt-24 pb-16 container">
        <div className="flex items-center justify-center h-64">
          <p className="text-lg">لم يتم العثور على القسم</p>
        </div>
      </div>
    );
  }

  const Icon = departmentIcons[department.id] || School;

  return (
    <div className="pt-24 pb-16">
      <div className="container px-4 mx-auto">
        <SectionTitle
          title={department.name}
          description={department.description}
        />

        <div className="max-w-5xl mx-auto">
          <div
            className={`grid grid-cols-1 ${departmentId === "technology" ? "md:grid-cols-4" : "md:grid-cols-3"} gap-8 mb-12`}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`${department.color.bg} rounded-2xl p-6 shadow-md min-h-[300px]`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-white/80 dark:bg-gray-800/80 p-3 rounded-full mb-4 shadow-sm">
                  <Icon className="h-12 w-12 text-primary" />
                </div>
                <h2 className="text-xl font-bold mb-2">رؤية القسم</h2>
                <p className="text-popover">{department.vision}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`${department.color.bg} rounded-2xl p-6 shadow-md min-h-[300px]`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-white/80 dark:bg-gray-800/80 p-3 rounded-full mb-4 shadow-sm">
                  <Icon className="h-12 w-12 text-primary" />
                </div>
                <h2 className="text-xl font-bold mb-2">رسالة القسم</h2>
                <p className="text-popover">{department.mission}</p>
              </div>
            </motion.div>
            {departmentId === "technology" && (
              <Link href="/courses">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className={`${department.color.bg} rounded-2xl p-6 shadow-md min-h-[300px]`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-white/80 dark:bg-gray-800/80 p-3 rounded-full mb-4 shadow-sm">
                      <Icon className="h-12 w-12 text-primary" />
                    </div>
                    <h2 className="text-xl font-bold mb-2"> مقررات القسم</h2>
                    <p className="text-popover">
                      جميع مقررات قسم تكنولوجيا التعليم{" "}
                    </p>
                  </div>
                </motion.div>
              </Link>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-card rounded-2xl p-6 shadow-md min-h-[300px]"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 shadow-md">
                  <Image
                    src={department.head.image || "/placeholder.svg"}
                    alt={department.head.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-xl font-bold mb-2">رئيس القسم</h2>
                <p className="text-primary font-medium">
                  {department.head.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {department.head.title}
                </p>
              </div>
            </motion.div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">
              أعضاء هيئة التدريس
            </h2>

            {professors.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {professors.map((professor, index) => (
                  <motion.div
                    key={professor.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <Card className="overflow-hidden h-full hover-scale bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-md rounded-2xl">
                      <CardContent className="p-0">
                        <div className="relative w-full pt-[100%]">
                          <Image
                            src={professor.image || "/placeholder.svg"}
                            alt={professor.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="text-base font-bold mb-1 line-clamp-1">
                            {professor.name}
                          </h3>
                          <p className="text-primary text-xs mb-1">
                            {professor.title}
                          </p>
                          <p className="text-muted-foreground text-xs mb-3">
                            {professor.department}
                          </p>

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
            ) : (
              <div className="text-center py-12 glass-card rounded-2xl">
                <GraduationCap className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-bold mb-2">
                  لا يوجد أعضاء هيئة تدريس
                </h3>
                <p className="text-muted-foreground">
                  لم يتم العثور على أعضاء هيئة تدريس في هذا القسم
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Professor Details Dialog */}
      <Dialog
        open={!!selectedProfessor}
        onOpenChange={(open) => !open && setSelectedProfessor(null)}
      >
        <DialogContent className="max-w-3xl rounded-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {selectedProfessor?.name}
            </DialogTitle>
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
                      src={
                        selectedProfessor?.image ||
                        "/placeholder.svg?height=200&width=200"
                      }
                      alt={selectedProfessor?.name || "عضو هيئة تدريس"}
                      width={300}
                      height={300}
                      className="w-full h-auto object-cover"
                    />
                  </div>

                  <div className="mt-4 space-y-3 glass-card p-4 rounded-xl">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" />
                      <span className="text-xs">
                        {selectedProfessor?.email}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary" />
                      <span className="text-sm">
                        {selectedProfessor?.phone}
                      </span>
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
                    </TabsList>

                    <TabsContent
                      value="bio"
                      className="mt-4 glass-card p-4 rounded-xl"
                    >
                      <p>{selectedProfessor?.bio}</p>
                    </TabsContent>

                    <TabsContent
                      value="publications"
                      className="mt-4 glass-card p-4 rounded-xl"
                    >
                      <ul className="space-y-2">
                        {selectedProfessor?.publications.map(
                          (pub: string, index: number) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
                              <span>{pub}</span>
                            </li>
                          ),
                        )}
                      </ul>
                    </TabsContent>

                    <TabsContent
                      value="courses"
                      className="mt-4 glass-card p-4 rounded-xl"
                    >
                      <ul className="space-y-2">
                        {selectedProfessor?.courses.map(
                          (course: string, index: number) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
                              <span>{course}</span>
                            </li>
                          ),
                        )}
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
  );
}
