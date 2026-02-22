'use client'

import { useState, useCallback } from 'react'
import { Copy, RefreshCw, Check } from 'lucide-react'

interface PasswordOptions {
  length: number
  includeUppercase: boolean
  includeLowercase: boolean
  includeNumbers: boolean
  includeSymbols: boolean
  excludeAmbiguous: boolean
}

export default function PasswordGenerator() {
  const [password, setPassword] = useState('')
  const [copied, setCopied] = useState(false)
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
    excludeAmbiguous: true,
  })

  const generatePassword = useCallback(() => {
    let charset = ''
    const lowercase = 'abcdefghijklmnopqrstuvwxyz'
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numbers = '0123456789'
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?'
    const ambiguous = 'il1Lo0O'

    if (options.includeLowercase) charset += lowercase
    if (options.includeUppercase) charset += uppercase
    if (options.includeNumbers) charset += numbers
    if (options.includeSymbols) charset += symbols

    if (options.excludeAmbiguous) {
      charset = charset.split('').filter(char => !ambiguous.includes(char)).join('')
    }

    if (charset.length === 0) {
      setPassword('Please select at least one character type')
      return
    }

    let newPassword = ''
    const array = new Uint32Array(options.length)
    crypto.getRandomValues(array)

    for (let i = 0; i < options.length; i++) {
      newPassword += charset[array[i] % charset.length]
    }

    setPassword(newPassword)
    setCopied(false)
  }, [options])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy password:', err)
    }
  }

  const getPasswordStrength = (pwd: string): { strength: string; color: string; width: string } => {
    if (!pwd || pwd.includes('Please select')) return { strength: 'No password', color: 'bg-gray-300', width: 'w-0' }
    
    let strength = 0
    if (pwd.length >= 12) strength++
    if (pwd.length >= 16) strength++
    if (/[a-z]/.test(pwd)) strength++
    if (/[A-Z]/.test(pwd)) strength++
    if (/[0-9]/.test(pwd)) strength++
    if (/[^A-Za-z0-9]/.test(pwd)) strength++

    if (strength <= 2) return { strength: 'Weak', color: 'bg-red-500', width: 'w-1/4' }
    if (strength <= 4) return { strength: 'Fair', color: 'bg-yellow-500', width: 'w-1/2' }
    if (strength <= 5) return { strength: 'Good', color: 'bg-blue-500', width: 'w-3/4' }
    return { strength: 'Strong', color: 'bg-green-500', width: 'w-full' }
  }

  const passwordStrength = getPasswordStrength(password)

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Password Display */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <input
            type="text"
            value={password}
            readOnly
            placeholder="Click 'Generate Password' to create a password"
            className="flex-1 px-4 py-3 text-lg font-mono bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={copyToClipboard}
            disabled={!password || password.includes('Please select')}
            className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Copy to clipboard"
          >
            {copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>
        
        {/* Password Strength Indicator */}
        {password && (
          <div className="mt-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-600">Password Strength:</span>
              <span className="text-sm font-medium">{passwordStrength.strength}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className={`h-2 rounded-full transition-all ${passwordStrength.color} ${passwordStrength.width}`}></div>
            </div>
          </div>
        )}
      </div>

      {/* Options */}
      <div className="space-y-4 mb-6">
        {/* Length Slider */}
        <div>
          <label className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Password Length</span>
            <span className="text-sm font-bold text-blue-600">{options.length}</span>
          </label>
          <input
            type="range"
            min="8"
            max="32"
            value={options.length}
            onChange={(e) => setOptions({ ...options, length: parseInt(e.target.value) })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>8</span>
            <span>32</span>
          </div>
        </div>

        {/* Character Options */}
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={options.includeUppercase}
              onChange={(e) => setOptions({ ...options, includeUppercase: e.target.checked })}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">Uppercase Letters (A-Z)</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={options.includeLowercase}
              onChange={(e) => setOptions({ ...options, includeLowercase: e.target.checked })}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">Lowercase Letters (a-z)</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={options.includeNumbers}
              onChange={(e) => setOptions({ ...options, includeNumbers: e.target.checked })}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">Numbers (0-9)</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={options.includeSymbols}
              onChange={(e) => setOptions({ ...options, includeSymbols: e.target.checked })}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">Symbols (!@#$%^&*)</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={options.excludeAmbiguous}
              onChange={(e) => setOptions({ ...options, excludeAmbiguous: e.target.checked })}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">Exclude Ambiguous Characters (il1Lo0O)</span>
          </label>
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={generatePassword}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
      >
        <RefreshCw className="w-5 h-5" />
        Generate Password
      </button>
    </div>
  )
}