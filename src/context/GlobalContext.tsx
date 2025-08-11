'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

interface IProps {
  children: ReactNode
}

const GlobalContext = ({ children }: IProps) => {
  return <SessionProvider>{children}</SessionProvider>
}

export default GlobalContext
