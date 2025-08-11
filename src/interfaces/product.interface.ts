import { IShopFormValues } from './shop.interface'

export interface IProduct {
  id: string
  name: string
  description: string
  price: number
}

export interface IProductFormValues extends IShopFormValues {
  price: number
}
