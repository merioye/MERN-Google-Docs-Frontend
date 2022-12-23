import { GrFormClose, GrSearch } from 'react-icons/gr'
import { AiOutlineFileAdd } from 'react-icons/ai'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { motion } from 'framer-motion'

import InputField from '../InputField/InputField'
import { modalSchema } from '../../../validations/modal.validation'
import { addRippleEffect } from '../../../utils/shared/addRippleEffect.util'
import './Modal.scss'
import { modalVariants } from '../../../animations'

type IProps = {
  type: string
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  docId?: string
}
const Modal = ({ type, setShowModal, docId }: IProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(modalSchema),
  })

  const onSubmit = (data: any) => {
    console.log(data)
  }
  const deleteDocument = () => {
    console.log('delete')
  }
  return (
    <div className='modal-container'>
      <motion.div
        className='modal'
        variants={modalVariants}
        initial='hidden'
        animate='visible'
        exit='hidden'
        style={type === 'delete' ? { width: 330 } : {}}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='heading'>
            <h3>
              {type === 'search' && 'Search a'}
              {type === 'create' && 'Create a'}
              {type === 'delete' && 'Delete'} document
            </h3>
            <GrFormClose className='close-icon' onClick={() => setShowModal(false)} />
          </div>
          {type === 'delete' ? (
            <p>Are you sure you want to delete this Document permanently?</p>
          ) : (
            <InputField
              name='modalInput'
              type='text'
              placeholder='Enter document title'
              register={register}
              errors={errors}
              icon={
                type === 'search' ? (
                  <GrSearch className='icon' />
                ) : (
                  <AiOutlineFileAdd className='icon' />
                )
              }
            />
          )}
          <div className='btns'>
            <button type='button' className='cancel-btn' onClick={() => setShowModal(false)}>
              {type === 'delete' ? 'Close' : 'Cancel'}
            </button>
            {type === 'delete' ? (
              <button type='button' className='delete-btn' onClick={deleteDocument}>
                Delete
              </button>
            ) : (
              <button type='submit' className='submit-btn' onClick={addRippleEffect}>
                {type === 'search' && 'Search'}
                {type === 'create' && 'Create'}
              </button>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default Modal
