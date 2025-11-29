import React from 'react'

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About Al-Asr
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Connecting cultures through multilingual content
          </p>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="mb-4">
              Al-Asr is a modern, multi-language news portal dedicated to providing 
              high-quality content across 10 different languages. We believe in breaking 
              down language barriers and making information accessible to everyone.
            </p>
            <p>
              Our platform combines cutting-edge technology with professional journalism 
              to deliver news, articles, and insights that matter to our diverse global audience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-3">🌍 Multi-language Support</h3>
              <p>Content available in English, Urdu, Arabic, Hindi, Farsi, Punjabi, Sindhi, Pashto, Turkish, and French.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-3">🚀 Modern Technology</h3>
              <p>Built with Next.js 14, WordPress headless CMS, and advanced caching for optimal performance.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-3">📱 Responsive Design</h3>
              <p>Perfect experience on all devices with PWA support and offline capabilities.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-3">🎨 Multiple Themes</h3>
              <p>Choose from Light, Dark, AMOLED, and Colorful themes for personalized reading.</p>
            </div>
          </div>

          <div className="bg-gradient-r from-blue-600 to-purple-700 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
            <p className="text-lg">
              To become the leading multi-language content platform that bridges cultural 
              gaps and provides a seamless reading experience for people around the world.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export const metadata = {
  title: 'About Us - Al-Asr',
  description: 'Learn about Al-Asr, our mission, and our commitment to multi-language content delivery.',
}
