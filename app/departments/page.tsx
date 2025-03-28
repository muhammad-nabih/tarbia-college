"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, School, Laptop, Baby, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import professorsData from "@/lib/professors-data.json";
import SectionTitle from "@/components/section-title";

// Map department IDs to icons
const departmentIcons: Record<string, any> = {
  technology: Laptop,
  osool: School,
  manahej: BookOpen,
  psychology: Brain,
  kindergarten: Baby,
};

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<any[]>([]);

  useEffect(() => {
    // Load departments from JSON
    setDepartments(professorsData.departments);
  }, []);

  return (
    <div className="pt-24 pb-16">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto">
          <SectionTitle
            title="أقسام التدريس"
            description="تعرف على جميع أقسام التدريس في الكلية، واكتشف تخصصاتهم المختلفة ومساهماتهم الأكاديمية."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {departments.map((dept, index) => {
              const Icon = departmentIcons[dept.id] || School;

              return (
                <motion.div
                  key={dept.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`${dept.color.bg} rounded-2xl p-6 shadow-md hover:shadow-lg transition-all cursor-pointer hover-scale`}
                >
                  <div className="flex items-center mb-4 gap-2">
                    <div className="bg-white/80 dark:bg-gray-800/80 p-3 rounded-full mr-4 shadow-sm">
                      <Icon className="h-8 w-8 text-primary " />
                    </div>
                    <h2 className="text-xl font-bold">{dept.name}</h2>
                  </div>
                  <p className="text-popover-foreground mb-4">
                    {dept.description}
                  </p>
                  <Button
                    variant="secondary"
                    className="w-full rounded-xl"
                    asChild
                  >
                    <Link href={`/departments/${dept.id}`}>عرض التفاصيل</Link>
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
