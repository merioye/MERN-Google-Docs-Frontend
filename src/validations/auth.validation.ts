import * as yup from 'yup'

export const registerSchema = yup.object({
  name: yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
  email: yup.string().email('Email must be a valid email').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(15, 'Password must be at most 15 characters'),
  profile: yup
    .mixed()
    .test('required', 'Profile image is required', (file) => {
      if (file.length > 0) return true
      return false
    })
    .test('fileSize', 'Image size is too large, max image size should be 1 Mb', (file) => {
      return file[0] && file[0].size <= 1000000
    }),
})

export const loginSchema = yup.object({
  email: yup.string().email('Email must be a valid email').required('Email is required'),
  password: yup.string().required('Password is required'),
})
