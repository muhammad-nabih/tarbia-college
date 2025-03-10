"use client"

import { useState, useEffect, useRef } from "react"
import ReactPlayer from "react-player/lazy"

interface VideoPlayerProps {
  url: string
}

export default function VideoPlayer({ url }: VideoPlayerProps) {
  const [isClient, setIsClient] = useState(false)
  const playerRef = useRef<ReactPlayer>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="aspect-video bg-muted flex items-center justify-center">
        <p>جاري تحميل الفيديو...</p>
      </div>
    )
  }

  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg">
      <ReactPlayer
        ref={playerRef}
        url={url}
        width="100%"
        height="100%"
        controls
        playing
        config={{
          file: {
            attributes: {
              controlsList: "nodownload",
            },
          },
        }}
      />
    </div>
  )
}

