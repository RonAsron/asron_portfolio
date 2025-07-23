import React, { useState } from 'react'
import { CONTACT_FORM_CONFIG } from '../../utils/constants'

interface FormData {
  name: string
  email: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

interface FormStatus {
  type: 'idle' | 'submitting' | 'success' | 'error'
  message?: string
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<FormStatus>({ type: 'idle' })

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    } else if (formData.message.length > CONTACT_FORM_CONFIG.MAX_MESSAGE_LENGTH) {
      newErrors.message = `Message must be less than ${CONTACT_FORM_CONFIG.MAX_MESSAGE_LENGTH} characters`
    }

    return newErrors
  }

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
  }

  // Handle form submission
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  const formErrors = validateForm()
  if (Object.keys(formErrors).length > 0) {
    setErrors(formErrors)
    return
  }

  setErrors({})
  setStatus({ type: 'submitting' })

  try {
    const response = await fetch('https://formspree.io/f/xanbqdzd', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    if (!response.ok) {
      throw new Error('Failed to submit form')
    }

    setStatus({
      type: 'success',
      message: "Thank you! Your message has been sent.",
    })

    setFormData({ name: '', email: '', message: '' })
  } catch (error) {
    setStatus({
      type: 'error',
      message: 'Sorry, there was an error sending your message. Please try again.',
    })
  }
}


  // Reset status after success/error
  React.useEffect(() => {
    if (status.type === 'success' || status.type === 'error') {
      const timer = setTimeout(() => {
        setStatus({ type: 'idle' })
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [status.type])

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Status Messages */}
      {status.type === 'success' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-green-800">{status.message}</p>
          </div>
        </div>
      )}

      {status.type === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-800">{status.message}</p>
          </div>
        </div>
      )}

      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-primary dark:text-dark-foreground mb-2">
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 border rounded-lg  focus:ring-2 bg-cardbg text-cardtext dark:text-dark-cardtext dark:bg-dark-cardbg focus:ring-secfontcolor focus:border-mainfontcolor transition-colors duration-200 ${
            errors.name 
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
              : 'border-gray-300'
          }`}
          placeholder="Your full name"
          disabled={status.type === 'submitting'}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-primary dark:text-dark-foreground mb-2">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-secfontcolor bg-cardbg text-cardtext dark:text-dark-cardtext dark:bg-dark-cardbg focus:border-mainfontcolor transition-colors duration-200 ${
            errors.email 
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
              : 'border-gray-300'
          }`}
          placeholder="your.email@example.com"
          disabled={status.type === 'submitting'}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-primary dark:text-dark-foreground mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-secfontcolor focus:border-mainfontcolor bg-cardbg text-cardtext dark:text-dark-cardtext dark:bg-dark-cardbg transition-colors duration-200 resize-vertical ${
            errors.message 
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
              : 'border-gray-300'
          }`}
          placeholder="..."
          disabled={status.type === 'submitting'}
        />
        <div className="flex justify-between items-center mt-1">
          {errors.message ? (
            <p className="text-sm text-red-600">{errors.message}</p>
          ) : (
            <div></div>
          )}
          <p className="text-sm text-gray-500">
            {formData.message.length}/{CONTACT_FORM_CONFIG.MAX_MESSAGE_LENGTH}
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status.type === 'submitting'}
        className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-sobackfontcolor touch-manipulation min-h-[48px] ${
          status.type === 'submitting'
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-secfontcolor hover:bg-mainfontcolor active:bg-sobackfontcolor transform hover:scale-105 active:scale-95 shadow-lg'
        }`}
      >
        {status.type === 'submitting' ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
          </div>
        ) : (
          'Send Message'
        )}
      </button>

      {/* Required Fields Note */}
      <p className="text-sm text-gray-500 text-center">
        * Required fields
      </p>
    </form>
  )
}

export default ContactForm