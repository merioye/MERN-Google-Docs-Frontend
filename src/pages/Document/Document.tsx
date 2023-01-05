import { useQuery, useApolloClient } from '@apollo/client'
import { useParams, Navigate } from 'react-router-dom'
import { useState, useLayoutEffect } from 'react'
import { EditorState, convertFromRaw } from 'draft-js'

import { Navbar } from '../../components/Shared'
import { TextEditor } from '../../components/Document'
import { GETSINGLEDOC } from '../../graphql/queries/doc.queries'
import { GetSingleDoc, GetSingleDocVars } from '../../types/useQuery.types'
import Loader from '../../assets/images/loader.gif'
import { Doc } from '../../types/shared.types'
import { DocFragment } from '../../graphql/fragments'

const Document = () => {
  const { docId } = useParams()
  const client = useApolloClient()

  const doc = client.readFragment<Doc>({
    id: `Doc:${docId}`,
    fragment: DocFragment,
  })

  const { loading, error } = useQuery<GetSingleDoc, GetSingleDocVars>(GETSINGLEDOC, {
    variables: { docId: docId as string },
    skip: doc ? true : false,
  })
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  useLayoutEffect(() => {
    const state = doc?.editorstate
    if (error || loading || !state) return

    setEditorState(
      EditorState.createWithContent(convertFromRaw(JSON.parse(state ? state : JSON.stringify({})))),
    )
  }, [doc])

  if (loading) {
    return (
      <div className='loader-container'>
        <img src={Loader} alt='loader' />
      </div>
    )
  }

  if (error) {
    return <Navigate to='/' />
  }

  return (
    <>
      <Navbar docTitle={doc?.title} docId={docId} editorState={editorState} />
      <TextEditor editorState={editorState} setEditorState={setEditorState} />
    </>
  )
}

export default Document
