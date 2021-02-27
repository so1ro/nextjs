import { useAuth } from '@/lib/auth'
import useSWR from 'swr'
import EmptyStage from '@/components/EmptyStage';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import DashboardShell from '../components/DashboardShell';
import Fetcher from '@/utils/fetcher';
import FeedbackTable from '@/components/FeedbackTable';
import FeedbackTableHeader from '@/components/FeedbackTableHeader';

const MyFeedback = () => {
    const { user } = useAuth()
    const { data } = useSWR(user ? ['/api/feedback', user.token] : null, Fetcher)

    if (!data) return (
        <DashboardShell>
            <FeedbackTableHeader />
            <SiteTableSkeleton />
        </DashboardShell>
    )
    return (
        <DashboardShell>
            <FeedbackTableHeader />
            {data.feedback ?
                <FeedbackTable allFeedback={data.feedback} /> :
                <EmptyStage />}
        </DashboardShell>
    )
}

export default MyFeedback;