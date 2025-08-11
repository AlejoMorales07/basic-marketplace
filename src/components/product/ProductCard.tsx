'use client'

import { IProduct } from '@/interfaces/product.interface'
import { Button, Card } from 'antd'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { ReactNode, useMemo } from 'react'

interface IProps {
  product: IProduct
  onDelete?: (product: IProduct) => Promise<void>
  onBuy?: (product: IProduct) => Promise<void>
}

const ProductCard = ({ product, onDelete }: IProps) => {
  const { data: session } = useSession()
  const pathname = usePathname()

  const baseActions: ReactNode[] = useMemo(
    () => [
      <Button key="buy" type="link" disabled={session && session.user?.userType === 'BUSINESS' ? true : false} onClick={() => {}}>
        Comprar
      </Button>
    ],
    [session, pathname, product]
  )
  const sessionActions: ReactNode[] = useMemo(
    () => [
      <Button key={'delete'} type="link" danger onClick={() => (onDelete ? onDelete(product) : {})}>
        Eliminar
      </Button>
    ],
    [onDelete]
  )

  const actions: ReactNode[] = useMemo(
    () => [...(session && session.user?.userType === 'BUSINESS' && pathname.includes('business') ? sessionActions : baseActions)],
    [baseActions, sessionActions, session, pathname]
  )

  return (
    <Card className="product-card" title={product.name} actions={actions}>
      {product.description}
      <p>Precio: ${product.price}</p>
    </Card>
  )
}

export default ProductCard
