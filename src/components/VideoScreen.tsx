'use client'

import { useRef, useEffect } from 'react'
import type { Champion } from '@/data/champions'

interface VideoScreenProps {
  champion: Champion
  onHome: () => void
  onBack: () => void
}

/**
 * Full-screen video player in 9:16 vertical container.
 * Video autoplays. Home button on top-right (from /media/ui/home.PNG).
 * When video ends → goes back to gallery.
 */
export default function VideoScreen({ champion, onHome, onBack }: VideoScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [])

  const handleVideoEnd = () => {
    onBack()
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black">
      {/* Vertical kiosk container (9:16) */}
      <div
        className="relative h-full overflow-hidden"
        style={{ aspectRatio: '9/16', maxWidth: '100%', maxHeight: '100%' }}
      >
        {/* Full-screen video */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src={champion.video}
          playsInline
          autoPlay
          onEnded={handleVideoEnd}
        />

        {/* Home button — top-right */}
        <button
          onClick={onHome}
          className="absolute top-3 right-3 w-10 h-10 hover:scale-110 transition-transform duration-200 z-10"
          aria-label="На главную"
        >
          <img src="/media/ui/home.PNG" alt="Home" className="w-full h-full object-contain" />
        </button>

        {/* Back button — top-left (arrow left) */}
        <button
          onClick={onBack}
          className="absolute top-3 left-3 w-10 h-10 hover:scale-110 transition-transform duration-200 z-10"
          aria-label="Назад к галерее"
        >
          <img src="/media/ui/arrow-left.PNG" alt="Back" className="w-full h-full object-contain" />
        </button>
      </div>
    </div>
  )
}
