'use client'

import { IProductFormValues } from '@/interfaces/product.interface'
import { IShopFormValues } from '@/interfaces/shop.interface'
import { Button, Form, FormInstance, Input, InputNumber, Modal } from 'antd'
import { useState } from 'react'

interface IProps<T extends 'shop' | 'product'> {
  form: FormInstance
  type: T
  onSubmit: (values: T extends 'shop' ? IShopFormValues : IProductFormValues) => Promise<void>
}

const ModalCreate = <T extends 'shop' | 'product'>({ form, type, onSubmit }: IProps<T>) => {
  const [open, setOpen] = useState(false)

  const handleSubmit = async (values: T extends 'shop' ? IShopFormValues : IProductFormValues) => {
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
