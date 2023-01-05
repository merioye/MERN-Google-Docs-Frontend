import { gql } from '@apollo/client'

export const CREATEDOC = gql`
  mutation CreateDoc($title: String!) {
    createDoc(title: $title) {
      success
      message
      doc {
        id
        userid
        title
        editorstate
        createdat
      }
    }
  }
`

export const UPDATEDOC = gql`
  mutation UpdateDoc($docId: String!, $editorstate: String!) {
    updateDoc(docId: $docId, editorstate: $editorstate) {
      success
      message
      doc {
        id
        userid
        title
        editorstate
        createdat
      }
    }
  }
`

export const DELETEDOC = gql`
  mutation DeleteDoc($docId: String!) {
    deleteDoc(docId: $docId) {
      success
      message
    }
  }
`
