import { IRegisterFormValues } from '@/interfaces/auth.interface'

export const registerService = async (data: IRegisterFormValues) => {
  try {
    const res = await fetch('/api/auth/register', {
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
