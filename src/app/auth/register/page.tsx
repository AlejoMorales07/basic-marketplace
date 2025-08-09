import AppContent from '@/components/content/AppContent'
import FormRegister from '@/components/register/FormRegister'

const RegisterPage = () => {
  return (
    <AppContent title="Registro" content={false} className="container-register">
      <FormRegister />
    </AppContent>
  )
}

export default RegisterPage
