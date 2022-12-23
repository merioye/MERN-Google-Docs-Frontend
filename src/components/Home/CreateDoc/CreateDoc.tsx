import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'

import './CreateDoc.scss'
import AddDoc from '../../../assets/images/create-doc.png'
import { Modal } from '../../Shared'

const CreateDoc = () => {
  const [showCreateModal, setShowCreateModal] = useState(false)
  return (
    <>
      <section className='create-doc-container'>
        <div>
          <p>Start a new document</p>
          <img
            loading='lazy'
            src={AddDoc}
            alt='Create new document'
            onClick={() => setShowCreateModal(true)}
          />
          <h6>Blank</h6>
        </div>
      </section>
      <AnimatePresence>
        {showCreateModal && <Modal type='create' setShowModal={setShowCreateModal} />}
      </AnimatePresence>
    </>
  )
}

export default CreateDoc
