import React from 'react'
import { useAuth } from '@/lib/auth'
import useSWR from 'swr'
import { LogoIcon } from '@/styles/icons';
import AddSiteModal from './AddSiteModal';
import {
    Flex,
    Link,
    Stack,
    Icon,
    Button,
    Avatar,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Heading,
} from '@chakra-ui/react'

const DashboardShell = ({ children }) => {
    const { user, signinWithGithub, signout } = useAuth()

    return (<Flex flexDirection="column">
        <Flex
            backgroundColor="white"
            justifyContent="space-between"
            alignItems="center"
            // p={4}
            px={8}
            py={4}
        >
            <Stack spacing={4} isInline alignItems="center">
                <LogoIcon w={8} h={8} />
                <Link>Feedback</Link>
                <Link>Site</Link>
            </Stack>
            <Flex alignItems="center">
                {/* <Link mr={4}>Account</Link> */}
                {!!user ?
                    <Button variant="ghost" mr={2} onClick={() => signout()}>Sign out</Button> :
                    <Button variant="ghost" mr={2} onClick={() => signinWithGithub()}>Sign in</Button>}
                <Avatar size="sm" src={user?.photoUrl} />
            </Flex>
        </Flex>
        <Flex backgroundColor="blackAlpha.100" height="100vh">
            <Flex
                w="100%"
                maxWidth="800px"
                ml="auto"
                mr="auto"
                direction="column">
                <Breadcrumb>
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink color="gray.700" fontSize="sm">Site</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <Flex justifyContent="space-between" alignItems="center" mb={4}>
                    <Heading>Site</Heading>
                    <AddSiteModal>+ Add Site</AddSiteModal>
                </Flex>
                {children}
            </Flex>
        </Flex>
    </Flex>)
}


export default DashboardShell