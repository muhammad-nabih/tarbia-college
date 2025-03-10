"use client"

import { useEffect, useRef, useState } from "react"
import Script from "next/script"

interface PanoramaViewerProps {
  imageUrl: string
}

export default function PanoramaViewer({ imageUrl }: PanoramaViewerProps) {
  const viewerRef = useRef<HTMLDivElement>(null)
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)
  const [viewerInitialized, setViewerInitialized] = useState(false)

  // Initialize the viewer after the script is loaded and the component is mounted
  useEffect(() => {
    if (isScriptLoaded && viewerRef.current && imageUrl && !viewerInitialized) {
      // Access the global pannellum object
      const pannellum = (window as any).pannellum

      if (pannellum && pannellum.viewer) {
        const viewer = pannellum.viewer(viewerRef.current, {
          type: "equirectangular",
          panorama: imageUrl,
          autoLoad: true,
          autoRotate: -2,
          compass: false,
          showControls: true,
          showFullscreenCtrl: true,
          showZoomCtrl: true,
          hfov: 100,
          minHfov: 50,
          maxHfov: 120,
        })

        setViewerInitialized(true)

        // Clean up on unmount
        return () => {
          if (viewer && typeof viewer.destroy === "function") {
            viewer.destroy()
          }
        }
      }
    }
  }, [imageUrl, isScriptLoaded, viewerInitialized])

  return (
    <>
      {/* Load Pannellum scripts and CSS */}
      <Script
        src="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js"
        onLoad={() => setIsScriptLoaded(true)}
      />
      <Script src="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css" strategy="beforeInteractive" />

      <div ref={viewerRef} className="w-full h-full rounded-lg overflow-hidden" style={{ background: "#f1f1f1" }}>
        {!isScriptLoaded && (
          <div className="flex items-center justify-center h-full">
            <p>جاري تحميل العارض...</p>
          </div>
        )}
      </div>
    </>
  )
}

