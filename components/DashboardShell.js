import React from 'react'
import { LogoIcon } from '@/styles/icons';
import {
    Flex,
    Link,
    Stack,
    Icon,
    Avatar,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Heading,
} from '@chakra-ui/react'
import { useAuth } from '@/lib/auth'

const DashboardShell = ({ children }) => {
    const auth = useAuth()

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
                <Link mr={4}>Account</Link>
                <Avatar size="sm" src={auth.user.photoUrl} />
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
                <Heading mb={4}>Site</Heading>
                {children}
            </Flex>
        </Flex>
    </Flex>)
}


export default DashboardShell