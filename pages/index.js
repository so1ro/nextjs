import Head from 'next/head'
import Router from 'next/router';
import { Stack, Flex, Button, Heading, Text, Code } from "@chakra-ui/react"

import { useAuth } from '@/lib/auth'
import styles from '@/styles/Home.module.css'
import { LogoIcon, GitHub, Google } from '@/styles/icons';
import EmptyStage from '@/components/EmptyStage';

export default function Home() {
  const auth = useAuth()
  return (
    <div className="container">
      <Head>
        <title>Fast Feedback</title>
        <script dangerouslySetInnerHTML={{
          __html: `
          if (document.cookie && document.cookie.includes('fast-feedback-auth')) {
            window.location.href = "/dashboard"
          }
        ` }} />
      </Head>
      <Flex direction="column" h="100vh" as="main" className={styles.main}>
        <LogoIcon boxSize={24} />
        {auth.user ?
          (<Button mt={4} onClick={(e) => Router.push('/dashboard')}> Dashboard</Button>) :
          (<Stack>
            <Button
              alignItems="center"
              leftIcon={<GitHub />}
              color="white"
              backgroundColor="gray.700"
              size="lg"
              mt={4}
              _hover={{ by: 'gray.100' }}
              onClick={(e) => auth.signinWithGithub()}>
              Sign in with GitHub
          </Button>
            <Button
              alignItems="center"
              leftIcon={<Google />}
              color="gray.900"
              backgroundColor="white"
              size="lg"
              mt={4}
              _hover={{ by: 'gray.100' }}
              variant="outline"
              onClick={(e) => auth.signinWithGoogle()}>
              Sign in with Google
          </Button>
          </Stack>)
        }
      </Flex>
    </div >
  )
}
