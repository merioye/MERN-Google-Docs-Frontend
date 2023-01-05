import { createContext, ReactNode, useState } from 'react'

type Context = {
  searchInputValue: string
  setSearchInputValue: React.Dispatch<React.SetStateAction<string>>
}

type IProps = {
  children: ReactNode
}

export const SearchInputContext = createContext({} as Context)

const SearchInputContextProvider = ({ children }: IProps) => {
  const [searchInputValue, setSearchInputValue] = useState('')
  return (
    <SearchInputContext.Provider value={{ searchInputValue, setSearchInputValue }}>
      {children}
    </SearchInputContext.Provider>
  )
}

export default SearchInputContextProvider
