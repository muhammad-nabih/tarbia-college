"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Building, Wrench, EyeIcon as Eye360 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import dynamic from "next/dynamic"
import { buildings } from "@/lib/data"

// Use dynamic import for the PanoramaViewer to ensure it only loads on the client side
const PanoramaViewer = dynamic(() => import("@/components/panorama-viewer"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-muted">
      <p>جاري تحميل العارض...</p>
    </div>
  ),
})

// Sample data - in a real app, this would come from an API or database
// const buildings = {
//   academic: [
//     {
//       id: "main-building",
//       name: "المبنى الرئيسي",
//       description: "المبنى الرئيسي للكلية ويضم مكاتب الإدارة وقاعات المحاضرات الرئيسية",
//       image: "/placeholder.svg?height=720&width=1280",
//       panorama: "/placeholder.svg?height=2000&width=4000",
//       features: ["قاعات محاضرات مجهزة", "مكاتب إدارية", "قاعة مؤتمرات", "مكتبة"],
//     },
//     {
//       id: "lecture-halls",
//       name: "مبنى قاعات المحاضرات",
//       description: "مبنى مخصص لقاعات المحاضرات والسكاشن العملية",
//       image: "/placeholder.svg?height=720&width=1280",
//       panorama: "/placeholder.svg?height=2000&width=4000",
//       features: ["قاعات دراسية متعددة", "معامل حاسب آلي", "قاعات سمنار", "استراحات للطلاب"],
//     },
//   ],
//   workshops: [
//     {
//       id: "tech-workshop",
//       name: "ورشة التكنولوجيا التعليمية",
//       description: "ورشة متخصصة في إنتاج وتطوير الوسائل التعليمية التكنولوجية",
//       image: "/placeholder.svg?height=720&width=1280",
//       panorama: "/placeholder.svg?height=2000&width=4000",
//       features: ["معدات إنتاج فيديو", "استوديو تسجيل", "أجهزة عرض متطورة", "معدات تصميم تعليمي"],
//     },
//     {
//       id: "science-lab",
//       name: "معمل العلوم التربوية",
//       description: "معمل متخصص للتجارب العلمية التربوية والبحوث التطبيقية",
//       image: "/placeholder.svg?height=720&width=1280",
//       panorama: "/placeholder.svg?height=2000&width=4000",
//       features: ["أجهزة قياس متطورة", "معدات بحثية", "مساحات للتجارب العملية", "أدوات تحليل بيانات"],
//     },
//   ],
// }

export default function BuildingsPage() {
  const [activeTab, setActiveTab] = useState("academic")
  const [selectedBuilding, setSelectedBuilding] = useState<any>(null)
  const [showPanorama, setShowPanorama] = useState(false)

  const buildingsToShow = activeTab === "academic" ? buildings.academic : buildings.workshops

  return (
    <div className="pt-24 pb-16">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4">المباني الأكاديمية والورش العملية</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            تعرف على مرافق الكلية المتطورة من قاعات دراسية وورش عملية ومعامل مجهزة بأحدث التقنيات
          </p>
        </motion.div>

        <Tabs defaultValue="academic" value={activeTab} onValueChange={setActiveTab} className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="academic" className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              <span>المباني الأكاديمية</span>
            </TabsTrigger>
            <TabsTrigger value="workshops" className="flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              <span>الورش العملية</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="academic" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {buildings.academic.map((building, index) => (
                <BuildingCard
                  key={building.id}
                  building={building}
                  index={index}
                  onSelect={() => setSelectedBuilding(building)}
                  onViewPanorama={() => {
                    setSelectedBuilding(building)
                    setShowPanorama(true)
                  }}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="workshops" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {buildings.workshops.map((building, index) => (
                <BuildingCard
                  key={building.id}
                  building={building}
                  index={index}
                  onSelect={() => setSelectedBuilding(building)}
                  onViewPanorama={() => {
                    setSelectedBuilding(building)
                    setShowPanorama(true)
                  }}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Building Details Dialog */}
      <Dialog open={!!selectedBuilding && !showPanorama} onOpenChange={(open) => !open && setSelectedBuilding(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedBuilding?.name}</DialogTitle>
          </DialogHeader>

          <div className="mt-4">
            <div className="rounded-lg overflow-hidden mb-4">
              <Image
                src={selectedBuilding?.image || "/placeholder.svg?height=720&width=1280"}
                alt={selectedBuilding?.name || "مبنى"}
                width={1280}
                height={720}
                className="w-full h-auto object-cover"
              />
            </div>

            <p className="text-muted-foreground mb-6">{selectedBuilding?.description}</p>

            <h3 className="text-xl font-bold mb-3">المميزات</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
              {selectedBuilding?.features.map((feature: string) => (
                <li key={feature} className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  setShowPanorama(true)
                }}
                className="flex items-center gap-2"
              >
                <Eye360 className="h-5 w-5" />
                <span>عرض صورة 360°</span>
              </Button>

              <DialogClose asChild>
                <Button>إغلاق</Button>
              </DialogClose>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Panorama Dialog */}
      <Dialog open={showPanorama} onOpenChange={(open) => !open && setShowPanorama(false)}>
        <DialogContent className="max-w-5xl p-4">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedBuilding?.name} - عرض 360°</DialogTitle>
          </DialogHeader>

          <div className="mt-4 h-[70vh]">
            <PanoramaViewer imageUrl={selectedBuilding?.panorama} />
          </div>

          <div className="flex justify-end mt-4">
            <DialogClose asChild>
              <Button>إغلاق</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

interface BuildingCardProps {
  building: any
  index: number
  onSelect: () => void
  onViewPanorama: () => void
}

function BuildingCard({ building, index, onSelect, onViewPanorama }: BuildingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-xl overflow-hidden shadow-lg"
    >
      <div className="relative aspect-video">
        <Image
          src={building.image || "/placeholder.svg"}
          alt={building.name}
          width={640}
          height={360}
          className="w-full h-full object-cover"
        />
        <Button
          variant="secondary"
          size="sm"
          className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm"
          onClick={onViewPanorama}
        >
          <Eye360 className="h-4 w-4 mr-1" />
          <span>عرض 360°</span>
        </Button>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{building.name}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-2">{building.description}</p>
        <Button onClick={onSelect} className="w-full">
          عرض التفاصيل
        </Button>
      </div>
    </motion.div>
  )
}

