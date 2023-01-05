import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState } from 'draft-js'

import './TextEditor.scss'

type IProps = {
  editorState: EditorState
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>
}
const TextEditor = ({ editorState, setEditorState }: IProps) => {
  const handleEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState)
  }
  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={handleEditorStateChange}
      toolbarClassName='toolbar'
      editorClassName='editor'
    />
  )
}

export default TextEditor
