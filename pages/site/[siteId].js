import { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { Button, Box, FormControl, FormLabel, Input, FormHelperText } from '@chakra-ui/react';
import useSWR, { mutate } from 'swr'

import Feedback from '@/components/Feedback';
import { useAuth } from '@/lib/auth';
import { getAllFeedback, getAllSites } from "@/lib/db-admin";
import { createFeedback } from '@/lib/db';
import DashboardShell from '@/components/DashboardShell';
import SiteHeader from '@/components/SiteHeader';
import Fetcher from '@/utils/fetcher';

export async function getStaticProps(context) {
    const siteId = context.params.siteId
    const { feedback } = await getAllFeedback(siteId)
    return {
        props: {
            initialFeedback: feedback
        },
        revalidate: 1
    }
}

export async function getStaticPaths() {
    const { sites } = await getAllSites();
    const paths = sites.map(site => ({
        params: {
            siteId: site.id.toString()
        }
    }));

    return { paths, fallback: true };
}

const SiteFeedback = ({ initialFeedback }) => {
    const auth = useAuth()
    const inputEl = useRef(null)
    const router = useRouter()
    const [allFeedback, setAllFeedback] = useState(initialFeedback)

    const siteId = router.query.siteId
    const { data: siteData } = useSWR(`/api/site/${siteId}`, Fetcher);

    const onSubmit = (e) => {
        e.preventDefault()

        const newFeedback = {
            author: auth.user.name,
            authorId: auth.user.uid,
            siteId: router.query.siteId,
            text: inputEl.current.value,
            createdAt: new Date().toISOString(),
            provider: auth.user.provider,
            status: 'pending',
        }
        inputEl.current.value = ''
        setAllFeedback([newFeedback, ...allFeedback])
        createFeedback(newFeedback)
    }

    return (
        <DashboardShell>
            <SiteHeader isSiteOwner={true} site={siteData?.site} siteId={siteId} />
            <Box
                display="flex"
                flexDirection="column"
                width="full"
                maxWidth="700px"
                margin="0 auto" >
                <Box as="form" onSubmit={onSubmit}>
                    <FormControl id="comment" my={8}>
                        <FormLabel>Comment</FormLabel>
                        <Input ref={inputEl} type="comment" />
                        <Button
                            mt={2}
                            type="submit"
                            fontWeight="medium"
                            isDisabled={router.isFallback}>
                            Add comment
                    </Button>
                        <FormHelperText>Please leave your comment.</FormHelperText>
                    </FormControl>
                </Box>
                {allFeedback && allFeedback.map(feedback => (
                    <Feedback key={feedback.id} {...feedback} />
                ))}
            </Box>
        </DashboardShell>
    )
};

export default SiteFeedback;