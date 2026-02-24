'use client'

import { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: "How secure are the passwords generated?",
    answer: "Our password generator uses cryptographically secure random number generation to create truly random passwords. The passwords are generated entirely in your browser using Web Crypto API, ensuring maximum security. No passwords are ever transmitted or stored on our servers."
  },
  {
    question: "What makes a password strong?",
    answer: "A strong password should be at least 12 characters long (16+ is better), include a mix of uppercase and lowercase letters, numbers, and special symbols. It should avoid dictionary words, personal information, and common patterns. Each password should be unique for every account."
  },
  {
    question: "Should I use the same password for multiple accounts?",
    answer: "Never! Using the same password across multiple accounts is one of the biggest security risks. If one account is compromised, all your accounts become vulnerable. Always use unique passwords for each account, especially for sensitive accounts like banking, email, and social media."
  },
  {
    question: "How can I remember all my passwords?",
    answer: "We strongly recommend using a reputable password manager. Password managers securely store all your passwords and can auto-fill them when needed. This allows you to use strong, unique passwords for every account without having to memorize them all."
  },
  {
    question: "How often should I change my passwords?",
    answer: "Change passwords immediately if you suspect a breach or receive a security alert. For routine changes, focus on your most sensitive accounts (banking, primary email) every 3-6 months. With strong, unique passwords and two-factor authentication, frequent changes are less critical than using secure passwords in the first place."
  },
  {
    question: "Is this password generator free to use?",
    answer: "Yes, our password generator is completely free to use with no limitations. You can generate as many passwords as you need, with any length or complexity. There are no hidden fees, subscriptions, or premium features - everything is available to everyone for free."
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="mt-16 bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg">
            <button
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              onClick={() => toggleFAQ(index)}
              aria-expanded={openIndex === index}
            >
              <h3 className="font-semibold text-gray-900 pr-4">{item.question}</h3>
              {openIndex === index ? (
                <ChevronUpIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
              ) : (
                <ChevronDownIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
              )}
            </button>
            {openIndex === index && (
              <div className="px-6 pb-4">
                <p className="text-gray-600">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}