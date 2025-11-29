'use client'

import React from 'react'
import Link from 'next/link'
import { useLanguage } from '@/hooks/useLanguage'
import { siteConfig } from '@/config/site'

const Footer: React.FC = () => {
  const { dir, locale } = useLanguage()
  const isRTL = dir === 'rtl'

  const footerSections = [
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Contact', href: '/contact' },
        { label: 'Careers', href: '/careers' },
        { label: 'Press', href: '/press' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Blog', href: '/posts' },
        { label: 'Documentation', href: '/docs' },
        { label: 'Support', href: '/support' },
        { label: 'API Status', href: '/status' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Cookie Policy', href: '/cookies' },
        { label: 'GDPR', href: '/gdpr' },
      ],
    },
    {
      title: 'Connect',
      links: [
        { label: 'Twitter', href: siteConfig.links.twitter },
        { label: 'GitHub', href: siteConfig.links.github },
        { label: 'LinkedIn', href: '#' },
        { label: 'Discord', href: '#' },
      ],
    },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">AA</span>
              </div>
              <span className="text-xl font-bold">{siteConfig.name}</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Building the future of digital content with innovative solutions and cutting-edge technology. 
              Join thousands of satisfied users worldwide.
            </p>
            <div className={`flex space-x-4 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
              {footerSections[3].links.slice(0, 3).map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{link.label}</span>
                  <div className="w-6 h-6">
                    {/* Social icons would go here */}
                    {link.label}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Footer links */}
          {footerSections.slice(0, 3).map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className={`border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center ${isRTL ? 'md:flex-row-reverse' : ''}`}>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className={`flex space-x-6 mt-4 md:mt-0 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
              Privacy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
              Terms
            </Link>
            <Link href="/sitemap" className="text-gray-400 hover:text-white transition-colors text-sm">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
