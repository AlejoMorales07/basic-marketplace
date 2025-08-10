'use client'

import { theme, Typography } from 'antd'
import React from 'react'

interface IProps {
  title?: string
  content?: boolean
  className?: string
  children: React.ReactNode
}

const AppContent = ({ children, className, content = true, title }: IProps) => {
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()
  return (
    <div className={`${content ? 'content' : ''} ${className}`} style={{ background: colorBgContainer, borderRadius: borderRadiusLG }}>
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
