'use client'

import { GlobalAppContext } from '@/context/GlobalContext'
import { IShop } from '@/interfaces/shop.interface'
import { getShops } from '@/services/shop.service'
import { message, Typography } from 'antd'
import { useContext, useEffect, useState } from 'react'
import ShopList from '../shop/ShopList'

const PublicShops = () => {
  const [shops, setShops] = useState<IShop[]>([])
  const { setLoading } = useContext(GlobalAppContext)

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
