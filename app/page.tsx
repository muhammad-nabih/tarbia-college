"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Play, ChevronRight, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card} from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import VideoPlayer from "@/components/video-player"
import facultyData from "@/lib/faculty-data.json"

export default function Home() {
  const [videoOpen, setVideoOpen] = useState(false)
  const departments = facultyData.departments || []

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Video */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-gradient-to-b from-background to-secondary/20">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {departments.slice(0, 4).map((dept, index) => (
              <motion.div
                key={dept.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >

                <Link href={`/departments/${dept.id}`}>
                  <Card
                    className={` ${dept.color} rounded-2xl p-8 text-center h-full transition-all shadow-sm hover:shadow-md hover-scale`}
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
