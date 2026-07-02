'use client'

import { useRef, useEffect } from 'react'

interface IdleScreenProps {
  videoSrc: string
  onWakeUp: () => void
}

/**
 * Экран простоя — показывает зацикленное видео.
 * Любое касание переводит на главное меню.
 */
export default function IdleScreen({ videoSrc, onWakeUp }: IdleScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [])

  return (
    <div
      className="absolute inset-0 z-50 cursor-pointer"
      onClick={onWakeUp}
      onTouchStart={onWakeUp}
    >
      {/* Fullscreen idle video */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src={videoSrc}
        loop
        muted
        playsInline
        autoPlay
      />

      {/* Touch hint overlay */}
      <div className="absolute inset-0 flex items-end justify-center pb-16 pointer-events-none">
        <div className="animate-pulse text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-white/30 flex items-center justify-center">
            <svg className="w-8 h-8 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
            </svg>
          </div>
          <p className="text-white/40 text-lg font-light">Коснитесь экрана</p>
        </div>
      </div>
    </div>
  )
}
