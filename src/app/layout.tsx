import AppLayout from '@/components/layout/AppLayout'
import themeConfig from '@/theme/themeConfig'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ConfigProvider } from 'antd'
import '../styles/index.scss'
import '@ant-design/v5-patch-for-react-19'

export const metadata = {
  title: 'Marketplace',
  description: 'Comercio electrónico de productos digitales'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body>
        <AntdRegistry>
          <ConfigProvider theme={themeConfig}>
            <AppLayout>{children}</AppLayout>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  )
}
