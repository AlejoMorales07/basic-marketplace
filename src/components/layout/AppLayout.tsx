'use client'

import { Layout, Menu, Spin } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import { ItemType } from 'antd/es/menu/interface'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useMemo } from 'react'

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const pathname = usePathname()
  const { data: session, status } = useSession()

  const baseMenu: ItemType[] = useMemo(
    () => [
      {
        key: '/',
        label: 'Tiendas',
        onClick: () => router.push('/')
      }
    ],
    [router]
  )

  const clientMenu: ItemType[] = useMemo(
    () => [
      {
        key: '/client/orders',
        label: 'Mis Pedidos',
        onClick: () => router.push('/client/orders')
      }
    ],
    [router]
  )

  const businessMenu: ItemType[] = useMemo(
    () => [
      {
        key: '/business/shops',
        label: 'Mis Tiendas',
        onClick: () => router.push('/business/shops')
      },
      {
        key: '/business/orders',
        label: 'Mis Pedidos',
        onClick: () => router.push('/business/orders')
      }
    ],
    [router]
  )

  const sessionMenu: ItemType[] = useMemo(() => {
    if (!session) return []
    return [
      {
        key: 'user',
        label: session.user?.name || 'Usuario',
        children: [{ key: 'logout', label: 'Cerrar Sesión', onClick: () => signOut() }]
      }
    ]
  }, [session])

  const authMenu: ItemType[] = useMemo(
    () => [
      {
        key: '/auth/login',
        label: 'Iniciar Sesión',
        onClick: () => router.push('/auth/login')
      },
      {
        key: '/auth/register',
        label: 'Registro',
        onClick: () => router.push('/auth/register')
      }
    ],
    [router]
  )

  const items = useMemo(() => {
    if (session?.user?.userType === 'CLIENT') {
      return [...baseMenu, ...clientMenu, ...sessionMenu]
    } else if (session?.user?.userType === 'BUSINESS') {
      return [...baseMenu, ...businessMenu, ...sessionMenu]
    }
    return [...baseMenu, ...authMenu]
  }, [session, baseMenu, clientMenu, businessMenu, authMenu, sessionMenu])

  if (status === 'loading') {
    return <Spin fullscreen />
  }

  return (
    <Layout className="layout">
      <Header className="header">
        <Image className="logo" src="/text-logo.png" alt="Logo" width={120} height={32} />
        <Menu className="menu" theme="dark" mode="horizontal" selectedKeys={[pathname]} items={items} />
      </Header>
      <Content className="content">{children}</Content>
    </Layout>
  )
}

export default AppLayout
