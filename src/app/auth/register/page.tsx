import FormRegister from '@/components/auth/register/FormRegister'
import AppContent from '@/components/content/AppContent'

const RegisterPage = () => {
  return (
    <AppContent title="Registro" container={false} className="register-container">
      <FormRegister />
    </AppContent>
  )
}

export default RegisterPage
