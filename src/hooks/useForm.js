import { useState } from 'react'

export function useForm(initialValues, onSubmit, validate) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setValues(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched(prev => ({
      ...prev,
      [name]: true
    }))

    // Validate on blur
    if (validate) {
      const fieldErrors = validate(values)
      if (fieldErrors[name]) {
        setErrors(prev => ({
          ...prev,
          [name]: fieldErrors[name]
        }))
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage({ type: '', text: '' })

    try {
      // Validate all fields
      if (validate) {
        const validationErrors = validate(values)
        const hasErrors = Object.values(validationErrors).some(err => err)
        
        if (hasErrors) {
          setErrors(validationErrors)
          setTouched(
            Object.keys(initialValues).reduce((acc, key) => {
              acc[key] = true
              return acc
            }, {})
          )
          setIsSubmitting(false)
          return
        }
      }

      // Call onSubmit
      await onSubmit(values)
      setSubmitMessage({
        type: 'success',
        text: 'Operation completed successfully!'
      })
      
      // Reset form after success
      setTimeout(() => {
        setValues(initialValues)
        setErrors({})
        setTouched({})
      }, 1000)
    } catch (error) {
      setSubmitMessage({
        type: 'error',
        text: error.message || 'An error occurred'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
    setSubmitMessage({ type: '', text: '' })
  }

  return {
    values,
    errors,
    touched,
    isSubmitting,
    submitMessage,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setValues,
    setErrors
  }
}
