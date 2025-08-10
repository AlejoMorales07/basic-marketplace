import { ILoginFormValues, IRegisterFormValues } from '@/interfaces/auth.interface'
import { signIn } from 'next-auth/react'

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

export const loginService = async (data: ILoginFormValues) => {
  try {
    const res = await signIn('credentials', {
      ...data,
      redirect: false
    })

    if (res && res.ok) {
      return res
    } else if (res && res.error) {
      throw new Error(res.error)
    } else {
      throw new Error('Error al iniciar sesión')
    }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error))
  }
}
