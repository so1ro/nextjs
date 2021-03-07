import React from 'react';
import NextLink from 'next/link';
import {
    Flex,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Heading,
} from '@chakra-ui/react'


const SiteFeedbackTableHeader = ({ siteName }) => {
    return (
        <>
            <Breadcrumb>
                <BreadcrumbItem>
                    <NextLink href="/feedback" passHref>
                        <BreadcrumbLink color="gray.700" fontSize="sm">Feedback</BreadcrumbLink>
                    </NextLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <BreadcrumbLink color="gray.700" fontSize="sm">{siteName || '-'}</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
            <Flex justifyContent="space-between" alignItems="center" mb={4}>
                <Heading mb={8}>{siteName || '-'}</Heading>
            </Flex>
        </>
    );
};

export default SiteFeedbackTableHeader;