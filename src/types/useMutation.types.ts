import { Doc, User } from './shared.types'

export interface RegisterData {
  register: {
    message: string
    success: boolean
    __typename: string
  }
}
export interface RegisterVars {
  name: string
  email: string
  password: string
  profile: string
}

export interface LoginData {
  login: {
    message: string
    success: boolean
    user: User
    __typename: string
  }
}
export interface LoginVars {
  email: string
  password: string
}

export interface LogoutData {
  logout: boolean
}

export interface CreateDocData {
  createDoc: {
    doc: Doc
    message: string
    success: boolean
    __typename: string
  }
}
export interface CreateDocVars {
  title: string
}

export interface DeleteDocData {
  success: boolean
  message: string
}
export interface DeleteDocVars {
  docId: string
}

export interface UpdateDocData {
  updateDoc: {
    success: boolean
    message: string
    doc: Doc
    __typename: string
  }
}
export interface UpdateDocVars {
  docId: string
  editorstate: string
}
