'use client'

import { theme } from 'antd'

const Product = () => {
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()
  return (
    <div className="content" style={{ background: colorBgContainer, borderRadius: borderRadiusLG }}>
      Producto
    </div>
  )
}

export default Product
