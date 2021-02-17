import { useAuth } from '@/lib/auth'
import EmptyStage from '@/components/EmptyStage';

const Dashboard = () => {
  const auth = useAuth()
  if (!auth.user) return 'Loading...'
  return <EmptyStage />
}

export default Dashboard;