import { GrFormClose, GrSearch } from 'react-icons/gr'
import { AiOutlineFileAdd } from 'react-icons/ai'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { motion } from 'framer-motion'
import { useMutation, useApolloClient } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'

import './Modal.scss'
import InputField from '../InputField/InputField'
import { modalSchema } from '../../../validations/modal.validation'
import { addRippleEffect } from '../../../utils/shared/addRippleEffect.util'
import { modalVariants } from '../../../animations'
import { ModalFormInput } from '../../../types/form.types'
import { CREATEDOC, DELETEDOC } from '../../../graphql/mutations/doc.mutations'
import {
  CreateDocData,
  CreateDocVars,
  DeleteDocData,
  DeleteDocVars,
} from '../../../types/useMutation.types'
import { GETMYDOCS } from '../../../graphql/queries/doc.queries'
import { Doc } from '../../../types/shared.types'
import { SearchInputContext } from '../../../context/SearchInputContext'

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
  } = useForm<ModalFormInput>({
    resolver: yupResolver(modalSchema),
  })
  const { setSearchInputValue } = useContext(SearchInputContext)
  const client = useApolloClient()
  const navigate = useNavigate()

  const [createDoc, { loading: isCreatingDoc }] = useMutation<CreateDocData, CreateDocVars>(
    CREATEDOC,
    {
      update(_, mutationResult) {
        const previousData = client.readQuery({ query: GETMYDOCS })
        client.writeQuery({
          query: GETMYDOCS,
          data: {
            getMyDocs: [mutationResult.data?.createDoc.doc, ...previousData.getMyDocs.docs],
          },
        })
        setShowModal(false)
        navigate(`doc/${mutationResult.data?.createDoc.doc.id}`)
      },
    },
  )
  const [deleteDoc, { loading: isDeletingDoc }] = useMutation<DeleteDocData, DeleteDocVars>(
    DELETEDOC,
    {
      update() {
        const previousData = client.readQuery({ query: GETMYDOCS })
        const filteredData = previousData.getMyDocs.docs.filter((doc: Doc) => {
          return doc.id !== docId
        })
        client.writeQuery({
          query: GETMYDOCS,
          data: {
            getMyDocs: filteredData,
          },
        })
        setShowModal(false)
      },
    },
  )

  const onSubmit = (data: ModalFormInput) => {
    if (type === 'create') createDoc({ variables: { title: data.modalInput } })
    else if (type === 'search') {
      setSearchInputValue(data.modalInput)
      setShowModal(false)
    }
  }
  const deleteDocument = () => {
    console.log('delete')
    deleteDoc({ variables: { docId: docId as string } })
  }
  const handleCrossIconClick = () => {
    if (isCreatingDoc || isDeletingDoc) return
    setShowModal(false)
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
            <GrFormClose className='close-icon' onClick={handleCrossIconClick} />
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
            <button
              type='button'
              className='cancel-btn'
              onClick={() => setShowModal(false)}
              disabled={isCreatingDoc || isDeletingDoc}
            >
              {type === 'delete' ? 'Close' : 'Cancel'}
            </button>
            {type === 'delete' ? (
              <button
                type='button'
                className='delete-btn'
                onClick={deleteDocument}
                disabled={isCreatingDoc}
              >
                {isDeletingDoc ? 'Deleting...' : 'Delete'}
              </button>
            ) : (
              <button
                type='submit'
                className='submit-btn'
                onClick={addRippleEffect}
                disabled={isCreatingDoc}
              >
                {type === 'search' && 'Search'}
                {type === 'create' && (isCreatingDoc ? 'Creating...' : 'Create')}
              </button>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default Modal
