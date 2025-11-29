import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { i18nConfig } from '@/config/i18n'

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

export async function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({
    lang: locale.code,
  }))
}

export default function LangLayout({ children, params }: LangLayoutProps) {
  return (
    <div className={inter.className}>
      {children}
    </div>
  )
}