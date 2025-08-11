'use client'

import { IRegisterFormValues } from '@/interfaces/auth.interface'
import { registerService } from '@/services/auth.service'
import { Button, Form, Input, message, Radio } from 'antd'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const FormRegister = () => {
  const [form] = Form.useForm()
  const router = useRouter()
  const [userType, setUserType] = useState<'BUSINESS' | 'CLIENT'>('CLIENT')

  useEffect(() => {
    form.setFieldsValue({ userType })
  }, [userType, form])

  const onSubmit = async (data: IRegisterFormValues) => {
    try {
      const result = await registerService(data)
      message.success(result.message)
      router.push('/auth/login')
    } catch (error) {
      message.error(error instanceof Error ? error.message : String(error))
    }
  }
  return (
    <Form<IRegisterFormValues> form={form} onFinish={onSubmit} layout="vertical" className="form">
      <Form.Item name="userType" label="Tipo de Usuario" rules={[{ required: true, message: 'Por favor selecciona un tipo de usuario!' }]}>
        <Radio.Group onChange={e => setUserType(e.target.value)}>
          <Radio value="CLIENT">Cliente</Radio>
          <Radio value="BUSINESS">Negocio</Radio>
        </Radio.Group>
      </Form.Item>
      {userType === 'BUSINESS' && (
        <Form.Item name="businessName" label="Nombre del Negocio" rules={[{ required: true, message: 'Por favor ingresa el nombre de tu negocio!' }]}>
          <Input />
        </Form.Item>
      )}

      {userType === 'CLIENT' && (
        <>
          <Form.Item name="firstName" label="Nombre" rules={[{ required: true, message: 'Por favor ingresa tu nombre!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="lastName" label="Apellido" rules={[{ required: true, message: 'Por favor ingresa tu apellido!' }]}>
            <Input />
          </Form.Item>
        </>
      )}
      <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Por favor ingresa tu email!' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="password" label="Contraseña" rules={[{ required: true, message: 'Por favor ingresa tu contraseña!' }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <div className="submit-button-container">
          <Button size="large" type="primary" htmlType="submit">
            Regístrate
          </Button>
        </div>
      </Form.Item>
    </Form>
  )
}

export default FormRegister
