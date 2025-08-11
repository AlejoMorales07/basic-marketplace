'use client'

import { GlobalAppContext } from '@/context/GlobalContext'
import { IProduct } from '@/interfaces/product.interface'
import { createOrder } from '@/services/orders.service'
import { getProducts } from '@/services/product.service'
import { message, Typography } from 'antd'
import { useParams } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import ProductList from '../product/ProductList'

const PublicProducts = () => {
  const { id } = useParams()
  const { setLoading } = useContext(GlobalAppContext)
  const [products, setProducts] = useState<IProduct[]>([])

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

  const onBuy = async (values: any) => {
    try {
      const res = await createOrder(values.id)
      message.success(res.message)
    } catch (error) {
      message.error(error instanceof Error ? error.message : String(error))
    }
  }

  return (
    <>
      <div className="shop-header">
        <Typography.Title className="shop-title" level={1}>
          Tiendas
        </Typography.Title>
      </div>
      <ProductList products={products} onBuy={onBuy} />
    </>
  )
}

export default PublicProducts
