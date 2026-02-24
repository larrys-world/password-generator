import PasswordGenerator from '@/components/PasswordGenerator'
import RelatedTools from '@/components/RelatedTools'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Password Generator - Create Strong, Secure Passwords',
  description: 'Generate strong, secure passwords instantly. Free, no-tracking password generator with customizable options for length, characters, and complexity.',
  keywords: 'password generator, secure password generator, random password generator, strong password, password creator',
  openGraph: {
    title: 'Password Generator - Create Strong, Secure Passwords',
    description: 'Generate strong, secure passwords instantly. Free, no-tracking password generator.',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Password Generator
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Create strong, secure passwords instantly
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2 inline-block">
            <p className="text-sm text-green-800 font-medium">
              🔒 100% Client-Side • No Tracking • No Data Stored
            </p>
          </div>
        </header>

        <PasswordGenerator />

        <section className="mt-16 prose prose-gray max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Why Use a Password Generator?
          </h2>
          <p className="text-gray-600 mb-4">
            Using unique, complex passwords for each account is crucial for online security. 
            A password generator helps you create strong passwords that are virtually impossible 
            to guess or crack through brute force attacks.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
            Features of Strong Passwords
          </h3>
          <ul className="text-gray-600 space-y-2">
            <li>At least 12 characters long (16+ is even better)</li>
            <li>Mix of uppercase and lowercase letters</li>
            <li>Include numbers and special symbols</li>
            <li>No dictionary words or personal information</li>
            <li>Unique for each account</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
            Password Security Tips
          </h3>
          <ul className="text-gray-600 space-y-2">
            <li>Never share your passwords with anyone</li>
            <li>Use a password manager to store passwords securely</li>
            <li>Enable two-factor authentication when available</li>
            <li>Change passwords immediately if a service is breached</li>
            <li>Avoid using the same password across multiple sites</li>
          </ul>

          <div className="mt-8 p-6 bg-blue-50 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Recommended Password Managers
            </h3>
            <p className="text-gray-600 mb-4">
              While our generator creates strong passwords, you'll need a secure way to store them:
            </p>
            <ul className="space-y-2">
              <li>
                <a href="https://1password.com" target="_blank" rel="noopener noreferrer" 
                   className="text-blue-600 hover:text-blue-800 font-medium">
                  1Password
                </a> - Excellent for families and teams
              </li>
              <li>
                <a href="https://bitwarden.com" target="_blank" rel="noopener noreferrer"
                   className="text-blue-600 hover:text-blue-800 font-medium">
                  Bitwarden
                </a> - Open source and free option
              </li>
            </ul>
          </div>
        </section>

        <section className="mt-16">
          <RelatedTools />
        </section>

        <footer className="mt-16 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>© 2026 Password Generator. All passwords are generated locally in your browser.</p>
        </footer>
      </div>
    </main>
  )
}