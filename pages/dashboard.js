import { useAuth } from '@/lib/auth'
import useSWR from 'swr'
import EmptyStage from '@/components/EmptyStage';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
// import { DashboardShell } from '@/components/DashboardShell';
import DashboardShell from '../components/DashboardShell';
import Fetcher from '@/utils/fetcher';
import SiteTable from '@/components/SiteTable';


const Dashboard = () => {
  const { user } = useAuth()
  const { data } = useSWR(user ? ['/api/sites', user.token] : null, Fetcher)

  if (!data) return <DashboardShell><SiteTableSkeleton /></DashboardShell>
  return <DashboardShell>{data.sites ? <SiteTable sites={data.sites} /> : <EmptyStage />}</DashboardShell>
}

export default Dashboard;