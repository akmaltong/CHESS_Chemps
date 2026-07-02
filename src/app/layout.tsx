import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Чемпионы мира по шахматам',
  description: 'Интерактивная галерея чемпионов мира по шахматам — Киоск',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Dela+Gothic+One&family=Roboto:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className="bg-[#0a0a0f] text-white font-body antialiased overflow-hidden">
        {children}
      </body>
    </html>
  )
}
