import { kioskGroups } from '@/data/champions'
import KioskApp from '@/components/KioskApp'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function KioskPage({ params }: PageProps) {
  const { id } = await params
  const groupId = parseInt(id) as 1 | 2 | 3
  const group = kioskGroups.find((g) => g.id === groupId)

  if (!group) {
    return (
      <div className="kiosk-container items-center justify-center">
        <p className="text-white/50 text-xl">Группа не найдена</p>
      </div>
    )
  }

  return <KioskApp group={group} />
}

export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }]
}
