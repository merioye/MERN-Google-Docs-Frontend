import { gql } from '@apollo/client'

export const REGISTER = gql`
  mutation RegisterUser($name: String!, $email: String!, $password: String!, $profile: String!) {
    register(name: $name, email: $email, password: $password, profile: $profile) {
      success
      message
    }
  }
`

export const LOGIN = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      success
      message
      user {
        id
        name
        email
        profile
      }
    }
  }
`

export const LOGOUT = gql`
  mutation LogoutUser {
    logout
  }
`
