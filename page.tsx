'use client'

import { useState } from 'react'
import SignUpForm from './components/SignUpForm'
import LoginForm from './components/LoginForm'
import { Button } from '@/components/ui/button'

export default function Home() {
  const [activeForm, setActiveForm] = useState<'signup' | 'login'>('signup')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="flex justify-center mb-6">
          <Button
            variant={activeForm === 'signup' ? 'default' : 'outline'}
            onClick={() => setActiveForm('signup')}
            className="mr-2"
          >
            Sign Up
          </Button>
          <Button
            variant={activeForm === 'login' ? 'default' : 'outline'}
            onClick={() => setActiveForm('login')}
          >
            Login
          </Button>
        </div>
        {activeForm === 'signup' ? <SignUpForm /> : <LoginForm />}
      </div>
    </div>
  )
}

