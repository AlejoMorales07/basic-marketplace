'use client'

import { GlobalAppContext } from '@/context/GlobalContext'
import { IProduct } from '@/interfaces/product.interface'
import { createProduct, deleteProduct, getBusinessProducts } from '@/services/product.service'
import { Form, message, Typography } from 'antd'
import { useParams } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import ProductList from '../product/ProductList'
import ModalCreate from './ModalCreate'

const BusinessProducts = () => {
  const { id } = useParams()
  const [form] = Form.useForm()
  const { setLoading } = useContext(GlobalAppContext)
  const [products, setProducts] = useState<IProduct[]>([])

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      setLoading(true)
      const res = await getBusinessProducts(id as string)
      setProducts(res.data)
    } catch (error) {
      message.error(error instanceof Error ? error.message : String(error))
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (values: any) => {
    try {
      const res = await createProduct({ data: { ...values, shopId: id as string } })
      message.success(res.message)
    } catch (error) {
      message.error(error instanceof Error ? error.message : String(error))
    } finally {
      getData()
    }
  }

  const onDelete = async (product: IProduct) => {
    try {
      const res = await deleteProduct(product.id)
      message.success(res.message)
    } catch (error) {
      message.error(error instanceof Error ? error.message : String(error))
    } finally {
      getData()
    }
  }

  return (
    <>
      <div className="business-products-header">
        <Typography.Title className="business-products-title" level={1}>
          Mis Productos
        </Typography.Title>
        <ModalCreate form={form} type="product" onSubmit={onSubmit} />
      </div>
      <ProductList products={products} onDelete={onDelete} />
    </>
  )
}

export default BusinessProducts
