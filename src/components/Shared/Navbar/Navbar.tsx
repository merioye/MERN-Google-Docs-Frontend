import { BsFileEarmarkTextFill } from 'react-icons/bs'
import { GrSearch } from 'react-icons/gr'
import { FcPrint } from 'react-icons/fc'
import { useState, useContext } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useApolloClient, useMutation } from '@apollo/client'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import { toast } from 'react-hot-toast'

import './Navbar.scss'
import Modal from '../Modal/Modal'
import { addRippleEffect } from '../../../utils/shared/addRippleEffect.util'
import { WHOAMI } from '../../../graphql/queries/user.queries'
import { UPDATEDOC } from '../../../graphql/mutations/doc.mutations'
import { LogoutData, UpdateDocData, UpdateDocVars } from '../../../types/useMutation.types'
import { LOGOUT } from '../../../graphql/mutations/user.mutations'
import { SearchInputContext } from '../../../context/SearchInputContext'
import Spinner from '../../../assets/images/spinner.svg'

type IProps = {
  docTitle?: string
  docId?: string
  editorState?: EditorState
}
const Navbar = ({ docTitle, docId, editorState }: IProps) => {
  const [showSearchModal, setShowSearchModal] = useState(false)
  const { searchInputValue, setSearchInputValue } = useContext(SearchInputContext)
  const client = useApolloClient()
  const navigate = useNavigate()

  const {
    whoAmI: { user },
  } = client.readQuery({
    query: WHOAMI,
  })

  const [updateDoc, { loading: isSavingDocChanges }] = useMutation<UpdateDocData, UpdateDocVars>(
    UPDATEDOC,
    {
      onCompleted: (data) => {
        toast.success(data.updateDoc.message)
      },
      onError: (error) => {
        toast.error(error.message)
      },
    },
  )

  const [logoutUser, { loading: isLoggingOut }] = useMutation<LogoutData>(LOGOUT, {
    onCompleted: () => {
      toast.success('User logged out successfully')
      client.clearStore()
      navigate('/auth')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const location = useLocation()

  const showModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    addRippleEffect(e)
    setShowSearchModal(true)
  }
  const resetSearch = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    addRippleEffect(e)
    setSearchInputValue('')
  }

  const printDoc = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    addRippleEffect(e)
    window?.print()
  }

  const saveDocChanges = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    addRippleEffect(e)
    const updatedState = JSON.stringify(
      convertToRaw(editorState?.getCurrentContent() as ContentState),
    )
    updateDoc({ variables: { docId: docId as string, editorstate: updatedState } })
  }

  const logout = () => {
    logoutUser()
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
            <h1>{docTitle}</h1>
          </div>
        )}

        {location.pathname === '/' && (
          <div>
            {searchInputValue.trim().length ? (
              <button onClick={resetSearch} style={{ fontWeight: 600 }}>
                Reset
              </button>
            ) : (
              <button onClick={showModal}>
                <GrSearch className='search-icon' />
              </button>
            )}
          </div>
        )}
        <div>
          {location.pathname !== '/' && (
            <button className='save-btn' onClick={saveDocChanges} disabled={isSavingDocChanges}>
              {isSavingDocChanges ? 'Saving...' : 'Save'}
            </button>
          )}
          {location.pathname === '/' ? (
            <h3>{user?.name}</h3>
          ) : (
            <span onClick={printDoc}>
              <FcPrint className='print-icon' />
            </span>
          )}
          {isLoggingOut ? (
            <img src={Spinner} alt='spinner' className='spinner' />
          ) : (
            <img loading='lazy' src={user?.profile} alt='profile' onClick={logout} />
          )}
        </div>
      </nav>
      <AnimatePresence>
        {showSearchModal && <Modal type='search' setShowModal={setShowSearchModal} />}
      </AnimatePresence>
    </>
  )
}

export default Navbar
