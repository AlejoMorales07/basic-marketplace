'use client'

import { ILoginFormValues } from '@/interfaces/auth.interface'
import { Button, Form, Input } from 'antd'

const FormLogin = () => {
  const onSubmit = (data: ILoginFormValues) => {
    console.log(data)
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
