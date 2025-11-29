import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Al-Asr - Multi-language News Portal',
  description: 'Professional news portal with multi-language support',
}

interface LangLayoutProps {
  children: React.ReactNode
  params: {
    lang: string
  }
}

export default function LangLayout({ children, params }: LangLayoutProps) {
  return (
    <div className={inter.className}>
      {children}
    </div>
  )
}