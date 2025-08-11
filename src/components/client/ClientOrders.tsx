'use client'

import { GlobalAppContext } from '@/context/GlobalContext'
import { getClientOrders } from '@/services/orders.service'
import { message, Typography } from 'antd'
import { useContext, useEffect, useState } from 'react'
import OrderList from '../order/OrderList'

const ClientOrders = () => {
  const [orders, setOrders] = useState([])
  const { setLoading } = useContext(GlobalAppContext)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      setLoading(true)
      const res = await getClientOrders()
      console.log(res.data)
      setOrders(res.data)
    } catch (error) {
      message.error(error instanceof Error ? error.message : String(error))
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Typography.Title className="business-orders-title" level={1}>
        Mis Pedidos
      </Typography.Title>
      <OrderList orders={orders} />
    </>
  )
}

export default ClientOrders
