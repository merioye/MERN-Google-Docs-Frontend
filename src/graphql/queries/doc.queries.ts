import { gql } from '@apollo/client'

export const GETMYDOCS = gql`
  query GetMyDocs {
    getMyDocs {
      success
      docs {
        id
        userid
        title
        editorstate
        createdat
      }
    }
  }
`

export const GETSINGLEDOC = gql`
  query GetSingleDoc($docId: String!) {
    getSingleDoc(docId: $docId) {
      success
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
