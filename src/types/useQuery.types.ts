import { Doc, User } from './shared.types'

export interface WhoAmIData {
  whoAmI: {
    success: boolean
    user: User
  }
}
export interface GetMyDocsData {
  getMyDocs: {
    success: boolean
    docs: Doc[]
    __typename: string
  }
}

export interface GetSingleDoc {
  getSingleDoc: {
    success: boolean
    doc: Doc
    __typename: string
  }
}
export interface GetSingleDocVars {
  docId: string
}
