import { IProduct } from './product.interface'
import { IShop } from './shop.interface'
import { IUser } from './user.interface'

export interface IOrder {
  id: string
  product: IProduct
  client: IUser
  business: IUser
  shop: IShop
}
