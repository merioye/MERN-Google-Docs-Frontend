import { gql } from '@apollo/client'

export const WHOAMI = gql`
  query WhoAmI {
    whoAmI {
      success
      user {
        id
        name
        email
        profile
      }
    }
  }
`
