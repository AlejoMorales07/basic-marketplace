export interface RegisterFormValues {
  firstName?: string
  lastName?: string
  businessName?: string
  userType: 'client' | 'business'
  email: string
  password: string
}

export interface LoginFormValues {
  email: string
  password: string
}
