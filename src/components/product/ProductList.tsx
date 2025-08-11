'use client'

import { IProduct } from '@/interfaces/product.interface'
import { Empty } from 'antd'
import ProductCard from './ProductCard'

interface IProps {
  products: IProduct[]
  onDelete?: (product: IProduct) => Promise<void>
  onBuy?: (product: IProduct) => Promise<void>
}

const ProductList = ({ products, onDelete, onBuy }: IProps) => {
  return (
    <div className="product-list">
      {products.length === 0 && <Empty className="product-empty" description="No se encontraron tiendas" />}
      {products.length > 0 && products.map(product => <ProductCard key={product.id} product={product} onDelete={onDelete} onBuy={onBuy} />)}
    </div>
  )
}

export default ProductList
