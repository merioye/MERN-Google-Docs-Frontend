import { FaFolder } from 'react-icons/fa'
import { motion } from 'framer-motion'

import './DocumentsList.scss'
import Document from './components/Document/Document'
import { documentsListVariants } from '../../../animations'

const DocumentsList = () => {
  return (
    <section className='documents-wrapper'>
      <div className='documents-container'>
        <header>
          <h3>My Documents</h3>
          <h3>Date Created</h3>
          <FaFolder className='folder-icon' />
        </header>
        <motion.div variants={documentsListVariants} initial='hidden' animate='visible'>
          <Document />
          <Document />
          <Document />
        </motion.div>
      </div>
    </section>
  )
}

export default DocumentsList
