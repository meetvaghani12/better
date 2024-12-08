'use client'

import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { useState, useEffect } from 'react'

interface LoginValues {
  email: string
  password: string
  rememberMe: boolean
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
  rememberMe: Yup.boolean(),
})

export default function LoginForm() {
  const [successMessage, setSuccessMessage] = useState('')
  const [initialEmail, setInitialEmail] = useState('')

  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail')
    if (savedEmail) {
      setInitialEmail(savedEmail)
    }
  }, [])

  const handleSubmit = (values: LoginValues, { setSubmitting, resetForm }: any) => {
    // Simulate API call
    setTimeout(() => {
      console.log(values)
      setSuccessMessage('Login Successful!')
      setSubmitting(false)
      if (values.rememberMe) {
        localStorage.setItem('rememberedEmail', values.email)
      } else {
        localStorage.removeItem('rememberedEmail')
      }
      resetForm()
    }, 1000)
  }

  return (
    <Formik
      initialValues={{ email: initialEmail, password: '', rememberMe: false }}
      validationSchema={LoginSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Field as={Input} id="email" name="email" type="email" placeholder="Email" aria-required="true" aria-invalid={errors.email && touched.email ? "true" : "false"} />
            {errors.email && touched.email && <div className="text-red-500 text-sm mt-1" role="alert">{errors.email}</div>}
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Field as={Input} id="password" name="password" type="password" placeholder="Password" aria-required="true" aria-invalid={errors.password && touched.password ? "true" : "false"} />
            {errors.password && touched.password && <div className="text-red-500 text-sm mt-1" role="alert">{errors.password}</div>}
          </div>

          <div className="flex items-center space-x-2">
            <Field as={Checkbox} id="rememberMe" name="rememberMe" />
            <Label htmlFor="rememberMe">Remember Me</Label>
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Logging In...' : 'Login'}
          </Button>

          {successMessage && <div className="text-green-500 text-center mt-2" role="status" aria-live="polite">{successMessage}</div>}
        </Form>
      )}
    </Formik>
  )
}

