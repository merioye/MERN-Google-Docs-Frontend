import { MdOutlineLockOpen, MdOutlineEmail } from 'react-icons/md'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import { InputField } from '../../Shared'
import { authFormVariants } from '../../../animations'
import { loginSchema } from '../../../validations/auth.validation'
import { addRippleEffect } from '../../../utils/shared/addRippleEffect.util'
import { LoginFormInput } from '../../../types/form.types'
import { LOGIN } from '../../../graphql/mutations/user.mutations'
import { LoginData, LoginVars } from '../../../types/useMutation.types'

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>({
    resolver: yupResolver(loginSchema),
  })

  const navigate = useNavigate()

  const [loginUser, { loading }] = useMutation<LoginData, LoginVars>(LOGIN, {
    onError: (error) => {
      toast.error(error.message)
    },
    onCompleted: () => {
      navigate('/')
    },
  })

  const onSubmit = (data: LoginFormInput) => {
    loginUser({ variables: { ...data } })
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
        <div style={{ marginTop: 30 }}>
          <button type='submit' className='btn-full' onClick={addRippleEffect} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </form>
    </motion.div>
  )
}

export default LoginForm
