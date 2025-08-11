'use client'

import { theme, Typography } from 'antd'
import { ReactNode } from 'react'

interface IProps {
  title?: string
  container?: boolean
  className?: string
  children: ReactNode
}

const AppContent = ({ children, className, container = true, title }: IProps) => {
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

  return (
    <div className={`${container ? 'container' : ''} ${className}`} style={{ background: colorBgContainer, borderRadius: borderRadiusLG }}>
      {title && (
        <Typography.Title level={1} className="title">
          {title}
        </Typography.Title>
      )}
      {children}
    </div>
  )
}

export default AppContent
