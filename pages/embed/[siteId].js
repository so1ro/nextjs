import { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { Button, Box, FormControl, FormLabel, Input, FormHelperText } from '@chakra-ui/react';

import Feedback from '@/components/Feedback';
import { useAuth } from '@/lib/auth';
import { getAllFeedback, getAllSites } from "@/lib/db-admin";
import { createFeedback } from '@/lib/db';

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
        <Box
            display="flex"
            flexDirection="column"
            width="full"
        >
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
    )
};

export default SiteFeedback;