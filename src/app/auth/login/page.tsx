import FormLogin from '@/components/auth/login/FormLogin'
import AppContent from '@/components/content/AppContent'

const LoginPage = () => {
  return (
    <AppContent title="Inicio de Sesion" container={false} className="login-container">
      <FormLogin />
    </AppContent>
  )
}

export default LoginPage
