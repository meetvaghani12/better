'use client'

import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import PasswordStrengthMeter from './PasswordStrengthMeter'

interface SignUpValues {
  username: string
  email: string
  password: string
  confirmPassword: string
}

const SignUpSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
})

export default function SignUpForm() {
  const [successMessage, setSuccessMessage] = useState('')
  const [passwordStrength, setPasswordStrength] = useState(0)

  const handleSubmit = (values: SignUpValues, { setSubmitting, resetForm }: any) => {
    // Simulate API call
    setTimeout(() => {
      console.log(values)
      setSuccessMessage('Sign Up Successful!')
      setSubmitting(false)
      resetForm()
      setPasswordStrength(0)
    }, 1000)
  }

  return (
    <Formik
      initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
      validationSchema={SignUpSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting, values }) => (
        <Form className="space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Field as={Input} id="username" name="username" placeholder="Username" aria-required="true" aria-invalid={errors.username && touched.username ? "true" : "false"} />
            {errors.username && touched.username && <div className="text-red-500 text-sm mt-1" role="alert">{errors.username}</div>}
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Field as={Input} id="email" name="email" type="email" placeholder="Email" aria-required="true" aria-invalid={errors.email && touched.email ? "true" : "false"} />
            {errors.email && touched.email && <div className="text-red-500 text-sm mt-1" role="alert">{errors.email}</div>}
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Field
              as={Input}
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              aria-required="true"
              aria-invalid={errors.password && touched.password ? "true" : "false"}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPasswordStrength(e.target.value.length)
                // You need to manually call handleChange as we're overriding the default onChange
                // @ts-ignore
                Formik.handleChange(e)
              }}
            />
            {errors.password && touched.password && <div className="text-red-500 text-sm mt-1" role="alert">{errors.password}</div>}
            <PasswordStrengthMeter password={values.password} />
          </div>

          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Field as={Input} id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm Password" aria-required="true" aria-invalid={errors.confirmPassword && touched.confirmPassword ? "true" : "false"} />
            {errors.confirmPassword && touched.confirmPassword && (
              <div className="text-red-500 text-sm mt-1" role="alert">{errors.confirmPassword}</div>
            )}
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Signing Up...' : 'Sign Up'}
          </Button>

          {successMessage && <div className="text-green-500 text-center mt-2" role="status" aria-live="polite">{successMessage}</div>}
        </Form>
      )}
    </Formik>
  )
}

