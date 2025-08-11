export const getShops = async () => {
  try {
    const res = await fetch('/api/shops')
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

export const getBusinessShops = async () => {
  try {
    const res = await fetch('/api/business/shops')
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

export const createShop = async (shopData: { name: string; description: string }) => {
  try {
    const res = await fetch('/api/business/shops', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(shopData)
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

export const deleteShop = async (id: string) => {
  try {
    const res = await fetch(`/api/business/shops/${id}`, {
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
