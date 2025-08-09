export interface IRegisterFormValues {
  firstName?: string
  lastName?: string
  businessName?: string
  userType: 'CLIENT' | 'BUSINESS'
  email: string
  password: string
}

export interface ILoginFormValues {
  email: string
  password: string
}
