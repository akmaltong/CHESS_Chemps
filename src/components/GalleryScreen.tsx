'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import type { Champion } from '@/data/champions'

interface GalleryScreenProps {
  champion: Champion
  onHome: () => void
  onPlayVideo: () => void
}

/**
 * Infinite circular carousel — slides smoothly in both directions without jumping.
 *
 * Technique: prepend last photo before first, append first photo after last.
 * When transition ends at clone, instantly jump (no transition) to the real slide.
 */
export default function GalleryScreen({ champion, onHome, onPlayVideo }: GalleryScreenProps) {
  const photos = champion.photos
  const total = photos.length

  // Extended array: [last, ...all, first] for infinite loop
  const extendedPhotos = [photos[total - 1], ...photos, photos[0]]

  // Start at index 1 (which is the real first photo)
  const [index, setIndex] = useState(1)
  const [transition, setTransition] = useState(true)
  const isJumping = useRef(false)

  // Touch/swipe handling
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const isSwiping = useRef(false)

  const goNext = useCallback(() => {
    if (isJumping.current) return
    setTransition(true)
    setIndex((i) => i + 1)
  }, [])

  const goPrev = useCallback(() => {
    if (isJumping.current) return
    setTransition(true)
    setIndex((i) => i - 1)
  }, [])

  // Handle infinite loop jump after transition ends
  const handleTransitionEnd = useCallback(() => {
    if (index === 0) {
      isJumping.current = true
      setTransition(false)
      setIndex(total)
      requestAnimationFrame(() => { isJumping.current = false })
    } else if (index === total + 1) {
      isJumping.current = true
      setTransition(false)
      setIndex(1)
      requestAnimationFrame(() => { isJumping.current = false })
    }
  }, [index, total])

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    isSwiping.current = true
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!isSwiping.current) return
    isSwiping.current = false
    const diff = touchStartX.current - touchEndX.current
    const threshold = 50
    if (diff > threshold) {
      goNext()
    } else if (diff < -threshold) {
      goPrev()
    }
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black">
      {/* Vertical kiosk container (9:16) */}
      <div
        className="relative h-full overflow-hidden"
        style={{ aspectRatio: '9/16', maxWidth: '100%', maxHeight: '100%' }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Carousel track */}
        <div
          className="absolute inset-0 flex h-full"
          style={{
            width: `${extendedPhotos.length * 100}%`,
            transform: `translateX(-${index * (100 / extendedPhotos.length)}%)`,
            transition: transition ? 'transform 0.4s ease-out' : 'none',
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedPhotos.map((photo, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 h-full"
              style={{ width: `${100 / extendedPhotos.length}%` }}
            >
              <img
                src={photo}
                alt={`${champion.nameEn} - photo`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Home button — top-right corner */}
        <button
          onClick={onHome}
          className="absolute top-3 right-3 w-10 h-10 hover:scale-110 transition-transform duration-200 z-10"
          aria-label="На главную"
        >
          <img src="/media/ui/home.PNG" alt="Home" className="w-full h-full object-contain" />
        </button>

        {/* Arrow Left */}
        <button
          onClick={goPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12
                     hover:scale-110 transition-transform duration-200 z-10"
          aria-label="Предыдущее фото"
        >
          <img src="/media/ui/arrow-left.PNG" alt="←" className="w-full h-full object-contain" />
        </button>

        {/* Arrow Right */}
        <button
          onClick={goNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12
                     hover:scale-110 transition-transform duration-200 z-10"
          aria-label="Следующее фото"
        >
          <img src="/media/ui/arrow-right.PNG" alt="→" className="w-full h-full object-contain" />
        </button>
      </div>
    </div>
  )
}
