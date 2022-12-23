import { BsFileEarmarkTextFill } from 'react-icons/bs'
import { GrSearch } from 'react-icons/gr'
import { FcPrint } from 'react-icons/fc'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'

import './Navbar.scss'
import Profile from '../../../assets/images/man.svg'
import Modal from '../Modal/Modal'
import { addRippleEffect } from '../../../utils/shared/addRippleEffect.util'

const Navbar = () => {
  const [showSearchModal, setShowSearchModal] = useState(false)
  const location = useLocation()

  const showModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    addRippleEffect(e)
    setShowSearchModal(true)
  }
  const printDoc = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    addRippleEffect(e)
    window?.print()
  }
  return (
    <>
      <nav>
        {location.pathname === '/' ? (
          <Link to='/' className='link'>
            <div>
              <BsFileEarmarkTextFill className='doc-icon' />
              <h2>Docs</h2>
            </div>
          </Link>
        ) : (
          <div className='doc-title-container'>
            <Link to='/'>
              <BsFileEarmarkTextFill className='doc-icon' />
            </Link>
            <h1>This is document title</h1>
          </div>
        )}

        {location.pathname === '/' && (
          <div>
            <button onClick={showModal}>
              <GrSearch className='search-icon' />
            </button>
          </div>
        )}
        <div>
          {location.pathname === '/' ? (
            <h3>John Doe</h3>
          ) : (
            <span onClick={printDoc}>
              <FcPrint className='print-icon' />
            </span>
          )}
          <img loading='lazy' src={Profile} alt='profile' />
        </div>
      </nav>
      <AnimatePresence>
        {showSearchModal && <Modal type='search' setShowModal={setShowSearchModal} />}
      </AnimatePresence>
    </>
  )
}

export default Navbar
