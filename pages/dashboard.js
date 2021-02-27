import useSWR from 'swr'
import { useAuth } from '@/lib/auth'
import Fetcher from '@/utils/fetcher';
import EmptyStage from '@/components/EmptyStage';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import DashboardShell from '@/components/DashboardShell';
import SiteTable from '@/components/SiteTable';
import SiteTableHeader from '@/components/SiteTableHeader';

const Dashboard = () => {
  const { user } = useAuth()
  const { data } = useSWR(user ? ['/api/sites', user.token] : null, Fetcher)

  if (!data) return (
    <DashboardShell>
      <SiteTableHeader />
      <SiteTableSkeleton />
    </DashboardShell>)
  return (
    <DashboardShell>
      <SiteTableHeader />
      {data.sites ? <SiteTable sites={data.sites} /> : <EmptyStage />}
    </DashboardShell>
  )
}

export default Dashboard;