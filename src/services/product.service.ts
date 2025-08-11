export const getProducts = async (id: string) => {
  try {
    const res = await fetch(`/api/products/shop/${id}`)
    const result = await res.json()
    if (res.ok) {
      return result
    } else {
      throw new Error(result.message)
    }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error))
  }
}

export const getBusinessProducts = async (id: string) => {
  try {
    const res = await fetch(`/api/business/products/shop/${id}`)
    const result = await res.json()
    if (res.ok) {
      return result
    } else {
      throw new Error(result.message)
    }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error))
  }
}

export const createProduct = async ({ data }: { data: { name: string; description: string; price: number; shopId: string } }) => {
  try {
    const res = await fetch(`/api/business/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const result = await res.json()
    if (res.ok) {
      return result
    } else {
      throw new Error(result.message)
    }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error))
  }
}

export const deleteProduct = async (id: string) => {
  try {
    const res = await fetch(`/api/business/products/${id}`, {
      method: 'DELETE'
    })
    const result = await res.json()
    if (res.ok) {
      return result
    } else {
      throw new Error(result.message)
    }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error))
  }
}
