"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Building, Wrench, EyeIcon as Eye360 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import dynamic from "next/dynamic"
import facultyData from "@/lib/faculty-data.json"
import { ScrollArea } from "@/components/ui/scroll-area"

// Use dynamic import for the PanoramaViewer to ensure it only loads on the client side
const PanoramaViewer = dynamic(() => import("@/components/panorama-viewer"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-muted rounded-xl">
      <p>جاري تحميل العارض...</p>
    </div>
  ),
})

export default function BuildingsPage() {
  const [activeTab, setActiveTab] = useState("academic")
  const [selectedBuilding, setSelectedBuilding] = useState<any>(null)
  const [showPanorama, setShowPanorama] = useState(false)
  const [buildings, setBuildings] = useState<any>({ academic: [], workshops: [] })

  useEffect(() => {
    // Load buildings from JSON
    setBuildings(facultyData.buildings)
  }, [])

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
          <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 dark:from-primary dark:to-blue-400">
            المباني الأكاديمية والورش العملية
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            تعرف على مرافق الكلية المتطورة من قاعات دراسية وورش عملية ومعامل مجهزة بأحدث التقنيات
          </p>
        </motion.div>

        <Tabs defaultValue="academic" value={activeTab} onValueChange={setActiveTab} className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8 rounded-xl bg-secondary/50 p-1">
            <TabsTrigger
              value="academic"
              className="rounded-lg flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800"
            >
              <Building className="h-5 w-5" />
              <span>المباني الأكاديمية</span>
            </TabsTrigger>
            <TabsTrigger
              value="workshops"
              className="rounded-lg flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800"
            >
              <Wrench className="h-5 w-5" />
              <span>الورش العملية</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="academic" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {buildings.academic.map((building: any, index: number) => (
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
              {buildings.workshops.map((building: any, index: number) => (
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
        <DialogContent className="max-w-3xl rounded-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedBuilding?.name}</DialogTitle>
          </DialogHeader>

<ScrollArea className="h-[75vh]">
<div className="mt-4">
            <div className="rounded-xl overflow-hidden mb-4 shadow-md">
              <Image
                src={selectedBuilding?.image || "/placeholder.svg?height=720&width=1280"}
                alt={selectedBuilding?.name || "مبنى"}
                width={820}
                height={420}
                className="w-full h-auto object-cover"
              />
            </div>

            <p className="text-muted-foreground mb-6 glass-card p-4 rounded-xl">{selectedBuilding?.description}</p>

            <h3 className="text-xl font-bold mb-3">المميزات</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6 glass-card p-4 rounded-xl">
              {selectedBuilding?.features.map((feature: string, index: number) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>


          </div>
</ScrollArea>
<div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  setShowPanorama(true)
                }}
                className="flex items-center gap-2 rounded-xl"
              >
                <Eye360 className="h-5 w-5" />
                <span>عرض صورة 360°</span>
              </Button>

              <DialogClose asChild>
                <Button className="rounded-xl">إغلاق</Button>
              </DialogClose>
            </div>
        </DialogContent>
      </Dialog>

      {/* Panorama Dialog */}
      <Dialog open={showPanorama} onOpenChange={(open) => !open && setShowPanorama(false)}>
        <DialogContent className="max-w-5xl p-4 rounded-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedBuilding?.name} - عرض 360°</DialogTitle>
          </DialogHeader>

          <div className="mt-4 h-[70vh] rounded-xl overflow-hidden">
            <PanoramaViewer imageUrl={selectedBuilding?.panorama} />
          </div>

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
      className="glass-card rounded-2xl overflow-hidden shadow-md hover-scale"
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
          className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm rounded-xl dark:bg-gray-800/80"
          onClick={onViewPanorama}
        >
          <Eye360 className="h-4 w-4 mr-1" />
          <span>عرض 360°</span>
        </Button>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{building.name}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-2 min-h-[60px] ">{building.description}</p>
        <Button onClick={onSelect} className="w-full rounded-xl">
          عرض التفاصيل
        </Button>
      </div>
    </motion.div>
  )
}
