import { useAuth } from '@/lib/auth'
import DashboardShell from '@/components/DashboardShell';
import SiteTableHeader from '@/components/SiteTableHeader';
import { createCheckoutSession, goToBillingPortal } from '../lib/db';
import { Button, Box } from "@chakra-ui/react"

const Account = () => {
    const { user } = useAuth()
    //   const { data } = useSWR(user ? ['/api/uer', user.token] : null, Fetcher)

    //   if (!data) return (
    //     <DashboardShell>
    //       <SiteTableHeader />
    //       <SiteTableSkeleton />
    //     </DashboardShell>)
    return (
        <DashboardShell>
            <SiteTableHeader />
            <Box>
                <Button
                    alignItems="center"
                    // leftIcon={<GitHub />}
                    color="white"
                    backgroundColor="gray.700"
                    size="lg"
                    mt={4}
                    _hover={{ by: 'gray.100' }}
                    onClick={(e) => createCheckoutSession(user.uid)}>
                    Upgrade to Starter
            </Button>
                <Button
                    alignItems="center"
                    // leftIcon={<GitHub />}
                    color="white"
                    backgroundColor="gray.700"
                    size="lg"
                    mt={4}
                    ml={4}
                    _hover={{ by: 'gray.100' }}
                    onClick={(e) => goToBillingPortal()}>
                    Billing portal
            </Button>
            </Box>
        </DashboardShell>
    )
}



export default Account;