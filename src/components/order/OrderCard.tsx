'use client'

import { IOrder } from '@/interfaces/order.interface'
import { Card } from 'antd'
import { useSession } from 'next-auth/react'

interface IProps {
  order: IOrder
}

const OrderCard = ({ order }: IProps) => {
  const { data: session } = useSession()
  return (
    <Card className="order-card" title={order.product.name}>
      {order.product.description}
      <p>Precio: ${order.product.price}</p>
      <p>Tienda: {order.shop.name}</p>
      {session?.user?.userType === 'CLIENT' && <p>Vendedor: {order.business.businessName}</p>}
      {session?.user?.userType === 'SELLER' && <p>Comprador: {`${order.client.firstName} ${order.client.lastName}`}</p>}
    </Card>
  )
}

export default OrderCard
