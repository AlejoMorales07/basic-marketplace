import AppContent from '@/components/content/AppContent'
import FormLogin from '@/components/login/FormLogin'
import Title from 'antd/es/typography/Title'

const LoginPage = () => {
  return (
    <AppContent title="Inicio de Sesion" content={false} className="container-login">
      <FormLogin />
    </AppContent>
  )
}

export default LoginPage
