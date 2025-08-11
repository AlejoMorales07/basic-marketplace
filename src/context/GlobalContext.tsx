'use client'

import { SessionProvider } from 'next-auth/react'
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react'

interface IGlobalState {
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
}

interface IProps {
  children: ReactNode
}

export const GlobalAppContext = createContext<IGlobalState>({
  loading: false,
  setLoading: () => {}
})

const GlobalContext = ({ children }: IProps) => {
  const [loading, setLoading] = useState(false)

  return (
    <SessionProvider>
      <GlobalAppContext.Provider value={{ loading, setLoading }}>{children}</GlobalAppContext.Provider>
    </SessionProvider>
  )
}

export default GlobalContext
