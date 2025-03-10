"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Play, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import VideoPlayer from "@/components/video-player"
import { departments } from "@/lib/data"

export default function Home() {
  const [videoOpen, setVideoOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Video */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center max-w-4xl mx-auto"
          >
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">مرحباً بك في كلية التربية</h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
              تعرف على واحدة من أعرق كليات التربية في المنطقة، حيث نقدم تعليماً متميزاً ونخرج أجيالاً من المعلمين المؤهلين
            </p>

            <div className="relative w-full max-w-4xl aspect-video rounded-xl overflow-hidden shadow-xl mb-8">
              <Image
                src="/placeholder.svg?height=720&width=1280"
                alt="كلية التربية"
                width={1280}
                height={720}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <Button
                  size="lg"
                  className="rounded-full w-16 h-16 flex items-center justify-center"
                  onClick={() => setVideoOpen(true)}
                >
                  <Play className="h-8 w-8" />
                </Button>
              </div>
            </div>

            <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
              <DialogContent className="max-w-4xl p-1 sm:p-2">
                <VideoPlayer url="/placeholder-video.mp4" />
              </DialogContent>
            </Dialog>

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button size="lg" asChild>
                <Link href="/departments">تعرف على الأقسام الأكاديمية</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/buildings">استكشف مباني الكلية</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Departments Preview */}
      <section className="py-12 md:py-16 bg-secondary/50">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">أقسام الكلية</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              تضم كلية التربية مجموعة متنوعة من الأقسام الأكاديمية التي تغطي مختلف مجالات التربية والتعليم
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {departments.slice(0, 4).map((dept, index) => (
              <motion.div
                key={dept.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/departments/${dept.id}`}>
                  <div
                    className={`${dept.color} rounded-xl p-8 text-center h-full transition-all shadow-sm hover:shadow-md`}
                  >
                    <h3 className="text-xl font-bold mb-2">{dept.name}</h3>
                    <div className="flex justify-center mt-4">
                      <ChevronRight className="h-6 w-6" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button asChild>
              <Link href="/departments">عرض جميع الأقسام</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Buildings Preview */}
      <section className="py-12 md:py-16">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">المباني الأكاديمية والورش العملية</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              تعرف على مرافق الكلية المتطورة من قاعات دراسية وورش عملية ومعامل مجهزة بأحدث التقنيات
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-xl overflow-hidden shadow-lg"
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
              <div className="p-4 bg-white">
                <h3 className="text-xl font-bold mb-2">المباني الأكاديمية</h3>
                <p className="text-muted-foreground mb-4">قاعات دراسية مجهزة بأحدث التقنيات التعليمية</p>
                <Button asChild>
                  <Link href="/buildings/academic">رؤية المزيد</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-xl overflow-hidden shadow-lg"
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
              <div className="p-4 bg-white">
                <h3 className="text-xl font-bold mb-2">الورش العملية</h3>
                <p className="text-muted-foreground mb-4">ورش عملية متخصصة لتطبيق المهارات العملية</p>
                <Button asChild>
                  <Link href="/buildings/workshops">رؤية المزيد</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
