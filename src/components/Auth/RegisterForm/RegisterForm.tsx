import { MdFace, MdOutlineLockOpen, MdOutlineEmail } from 'react-icons/md'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { toast } from 'react-hot-toast'

import { InputField } from '../../Shared'
import Profile from '../../../assets/images/profile.png'
import { authFormVariants } from '../../../animations'
import { registerSchema } from '../../../validations/auth.validation'
import { addRippleEffect } from '../../../utils/shared/addRippleEffect.util'
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from '../../../config/constants'
import { REGISTER } from '../../../graphql/mutations/user.mutations'
import { RegisterFormInput } from '../../../types/form.types'
import { RegisterData, RegisterVars } from '../../../types/useMutation.types'
import './RegisterForm.scss'

type IProps = {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
}
const RegisterForm = ({ setActiveTab }: IProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInput>({
    resolver: yupResolver(registerSchema),
  })
  const [imagePreview, setImagePreview] = useState<null | string>(null)
  const [isUploadingImage, setIsUploadingImage] = useState(false)

  const [registerUser, { loading }] = useMutation<RegisterData, RegisterVars>(REGISTER, {
    onError: (error) => {
      toast.error(error.message)
    },
    onCompleted: (data) => {
      toast.success(data.register.message)
      setActiveTab('login')
    },
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) {
      setImagePreview(null)
      return
    }
    const file = e.target.files[0]
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onloadend = () => {
      setImagePreview(fileReader.result as string)
    }
  }

  const onSubmit = async (data: RegisterFormInput) => {
    setIsUploadingImage(true)
    const { name, email, password, profile } = data
    try {
      const formData = new FormData()
      formData.append('file', profile[0])
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        },
      )
      const { secure_url } = await res.json()
      setIsUploadingImage(false)
      registerUser({ variables: { name, email, password, profile: secure_url as string } })
    } catch (e) {
      console.log(e)
      setIsUploadingImage(false)
      toast.error('Oops! something went wrong')
    }
  }
  return (
    <motion.div
      className='auth-form'
      initial='hidden'
      animate='visible'
      variants={authFormVariants}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: 20 }}>
          <InputField
            name='name'
            type='text'
            placeholder='Name'
            register={register}
            errors={errors}
            icon={<MdFace className='icon' />}
          />
        </div>
        <div style={{ marginBottom: 20 }}>
          <InputField
            name='email'
            type='email'
            placeholder='Email'
            register={register}
            errors={errors}
            icon={<MdOutlineEmail className='icon' />}
          />
        </div>
        <div style={{ marginBottom: 20 }}>
          <InputField
            name='password'
            type='password'
            placeholder='Password'
            register={register}
            errors={errors}
            icon={<MdOutlineLockOpen className='icon' />}
          />
        </div>
        <div>
          <div className='image-picker'>
            <img src={imagePreview ? imagePreview : Profile} />
            <input
              {...register('profile')}
              name='profile'
              type='file'
              accept='image/*'
              multiple={false}
              onChange={handleImageChange}
            />
          </div>
          {errors.profile && (
            <span className='input-error-message'>{errors.profile.message as string}</span>
          )}
        </div>
        <div style={{ marginTop: 30 }}>
          <button
            type='submit'
            className='btn-full'
            onClick={addRippleEffect}
            disabled={isUploadingImage || loading}
          >
            {isUploadingImage || loading ? 'Registering...' : 'Register'}
          </button>
        </div>
      </form>
    </motion.div>
  )
}

export default RegisterForm
