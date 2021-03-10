import React from 'react'
import { useAuth } from '@/lib/auth'
import { LogoIcon } from '@/styles/icons';
import AddSiteModal from './AddSiteModal';
import {
    Flex,
    Link,
    Stack,
    Button,
    Avatar,
} from '@chakra-ui/react'
import NextLink from 'next/link';
import { useColorMode, useColorModeValue } from "@chakra-ui/react"

const DashboardShell = ({ children }) => {
    const { user, signinWithGithub, signout } = useAuth()
    const { colorMode, toggleColorMode } = useColorMode()
    const bg = useColorModeValue("white", "gray.800")
    const bg_Content = useColorModeValue("white", "gray.900")

    return (
        <Flex flexDirection="column" bgColor={bg_Content}>
            <Flex
                backgroundColor="white"
                justifyContent="space-between"
                alignItems="center"
                // p={4}
                px={8}
                py={4}
                bgColor={bg}
            >
                <Stack spacing={4} isInline alignItems="center">
                    <NextLink href="/" passHref>
                        <LogoIcon w={8} h={8} />
                    </NextLink>
                    <NextLink href="/sites" passHref>
                        <Link>Site</Link>
                    </NextLink>
                    <NextLink href="/feedback" passHref>
                        <Link>Feedback</Link>
                    </NextLink>
                </Stack>
                <Flex alignItems="center">
                    <Button onClick={toggleColorMode}>
                        Toggle {colorMode === "light" ? "Dark" : "Light"}
                    </Button>
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
                    direction="column"
                    py={10}>
                    {children}
                </Flex>
            </Flex>
        </Flex>
    )
}


export default DashboardShell