import React from 'react';
import AddSiteModal from './AddSiteModal';
import {
    Flex,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Heading,
} from '@chakra-ui/react'

const SiteTableHeader = ({ addIcon }) => {
    console.log('addIcon:', addIcon)
    return (
        <>
            <Breadcrumb>
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink color="gray.700" fontSize="sm">Site</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
            <Flex justifyContent="space-between" alignItems="center" mb={4}>
                <Heading>Site</Heading>
                {!addIcon && <AddSiteModal>+ Add Site</AddSiteModal>}
            </Flex>
        </>
    );
};

export default SiteTableHeader;