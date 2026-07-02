'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import type { KioskGroup, Champion } from '@/data/champions'
import { useEngineBridge } from '@/hooks/useEngineBridge'
import MainMenu from './MainMenu'
import GalleryScreen from './GalleryScreen'
import VideoScreen from './VideoScreen'

type Screen = 'idle' | 'menu' | 'gallery' | 'video'

const IDLE_TIMEOUT = 60000

interface KioskAppProps {
  group: KioskGroup
}

interface ScreenState {
  screen: Screen
  champion: Champion | null
}

/**
 * Crossfade approach: we keep TWO layers.
 * - "current" layer at opacity 1
 * - "next" layer fades in from opacity 0 to 1 on top
 * - Once fade completes, "next" becomes "current"
 */
export default function KioskApp({ group }: KioskAppProps) {
  const [current, setCurrent] = useState<ScreenState>({ screen: 'menu', champion: null })
  const [next, setNext] = useState<ScreenState | null>(null)
  const [showNext, setShowNext] = useState(false)
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const transitioning = useRef(false)

  // Smooth crossfade transition
  const transitionTo = useCallback((screen: Screen, champion: Champion | null = null) => {
    if (transitioning.current) return
    if (screen === current.screen && champion?.id === current.champion?.id) return
    transitioning.current = true
    setNext({ screen, champion })
    // Small delay to ensure the next layer is mounted before fading in
    requestAnimationFrame(() => {
      setShowNext(true)
    })
  }, [current])

  // When fade-in of next layer completes
  const handleTransitionEnd = useCallback(() => {
    if (next && showNext) {
      setCurrent(next)
      setNext(null)
      setShowNext(false)
      transitioning.current = false
    }
  }, [next, showNext])

  // --- Engine Bridge ---
  const { isConnected, sendScreenChanged, sendChampionSelected, sendVideoStarted } = useEngineBridge({
    onNavigate: (newScreen) => transitionTo(newScreen, newScreen === 'gallery' || newScreen === 'video' ? current.champion : null),
    onSelectChampion: (championId) => {
      const champion = group.champions.find(c => c.id === championId)
      if (champion) transitionTo('gallery', champion)
    },
    onPlayVideo: (championId) => {
      const champion = group.champions.find(c => c.id === championId)
      if (champion) transitionTo('video', champion)
    },
    onWakeUp: () => transitionTo('menu'),
    onGoIdle: () => transitionTo('idle'),
  })

  useEffect(() => {
    sendScreenChanged(current.screen)
  }, [current.screen, sendScreenChanged])

  // Idle timer
  const resetIdleTimer = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
    if (current.screen !== 'idle') {
      idleTimerRef.current = setTimeout(() => transitionTo('idle'), IDLE_TIMEOUT)
    }
  }, [current.screen, transitionTo])

  useEffect(() => {
    const handleInteraction = () => resetIdleTimer()
    window.addEventListener('touchstart', handleInteraction)
    window.addEventListener('mousedown', handleInteraction)
    window.addEventListener('keydown', handleInteraction)
    return () => {
      window.removeEventListener('touchstart', handleInteraction)
      window.removeEventListener('mousedown', handleInteraction)
      window.removeEventListener('keydown', handleInteraction)
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
    }
  }, [resetIdleTimer])

  useEffect(() => {
    if (current.screen !== 'idle') resetIdleTimer()
    return () => { if (idleTimerRef.current) clearTimeout(idleTimerRef.current) }
  }, [current.screen, resetIdleTimer])

  // Actions
  const handleSelectChampion = (champion: Champion) => {
    transitionTo('gallery', champion)
    sendChampionSelected(champion.id, champion.nameEn, champion.group)
  }
  const handleGoHome = () => transitionTo('menu')
  const handleWakeUp = () => transitionTo('menu')
  const handlePlayVideo = () => {
    const champ = next?.champion || current.champion
    if (champ) {
      transitionTo('video', champ)
      sendVideoStarted(champ.id)
    }
  }

  // Render a screen layer
  const renderScreen = (state: ScreenState) => {
    const { screen, champion } = state
    switch (screen) {
      case 'idle':
        return (
          <div className="absolute inset-0 cursor-pointer flex items-center justify-center bg-black" onClick={handleWakeUp}>
            <div className="relative h-full" style={{ aspectRatio: '9/16', maxWidth: '100%', maxHeight: '100%' }}>
              <video className="w-full h-full object-cover" src={group.idleVideo} loop muted playsInline autoPlay />
              <div className="absolute bottom-8 left-0 right-0 text-center text-white/40 animate-pulse">Touch to start</div>
            </div>
          </div>
        )
      case 'menu':
        return (
          <MainMenu
            group={group}
            onSelectChampion={handleSelectChampion}
            onToggleDemo={() => transitionTo('idle')}
            onQuit={() => transitionTo('idle')}
          />
        )
      case 'gallery':
        return champion ? (
          <GalleryScreen champion={champion} onHome={handleGoHome} onPlayVideo={handlePlayVideo} />
        ) : null
      case 'video':
        return champion ? (
          <VideoScreen champion={champion} onHome={handleGoHome} onBack={() => transitionTo('gallery', champion)} />
        ) : null
      default:
        return null
    }
  }

  return (
    <div className="kiosk-container">
      {/* Connection status indicator (dev) */}
      <div className={`fixed top-2 right-2 z-[9999] w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}
        title={isConnected ? 'UE5 Connected' : 'UE5 Disconnected'} />

      {/* Current layer — always visible */}
      <div className="absolute inset-0 z-0">
        {renderScreen(current)}
      </div>

      {/* Next layer — fades in on top, then becomes current */}
      {next && (
        <div
          className="absolute inset-0 z-10 transition-opacity duration-500 ease-in-out"
          style={{ opacity: showNext ? 1 : 0 }}
          onTransitionEnd={handleTransitionEnd}
        >
          {renderScreen(next)}
        </div>
      )}
    </div>
  )
}
