import { FaFolder } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useContext, useState, useLayoutEffect } from 'react'

import './DocumentsList.scss'
import Document from './components/Document/Document'
import { documentsListVariants } from '../../../animations'
import { Doc } from '../../../types/shared.types'
import { SearchInputContext } from '../../../context/SearchInputContext'
import EmptyBox from '../../../assets/images/empty.jpg'

type IProps = {
  docs: Doc[]
}
const DocumentsList = ({ docs }: IProps) => {
  const { searchInputValue } = useContext(SearchInputContext)
  const [documents, setDocuments] = useState<Doc[]>([])

  useLayoutEffect(() => {
    if (!searchInputValue.trim().length) {
      setDocuments(docs)
      return
    }
    const filteredDocs = docs.filter((doc) => {
      return doc.title.toLowerCase().includes(searchInputValue.toLowerCase())
    })
    setDocuments(filteredDocs)
  }, [searchInputValue])

  return (
    <section className='documents-wrapper'>
      <div className='documents-container'>
        <header>
          <h3>My Documents</h3>
          <h3>Date Created</h3>
          <FaFolder className='folder-icon' />
        </header>
        {documents.length ? (
          <motion.div variants={documentsListVariants} initial='hidden' animate='visible'>
            {documents.map((document, index) => (
              <Document key={document.id} index={index} doc={document} />
            ))}
          </motion.div>
        ) : (
          <div className='empty-list'>
            <img src={EmptyBox} alt='empty' />
          </div>
        )}
      </div>
    </section>
  )
}

export default DocumentsList
