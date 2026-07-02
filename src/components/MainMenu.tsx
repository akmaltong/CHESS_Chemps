'use client'

import type { KioskGroup, Champion } from '@/data/champions'

interface MainMenuProps {
  group: KioskGroup
  onSelectChampion: (champion: Champion) => void
  onToggleDemo?: () => void
  onQuit?: () => void
}

/**
 * Layout replicates UE5 WBP_Main_Menu_G1.
 *
 * The original widget is a VERTICAL (portrait) canvas (~1080x1920).
 * The background (stella image) contains all champion photos and names.
 * Over each champion's area there is an INVISIBLE button (full zone).
 * Inside each zone there's a small visible "Биография" label.
 *
 * Touching/clicking anywhere in the champion's zone triggers the action.
 *
 * Anchor positions from UE5 CanvasPanel:
 * - Capablanca: (47%-98% x, 4%-31% y)
 * - Steinitz:   (3%-45% x, 16%-47% y)
 * - Alekhine:   (57%-100% x, 33%-62% y)
 * - Euwe:       (1%-38% x, 49%-82% y)
 * - Lasker:     (40%-85% x, 63%-98% y)
 */

// Zone positions per group (from UE5 CanvasPanel anchors)
const GROUP_ZONE_POSITIONS: Record<number, Record<string, { left: string; top: string; width: string; height: string }>> = {
  // Group 1 (5 champions): zigzag pattern
  1: {
    capablanca: { left: '47%', top: '4%',  width: '51%', height: '27%' },
    steinitz:   { left: '3%',  top: '16%', width: '42%', height: '31%' },
    alekhine:   { left: '57%', top: '33%', width: '43%', height: '29%' },
    euwe:       { left: '1%',  top: '49%', width: '37%', height: '33%' },
    lasker:     { left: '40%', top: '63%', width: '45%', height: '35%' },
  },
  // Group 2 (6 champions): 3 rows × 2 columns
  2: {
    petrosian:  { left: '2%',  top: '3%',  width: '45%', height: '30%' },
    botvinnik:  { left: '48%', top: '0%',  width: '50%', height: '27%' },
    spassky:    { left: '2%',  top: '33%', width: '53%', height: '30%' },
    fisher:     { left: '58%', top: '29%', width: '41%', height: '28%' },
    smyslov:    { left: '2%',  top: '63%', width: '42%', height: '25%' },
    tal:        { left: '49%', top: '63%', width: '47%', height: '27%' },
  },
  // Group 3 (6 champions): from UE5 WBP_Main_Menu_G3 stella
  // Liren=top-left, Karpov=top-right, Anand=mid-left, Carlsen=mid-right, Kasparov=bot-left, Kramnik=bot-right
  3: {
    liren:      { left: '2%',  top: '3%',  width: '38%', height: '26%' },
    karpov:     { left: '47%', top: '3%',  width: '47%', height: '29%' },
    anand:      { left: '3%',  top: '32%', width: '40%', height: '30%' },
    carlsen:    { left: '54%', top: '33%', width: '42%', height: '34%' },
    kasparov:   { left: '1%',  top: '63%', width: '46%', height: '26%' },
    kramnik:    { left: '49%', top: '68%', width: '48%', height: '28%' },
  },
}

export default function MainMenu({ group, onSelectChampion, onToggleDemo, onQuit }: MainMenuProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black">
      {/* Vertical kiosk container (9:16 aspect ratio) */}
      <div
        className="relative h-full"
        style={{ aspectRatio: '9/16', maxWidth: '100%', maxHeight: '100%' }}
      >
        {/* Background stella image — contains all champion photos and names */}
        <img
          src={group.stella}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Invisible touch zones covering each champion's area */}
        {group.champions.map((champion) => {
          const zonePositions = GROUP_ZONE_POSITIONS[group.id] || {}
          const zone = zonePositions[champion.id]
          if (!zone) return null

          return (
            <button
              key={champion.id}
              className="absolute border-0 bg-transparent p-0 cursor-pointer
                         transition-colors duration-200 rounded-sm"
              style={{
                left: zone.left,
                top: zone.top,
                width: zone.width,
                height: zone.height,
              }}
              onClick={() => onSelectChampion(champion)}
              aria-label={`Биография: ${champion.nameEn}`}
            />
          )
        })}

        {/* DEMO mode toggle (CheckBox_0) — top-right corner */}
        <button
          className="absolute top-0 right-0 w-[5%] h-[3%] bg-transparent border-0 cursor-pointer"
          aria-label="Toggle DEMO mode"
          onClick={() => onToggleDemo?.()}
        />

        {/* Quit button (Button_61) — top-left corner */}
        <button
          className="absolute top-0 left-0 w-[5%] h-[3%] bg-transparent border-0 cursor-pointer"
          aria-label="Выход из игры"
          onClick={() => onQuit?.()}
        />
      </div>
    </div>
  )
}
