import Head from 'next/head'
import { Button, Heading, Text, Code } from "@chakra-ui/react"

import { useAuth } from '@/lib/auth'
import styles from '@/styles/Home.module.css'

export default function Home() {
  const auth = useAuth()
  return (
    <div className={styles.container}>
      <Head>
        <title>Fast Feedback</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Heading className={styles.title}>Fast Feedback</Heading>
        <Text className={styles.description}>
          <Code className={styles.code}>Current user: {auth.user ? auth.user.email : 'None'}</Code>
        </Text>
        <div></div>
        {auth.user ?
          (<Button onClick={(e) => auth.signout()}>Sign Out</Button>) :
          (<Button onClick={(e) => auth.signinWithGithub()}>Sign In</Button>)
        }
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
