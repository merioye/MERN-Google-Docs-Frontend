import { gql } from '@apollo/client'

export const DocFragment = gql`
  fragment MyDoc on Doc {
    id
    userid
    title
    editorstate
    createdat
    __typename
  }
`
