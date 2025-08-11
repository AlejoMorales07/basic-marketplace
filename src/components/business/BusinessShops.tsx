'use client'

import { IShop } from '@/interfaces/shop.interface'
import { createShop, deleteShop, getBusinessShops } from '@/services/shop.service'
import { Form, message, Spin, Typography } from 'antd'
import { useEffect, useState } from 'react'
import ShopList from '../shop/ShopList'
import ModalCreate from './ModalCreate'

const BusinessShops = () => {
  const [form] = Form.useForm()
  const [shops, setShops] = useState<IShop[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      setLoading(true)
      const res = await getBusinessShops()
      setShops(res.data)
    } catch (error) {
      message.error(error instanceof Error ? error.message : String(error))
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (values: { name: string; description: string }) => {
    try {
      const res = await createShop(values)
      message.success(res.message)
    } catch (error) {
      message.error(error instanceof Error ? error.message : String(error))
    } finally {
      getData()
    }
  }

  const onDelete = async (shop: IShop) => {
    try {
      const res = await deleteShop(shop.id)
      message.success(res.message)
    } catch (error) {
      message.error(error instanceof Error ? error.message : String(error))
    } finally {
      getData()
    }
  }

  if (loading) return <Spin fullscreen />

  return (
    <>
      <div className="business-shops-header">
        <Typography.Title className="business-shops-title" level={1}>
          Mis Tiendas
        </Typography.Title>
        <ModalCreate form={form} type="shop" onSubmit={onSubmit} />
      </div>
      <ShopList shops={shops} onDelete={onDelete} />
    </>
  )
}

export default BusinessShops
