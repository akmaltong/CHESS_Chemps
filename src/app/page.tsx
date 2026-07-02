'use client'

import Link from 'next/link'
import { kioskGroups } from '@/data/champions'

/**
 * Главная страница — выбор киоска (группы).
 * На реальных стойках каждая будет открывать свой URL напрямую:
 * /kiosk/1, /kiosk/2, /kiosk/3
 */
export default function Home() {
  return (
    <div className="kiosk-container items-center justify-center bg-gradient-to-b from-[#0a0a0f] via-[#0f1a2e] to-[#0a0a0f]">
      <h1 className="font-heading text-4xl md:text-6xl text-gradient mb-4 text-center px-4">
        Чемпионы мира по шахматам
      </h1>
      <p className="text-white/50 text-lg mb-12 text-center">
        Выберите стойку (группу)
      </p>

      <div className="flex flex-col gap-6 px-8 w-full max-w-md">
        {kioskGroups.map((group) => (
          <Link
            key={group.id}
            href={`/kiosk/${group.id}`}
            className="glass-card rounded-2xl p-8 text-center transition-all duration-300 hover:glow-gold active:scale-95"
          >
            <div className="font-heading text-2xl text-[#c8a960] mb-2">
              Стойка {group.id}
            </div>
            <div className="text-xl text-white/90 mb-1">{group.title}</div>
            <div className="text-sm text-white/50">{group.period}</div>
            <div className="text-sm text-white/40 mt-2">
              {group.champions.length} чемпионов
            </div>
          </Link>
        ))}
      </div>

      <p className="absolute bottom-8 text-white/30 text-sm text-center px-4">
        На реальных стойках откройте напрямую: /kiosk/1, /kiosk/2, /kiosk/3
      </p>
    </div>
  )
}
