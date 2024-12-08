import { useEffect, useState } from 'react'

interface PasswordStrengthMeterProps {
  password: string
}

export default function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
  const [strength, setStrength] = useState(0)

  useEffect(() => {
    const calculateStrength = () => {
      let score = 0
      if (password.length > 6) score++
      if (password.length > 10) score++
      if (/[A-Z]/.test(password)) score++
      if (/[0-9]/.test(password)) score++
      if (/[^A-Za-z0-9]/.test(password)) score++
      setStrength(score)
    }

    calculateStrength()
  }, [password])

  const getColor = () => {
    switch (strength) {
      case 0:
      case 1:
        return 'bg-red-500'
      case 2:
      case 3:
        return 'bg-yellow-500'
      case 4:
      case 5:
        return 'bg-green-500'
      default:
        return 'bg-gray-300'
    }
  }

  return (
    <div className="mt-2">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">Password strength</span>
        <span className="text-sm font-medium text-gray-700">{strength}/5</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className={`h-2.5 rounded-full ${getColor()}`} style={{ width: `${(strength / 5) * 100}%` }}></div>
      </div>
    </div>
  )
}

