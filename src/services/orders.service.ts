export const getClientOrders = async () => {
  try {
    const res = await fetch('/api/client/orders', {
      method: 'GET'
    })
    const orders = await res.json()
    return orders
  } catch (error) {
    console.error(error)
    throw new Error('Error al obtener los pedidos')
  }
}

export const getBusinessOrders = async () => {
  try {
    const res = await fetch('/api/business/orders', {
      method: 'GET'
    })
    const orders = await res.json()
    return orders
  } catch (error) {
    console.error(error)
    throw new Error('Error al obtener los pedidos')
  }
}

export const createOrder = async (id: string) => {
  try {
    const res = await fetch('/api/client/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    })
    const order = await res.json()
    return order
  } catch (error) {
    console.error(error)
    throw new Error('Error al crear el pedido')
  }
}
