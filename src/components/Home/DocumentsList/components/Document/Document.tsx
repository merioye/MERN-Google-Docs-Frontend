import { IoMdListBox, IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io'
import { SlOptionsVertical } from 'react-icons/sl'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { BsTrash2 } from 'react-icons/bs'
import { TfiNewWindow } from 'react-icons/tfi'

import './Document.scss'
import { documentListItemVariants, modalVariants } from '../../../../../animations'
import { Modal } from '../../../../Shared'
import { useClickOutside } from '../../../../../hooks/useClickOutside'

type IOptionsProps = {
  showOptions: boolean
  setShowOptions: React.Dispatch<React.SetStateAction<boolean>>
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
}
const Options = ({ showOptions, setShowOptions, setShowDeleteModal }: IOptionsProps) => {
  const modal = useClickOutside(() => {
    setShowOptions(false)
  }, showOptions)

  const handleDeleteDoc = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.preventDefault()
    setShowOptions(false)
    setShowDeleteModal(true)
  }
  return (
    <motion.div
      className='doc-options'
      initial='hidden'
      animate='visible'
      exit='hidden'
      variants={modalVariants}
      ref={modal}
    >
      <ul>
        <li className='option1' style={{ gap: '9px' }} onClick={handleDeleteDoc}>
          <BsTrash2 className='option-action-icon del-option-icon' />
          Delete
        </li>
        <li className='option2'>
          <TfiNewWindow className='option-action-icon' />
          Open in new Tab
        </li>
      </ul>
    </motion.div>
  )
}
const Document = () => {
  const [showDocOptions, setShowDocOptions] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const docId = '123'

  const toggleOptionsVisibility = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.preventDefault()
    setShowDocOptions(!showDocOptions)
  }
  return (
    <>
      <Link to={`/doc/${docId}`} className='link'>
        <motion.div className='document-wrapper' variants={documentListItemVariants}>
          <div>
            <IoMdListBox className='doc-icon' />
            <h4>This is a document and this is a very long doc title writing to test it</h4>
          </div>
          <p>Jan 08, 2023</p>
          <span id='options' onClick={toggleOptionsVisibility}>
            <SlOptionsVertical
              className='option-icon'
              id='options'
              style={showDocOptions ? { fill: 'blue' } : {}}
            />
            {showDocOptions ? (
              <IoMdArrowDropdown
                className='option-icon'
                style={showDocOptions ? { fill: 'blue' } : {}}
              />
            ) : (
              <IoMdArrowDropup className='option-icon' />
            )}
          </span>
          <AnimatePresence>
            {showDocOptions && (
              <Options
                showOptions={showDocOptions}
                setShowOptions={setShowDocOptions}
                setShowDeleteModal={setShowDeleteModal}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </Link>
      <AnimatePresence>
        {showDeleteModal && <Modal type='delete' setShowModal={setShowDeleteModal} docId={docId} />}
      </AnimatePresence>
    </>
  )
}

export default Document
