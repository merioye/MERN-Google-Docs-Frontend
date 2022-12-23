import { MdFace, MdOutlineLockOpen, MdOutlineEmail } from 'react-icons/md'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'

import { InputField } from '../../Shared'
import Profile from '../../../assets/images/profile.png'
import { authFormVariants } from '../../../animations'
import { registerSchema } from '../../../validations/auth.validation'
import { addRippleEffect } from '../../../utils/shared/addRippleEffect.util'
import './RegisterForm.scss'

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  })
  const [imagePreview, setImagePreview] = useState<null | string>(null)

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

  const onSubmit = (data: any) => {
    console.log(data)
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
          <button type='submit' className='btn-full' onClick={addRippleEffect}>
            Register
          </button>
        </div>
      </form>
    </motion.div>
  )
}

export default RegisterForm
