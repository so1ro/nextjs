import useSWR from 'swr'
import { useRouter } from 'next/router';
import { useAuth } from '@/lib/auth'

import FeedbackEmptyState from '@/components/FeedbackEmptyState';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import DashboardShell from '@/components/DashboardShell';
import Fetcher from '@/utils/fetcher';
import FeedbackTable from '@/components/FeedbackTable';
import SiteFeedbackTableHeader from '@/components/SiteFeedbackTableHeader';

const SiteFeedback = () => {
    const { user } = useAuth()
    const { query } = useRouter()
    const { data } = useSWR(user ? [`/api/feedback/${query.siteId}`, user.token] : null, Fetcher)

    if (!data) return (
        <DashboardShell>
            <SiteFeedbackTableHeader siteName={data?.site.name} />
            <SiteTableSkeleton />
        </DashboardShell>
    )
    return (
        <DashboardShell>
            <SiteFeedbackTableHeader siteName={data?.site.name} />
            {data?.feedback.length ?
                <FeedbackTable allFeedback={data.feedback} /> :
                <FeedbackEmptyState />}
        </DashboardShell>
    )
}

export default SiteFeedback;