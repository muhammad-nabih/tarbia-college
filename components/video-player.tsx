"use client";

import { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player/lazy";

interface VideoPlayerProps {
  url: string;
  onClose?: () => void;
}

export default function VideoPlayer({ url, onClose }: VideoPlayerProps) {
  const [isClient, setIsClient] = useState(false);
  const playerRef = useRef<ReactPlayer>(null);

  useEffect(() => {
    setIsClient(true);

    // Cleanup function to stop video when component unmounts
    return () => {
      if (playerRef.current) {
        // Force stop and release any resources
        playerRef.current.seekTo(0);
      }

      // Call onClose callback if provided
      onClose?.();
    };
  }, [onClose]);

  if (!isClient) {
    return (
      <div className="aspect-video bg-muted flex items-center justify-center">
        <p>جاري تحميل الفيديو...</p>
      </div>
    );
  }

  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg">
      <ReactPlayer
        ref={playerRef}
        url={url}
        width="100%"
        height="100%"
        controls
        playing={true}
        config={{
          file: {
            attributes: {
              controlsList: "nodownload",
            },
            forceVideo: true,
          },
        }}
        onError={(e) => {
          console.error("Video player error:", e);
        }}
        onEnded={() => {
          // Optional: handle video end
          onClose?.();
        }}
      />
    </div>
  );
}
