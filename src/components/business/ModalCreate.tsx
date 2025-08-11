'use client'

import { Button, Form, FormInstance, Input, InputNumber, Modal } from 'antd'
import { useState } from 'react'

interface IProps {
  form: FormInstance
  type: 'shop' | 'product'
  onSubmit: (values: any) => Promise<void>
}

const ModalCreate = ({ form, type, onSubmit }: IProps) => {
  const [open, setOpen] = useState(false)

  const handleSubmit = async (values: any) => {
    await onSubmit(values)
    onCancel()
  }

  const onCancel = () => {
    form.resetFields()
    setOpen(false)
  }

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Crear {type === 'shop' ? 'Tienda' : 'Producto'}
      </Button>
      <Modal
        title={`Crear ${type === 'shop' ? 'Tienda' : 'Producto'}`}
        open={open}
        cancelText="Cancelar"
        onCancel={onCancel}
        okText="Crear"
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label={`Nombre de la ${type === 'shop' ? 'Tienda' : 'Producto'}`}
            name="name"
            rules={[{ required: true, message: 'Por favor ingresa el nombre!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Descripción" name="description" rules={[{ required: true, message: 'Por favor ingresa la descripción!' }]}>
            <Input.TextArea />
          </Form.Item>
          {type === 'product' && (
            <Form.Item label="Precio" name="price" rules={[{ required: true, message: 'Por favor ingresa el precio!' }]}>
              <InputNumber />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </>
  )
}

export default ModalCreate
