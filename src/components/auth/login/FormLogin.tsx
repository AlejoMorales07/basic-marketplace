'use client'

import { ILoginFormValues } from '@/interfaces/auth.interface'
import { loginService } from '@/services/auth.service'
import { Button, Form, Input, message } from 'antd'
import { useRouter } from 'next/navigation'

const FormLogin = () => {
  const router = useRouter()

  const onSubmit = async (data: ILoginFormValues) => {
    try {
      await loginService(data)
      router.push('/')
    } catch (error) {
      message.error(error instanceof Error ? error.message : String(error))
    }
  }
  return (
    <Form<ILoginFormValues> onFinish={onSubmit} layout="vertical" className="form">
      <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Por favor ingresa tu email!' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="password" label="Contraseña" rules={[{ required: true, message: 'Por favor ingresa tu contraseña!' }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <div className="submit-button-container">
          <Button size="large" type="primary" htmlType="submit">
            Iniciar Sesion
          </Button>
        </div>
      </Form.Item>
    </Form>
  )
}

export default FormLogin
