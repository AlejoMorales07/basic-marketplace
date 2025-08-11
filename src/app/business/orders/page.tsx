import BusinessOrders from '@/components/business/BusinessOrders'
import AppContent from '@/components/content/AppContent'

const BusinessOrdersPage = () => {
  return (
    <AppContent className="orders-container">
      <BusinessOrders />
    </AppContent>
  )
}

export default BusinessOrdersPage
