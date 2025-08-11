'use client'

import { IOrder } from '@/interfaces/order.interface'
import { IProduct } from '@/interfaces/product.interface'
import { Empty } from 'antd'
import OrderCard from './OrderCard'

interface IProps {
  orders: IOrder[]
}

const OrderList = ({ orders }: IProps) => {
  return (
    <div className="product-list">
      {orders.length === 0 && <Empty className="product-empty" description="No se encontraron tiendas" />}
      {orders.length > 0 && orders.map(order => <OrderCard key={order.id} order={order} />)}
    </div>
  )
}

export default OrderList
