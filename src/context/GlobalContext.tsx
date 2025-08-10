'use client'

import { SessionProvider } from 'next-auth/react'
import React from 'react'

interface IProps {
  children: React.ReactNode
}

const GlobalContext = ({ children }: IProps) => {
  return <>{children}</>
  return <SessionProvider>{children}</SessionProvider>
}

export default GlobalContext
