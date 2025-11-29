'use client'

import React from 'react'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'

interface SponsorModalProps {
  isOpen: boolean
  onClose: () => void
}

const SponsorModal: React.FC<SponsorModalProps> = ({ isOpen, onClose }) => {
  const sponsorPlans = [
    {
      name: 'Basic',
      price: '$99',
      period: 'month',
      features: [
        'Sidebar ad placement',
        '10,000 impressions',
        'Basic analytics',
        '30-day campaign'
      ],
      popular: false
    },
    {
      name: 'Professional',
      price: '$299',
      period: 'month',
      features: [
        'Header & sidebar ads',
        '50,000 impressions',
        'Advanced analytics',
        'Featured post placement',
        '90-day campaign',
        'Priority support'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$799',
      period: 'month',
      features: [
        'All ad placements',
        '200,000 impressions',
        'Custom analytics dashboard',
        'Sponsored content series',
        'Dedicated account manager',
        'Custom campaign duration',
        '24/7 premium support'
      ],
      popular: false
    }
  ]

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Become a Sponsor"
      size="lg"
    >
      <div className="space-y-6">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Choose a sponsorship plan that fits your needs and reach our engaged audience of readers.
          </p>
        </div>

        {/* Sponsorship Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sponsorPlans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border-2 p-6 ${
                plan.popular
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    {plan.price}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 ml-1">
                    /{plan.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  plan.popular
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-600 hover:bg-gray-700'
                }`}
                onClick={() => {
                  // Handle sponsorship selection
                  alert(`Selected ${plan.name} plan`)
                  onClose()
                }}
              >
                Select Plan
              </Button>
            </div>
          ))}
        </div>

        {/* Custom Sponsorship */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Need a Custom Solution?
          </h4>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Contact us for custom sponsorship opportunities tailored to your specific needs.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              window.location.href = '/contact'
              onClose()
            }}
          >
            Contact Sales
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default SponsorModal
