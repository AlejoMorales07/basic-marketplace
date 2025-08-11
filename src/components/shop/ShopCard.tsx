'use client'

import { IShop } from '@/interfaces/shop.interface'
import { Button, Card } from 'antd'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useMemo } from 'react'

interface IProps {
  shop: IShop
  onDelete?: (shop: IShop) => Promise<void>
}

const ShopCard = ({ shop, onDelete }: IProps) => {
  const { data: session } = useSession()
  const pathname = usePathname()
  const router = useRouter()

  const baseActions: ReactNode[] = useMemo(
    () => [
      <Button
        key="see-products"
        type="link"
        onClick={() => router.push(`${session && pathname.includes('business') ? `/business/shops/${shop.id}` : `/shops/${shop.id}`}`)}
      >
        Ver Productos
      </Button>
    ],
    [session, pathname, shop, router]
  )
  const sessionActions: ReactNode[] = useMemo(
    () => [
      <Button key={'delete'} type="link" danger onClick={() => (onDelete ? onDelete(shop) : {})}>
        Eliminar
      </Button>
    ],
    [onDelete]
  )

  const actions: ReactNode[] = useMemo(
    () => [...baseActions, ...(session && session.user?.userType === 'BUSINESS' && pathname.includes('business') ? sessionActions : [])],
    [baseActions, sessionActions, session, pathname]
  )

  return (
    <Card className="shop-card" title={shop.name} actions={actions}>
      {shop.description}
    </Card>
  )
}

export default ShopCard
