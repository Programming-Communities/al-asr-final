import React from 'react'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <p className="lead">
              At Al-Asr, we take your privacy seriously. This Privacy Policy explains how we collect, 
              use, disclose, and safeguard your information when you use our website and services.
            </p>

            <h2>Information We Collect</h2>
            <p>
              We collect information that you provide directly to us, including when you create an account, 
              subscribe to our newsletter, or contact us for support. This may include:
            </p>
            <ul>
              <li>Personal identification information (Name, email address, etc.)</li>
              <li>Account preferences and settings</li>
              <li>Communication preferences</li>
              <li>Technical information about your device and browser</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Personalize your experience and content</li>
              <li>Communicate with you about updates and news</li>
              <li>Monitor and analyze trends and usage</li>
              <li>Protect against fraudulent or unauthorized use</li>
            </ul>

            <h2>Cookies and Tracking</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our service and 
              hold certain information. Cookies are files with a small amount of data which may include 
              an anonymous unique identifier.
            </p>

            <h2>Data Security</h2>
            <p>
              We implement appropriate technical and organizational security measures designed to 
              protect the security of any personal information we process. However, please note that 
              no electronic transmission over the Internet or information storage technology can be 
              guaranteed to be 100% secure.
            </p>

            <h2>Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access and receive a copy of your personal data</li>
              <li>Rectify or update your personal data</li>
              <li>Delete your personal data</li>
              <li>Restrict or object to our processing of your personal data</li>
              <li>Data portability</li>
            </ul>

            <h2>Changes to This Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes 
              by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:{' '}
              <a href="mailto:privacy@al-asr.com" className="text-blue-600 dark:text-blue-400">
                privacy@al-asr.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export const metadata = {
  title: 'Privacy Policy - Al-Asr',
  description: 'Learn how Al-Asr collects, uses, and protects your personal information.',
}
