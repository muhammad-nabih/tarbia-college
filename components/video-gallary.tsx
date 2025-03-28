"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/section-title";

// بيانات الفيديوهات مع العناوين والوصف
const videos = [
  {
    id: "main",
    url: "/videos/المبني-الرئيسي.mp4",
    title: "المبنى الرئيسي",
    description:
      "المبنى الرئيسي للكلية يضم الإدارة والقاعات الرئيسية والمرافق العامة المجهزة بأحدث التقنيات",
    thumbnail: "/placeholder.svg?height=720&width=1280", // استبدل بمسار الصورة المصغرة الفعلية
  },
  {
    id: "halls",
    url: "/videos/مبني-القاعات.mp4",
    title: "مبنى القاعات",
    description:
      "قاعات دراسية متطورة مجهزة بأحدث وسائل التعليم التفاعلي والتقنيات الحديثة",
    thumbnail: "/placeholder.svg?height=720&width=1280", // استبدل بمسار الصورة المصغرة الفعلية
  },
  {
    id: "auditoriums",
    url: "/videos/مبني-المدرجات.mp4",
    title: "مبنى المدرجات",
    description:
      "مدرجات واسعة مصممة بشكل عصري لاستيعاب أعداد كبيرة من الطلاب وتوفير بيئة تعليمية مثالية",
    thumbnail: "/placeholder.svg?height=720&width=1280", // استبدل بمسار الصورة المصغرة الفعلية
  },
  {
    id: "workshops",
    url: "/videos/مبني-الورش.mp4",
    title: "مبنى الورش",
    description:
      "ورش عملية متخصصة مجهزة بأحدث المعدات والأدوات لتطبيق المهارات العملية وتنمية الخبرات",
    thumbnail: "/placeholder.svg?height=720&width=1280", // استبدل بمسار الصورة المصغرة الفعلية
  },
];

export default function VideosGallery() {
  const [selectedVideo, setSelectedVideo] = useState<(typeof videos)[0] | null>(
    null,
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoClick = (video: (typeof videos)[0]) => {
    setSelectedVideo(video);
    setIsPlaying(false); // إعادة تعيين حالة التشغيل عند اختيار فيديو جديد
  };

  const closeModal = () => {
    setSelectedVideo(null);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const navigateVideo = (direction: "next" | "prev") => {
    if (!selectedVideo) return;

    const currentIndex = videos.findIndex((v) => v.id === selectedVideo.id);
    let newIndex;

    if (direction === "next") {
      newIndex = (currentIndex + 1) % videos.length;
    } else {
      newIndex = (currentIndex - 1 + videos.length) % videos.length;
    }

    setSelectedVideo(videos[newIndex]);
    setIsPlaying(false);
  };

  // تأثيرات الحركة
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
    hover: {
      y: -15,
      scale: 1.03,
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
      },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="py-20 px-4 md:px-6 bg-gradient-to-b from-background via-background to-muted/20 dark:from-background dark:via-background/95 dark:to-background/90 min-h-screen">
      <div className="container mx-auto max-w-7xl">
        {/* عنوان القسم */}
        <SectionTitle
          title="الورش والمباني"
          description="ورش عملية متخصصة مجهزة بأحدث المعدات والأدوات لتطبيق المهارات العملية وتنمية الخبرات"
        />

        {/* معرض الفيديوهات */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {videos.map((video) => (
            <motion.div
              key={video.id}
              variants={cardVariants}
              whileHover="hover"
              onClick={() => handleVideoClick(video)}
              className="cursor-pointer"
            >
              <Card className="overflow-hidden rounded-2xl border-0 shadow-lg h-full">
                <div className="relative aspect-video">
                  <Image
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-white/20 backdrop-blur-sm p-5 rounded-full"
                    >
                      <Play className="h-10 w-10 text-white" />
                    </motion.div>
                  </div>
                </div>
                <div className="p-6 bg-card">
                  <h3 className="text-2xl font-bold mb-2 text-foreground">
                    {video.title}
                  </h3>
                  <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 mb-4 rounded-full" />
                  <p className="text-muted-foreground">{video.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* نافذة الفيديو المنبثقة */}
        <AnimatePresence>
          {selectedVideo && (
            <>
              <motion.div
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                onClick={closeModal}
              />
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-card rounded-2xl overflow-hidden shadow-2xl w-full max-w-5xl">
                  <div className="relative">
                    <div className="aspect-video bg-black relative">
                      <video
                        ref={videoRef}
                        src={selectedVideo.url}
                        className="w-full h-full object-contain"
                        poster={selectedVideo.thumbnail}
                        onEnded={() => setIsPlaying(false)}
                        onClick={togglePlay}
                      />

                      {/* تراكب التحكم في الفيديو */}
                      <div className="absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-b from-black/50 via-transparent to-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <div className="flex justify-between">
                          <h3 className="text-white text-xl font-bold">
                            {selectedVideo.title}
                          </h3>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={closeModal}
                            className="text-white hover:text-red-500 transition-colors"
                          >
                            <X className="h-6 w-6" />
                          </motion.button>
                        </div>

                        <div className="flex justify-center gap-4">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => navigateVideo("prev")}
                            className="bg-white/20 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/30 transition-colors"
                          >
                            <ChevronLeft className="h-6 w-6" />
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={togglePlay}
                            className="bg-white/20 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/30 transition-colors"
                          >
                            {isPlaying ? (
                              <Pause className="h-6 w-6" />
                            ) : (
                              <Play className="h-6 w-6" />
                            )}
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => navigateVideo("next")}
                            className="bg-white/20 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/30 transition-colors"
                          >
                            <ChevronRight className="h-6 w-6" />
                          </motion.button>
                        </div>

                        <div className="flex justify-between items-center">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={toggleMute}
                            className="bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/30 transition-colors"
                          >
                            {isMuted ? (
                              <VolumeX className="h-5 w-5" />
                            ) : (
                              <Volume2 className="h-5 w-5" />
                            )}
                          </motion.button>

                          <p className="text-white text-sm">
                            {selectedVideo.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex justify-between items-center">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">
                        {selectedVideo.title}
                      </h3>
                      <p className="text-muted-foreground mt-1">
                        {selectedVideo.description}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={closeModal}
                        className="rounded-full"
                      >
                        <X className="h-4 w-4" />
                      </Button>

                      <Button
                        onClick={togglePlay}
                        className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        {isPlaying ? "إيقاف" : "تشغيل"}
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
