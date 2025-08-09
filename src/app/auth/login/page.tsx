'use client'

import { LoginFormValues } from '@/interfaces/auth.interfaces'
import { Button, Form, Input, theme, Typography } from 'antd'

const Login = () => {
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()
  const onSubmit = (data: LoginFormValues) => {
    console.log(data)
  }
  return (
    <div className="container-login" style={{ background: colorBgContainer, borderRadius: borderRadiusLG }}>
      <Typography.Title level={1} className="title">
        Inicio de Sesion
      </Typography.Title>
      <Form<LoginFormValues> onFinish={onSubmit} layout="vertical" className="form">
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
    </div>
  )
}

export default Login
