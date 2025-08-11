'use client'

import { IProduct } from '@/interfaces/product.interface'
import { getShops } from '@/services/shop.service'
import { message, Spin, Typography } from 'antd'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import ShopList from '../shop/ShopList'
import { getProducts } from '@/services/product.service'
import ProductList from '../product/ProductList'

const PublicProducts = () => {
  const { id } = useParams()
  const [products, setProducts] = useState<IProduct[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      setLoading(true)
      const res = await getProducts(id as string)
      setProducts(res.data)
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
      <ProductList products={products} />
    </>
  )
}

export default PublicProducts
