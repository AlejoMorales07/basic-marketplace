'use client'

import { Layout, Menu } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import { ItemType, MenuItemType } from 'antd/es/menu/interface'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const pathname = usePathname()

  const items: ItemType<MenuItemType>[] = [
    {
      key: '/',
      label: 'Tiendas',
      onClick: () => router.push('/')
    },
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
  ]
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
