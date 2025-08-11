'use client'

import { IShop } from '@/interfaces/shop.interface'
import { Empty } from 'antd'
import ShopCard from './ShopCard'

interface IProps {
  shops: IShop[]
  onDelete?: (shop: IShop) => Promise<void>
}

const ShopList = ({ shops, onDelete }: IProps) => {
  return (
    <div className="shop-list">
      {shops.length === 0 && <Empty className="shop-empty" description="No se encontraron tiendas" />}
      {shops.length > 0 && shops.map(shop => <ShopCard key={shop.id} shop={shop} onDelete={onDelete} />)}
    </div>
  )
}

export default ShopList
