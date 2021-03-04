import useSWR from 'swr'
import { useAuth } from '@/lib/auth'
import Fetcher from '@/utils/fetcher';
import EmptyStage from '@/components/EmptyStage';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import DashboardShell from '@/components/DashboardShell';
import SiteTable from '@/components/SiteTable';
import SiteTableHeader from '@/components/SiteTableHeader';
import Page from '@/components/Page';
import SiteEmptyState from '@/components/SiteEmptyState';
import UpgradeEmptyState from '@/components/UpgradeEmptyState';

const Dashboard = () => {
  const { user } = useAuth()
  const { data } = useSWR(user ? ['/api/sites', user.token] : null, Fetcher)
  const isPaidAccount = user?.stripeRole !== 'free'

  return (
    <DashboardShell>
      <SiteTableHeader addIcon={!data.sites.length} />
      {!data &&
        <SiteTableSkeleton />}
      {data?.sites.length ?
        <SiteTable sites={data.sites} /> :
        (isPaidAccount ? <SiteEmptyState /> : <UpgradeEmptyState />)
      }
    </DashboardShell>
  )
}

const DashboardPage = () => {
  return (
    <Page name="Dashboard" path="/sites" >
      <Dashboard />
    </Page>
  );
};

export default DashboardPage;