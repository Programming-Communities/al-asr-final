import React from 'react'

export default function TermsPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <p className="lead">
              Please read these Terms of Service carefully before using the Al-Asr website 
              and services operated by us.
            </p>

            <h2>Acceptance of Terms</h2>
            <p>
              By accessing and using this website, you accept and agree to be bound by the terms 
              and provision of this agreement. If you do not agree to abide by the above, please 
              do not use this service.
            </p>

            <h2>Use License</h2>
            <p>
              Permission is granted to temporarily access the materials (information or software) 
              on Al-Asr's website for personal, non-commercial transitory viewing only.
            </p>

            <h2>User Accounts</h2>
            <p>
              When you create an account with us, you must provide accurate, complete, and current 
              information. You are responsible for safeguarding the password and for all activities 
              that occur under your account.
            </p>

            <h2>Content</h2>
            <p>
              Our Service allows you to post, link, store, share and otherwise make available certain 
              information, text, graphics, videos, or other material. You are responsible for the 
              content that you post on or through the Service.
            </p>

            <h2>Intellectual Property</h2>
            <p>
              The Service and its original content, features, and functionality are and will remain 
              the exclusive property of Al-Asr and its licensors. The Service is protected by copyright, 
              trademark, and other laws of both the United States and foreign countries.
            </p>

            <h2>Links To Other Web Sites</h2>
            <p>
              Our Service may contain links to third-party web sites or services that are not owned 
              or controlled by Al-Asr. We have no control over, and assume no responsibility for, the 
              content, privacy policies, or practices of any third party web sites or services.
            </p>

            <h2>Termination</h2>
            <p>
              We may terminate or suspend your account immediately, without prior notice or liability, 
              for any reason whatsoever, including without limitation if you breach the Terms.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              In no event shall Al-Asr, nor its directors, employees, partners, agents, suppliers, or 
              affiliates, be liable for any indirect, incidental, special, consequential or punitive 
              damages, including without limitation, loss of profits, data, use, goodwill, or other 
              intangible losses.
            </p>

            <h2>Disclaimer</h2>
            <p>
              Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and 
              "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether 
              express or implied.
            </p>

            <h2>Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of the United States, 
              without regard to its conflict of law provisions.
            </p>

            <h2>Changes</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
              By continuing to access or use our Service after those revisions become effective, you agree 
              to be bound by the revised terms.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:{' '}
              <a href="mailto:legal@al-asr.com" className="text-blue-600 dark:text-blue-400">
                legal@al-asr.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export const metadata = {
  title: 'Terms of Service - Al-Asr',
  description: 'Read the terms and conditions for using Al-Asr website and services.',
}
