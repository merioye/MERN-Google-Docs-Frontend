import { UseFormRegister, FieldValues, FieldErrorsImpl } from 'react-hook-form/dist/types'

import './InputField.scss'

type IProps = {
  name: string
  type: string
  placeholder: string
  register: UseFormRegister<FieldValues>
  errors: Partial<
    FieldErrorsImpl<{
      [x: string]: any
    }>
  >
  icon: React.ReactNode
}
const InputField = ({ name, type, register, errors, placeholder, icon }: IProps) => {
  return (
    <div className='input-container'>
      <input
        className='input'
        {...register(name)}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete='off'
      />
      {icon}
      {errors[name] && (
        <span className='input-error-message'>{errors[name]?.message as string}</span>
      )}
    </div>
  )
}

export default InputField
