import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState } from 'draft-js'
import { useState } from 'react'

import './TextEditor.scss'

const TextEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={setEditorState}
      toolbarClassName='toolbar'
      editorClassName='editor'
    />
  )
}

export default TextEditor
