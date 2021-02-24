import Head from 'next/head'
import Router from 'next/router';
import { Flex, Button, Heading, Text, Code } from "@chakra-ui/react"

import { useAuth } from '@/lib/auth'
import styles from '@/styles/Home.module.css'
import { LogoIcon } from '@/styles/icons';
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
          (<Button mt={4} onClick={(e) => auth.signinWithGithub()}>Sign In</Button>)
        }
      </Flex>
    </div >
  )
}
