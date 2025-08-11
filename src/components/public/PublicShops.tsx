'use client'

import { IShop } from '@/interfaces/shop.interface'
import { getShops } from '@/services/shop.service'
import { message, Spin, Typography } from 'antd'
import { useEffect, useState } from 'react'
import ShopList from '../shop/ShopList'

const PublicShops = () => {
  const [shops, setShops] = useState<IShop[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      setLoading(true)
      const res = await getShops()
      if (res) {
        setShops(res.data)
      }
    } catch (error) {
      message.error(error instanceof Error ? error.message : String(error))
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Spin fullscreen />
  return (
    <>
      <div className="shop-header">
        <Typography.Title className="shop-title" level={1}>
          Tiendas
        </Typography.Title>
      </div>
      <ShopList shops={shops} />
    </>
  )
}

export default PublicShops
