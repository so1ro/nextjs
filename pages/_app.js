import '@/styles/globals.css'
import { ChakraProvider } from "@chakra-ui/react"
import Head from 'next/head'

import { AuthProvider } from '@/lib/auth';
import theme from '@/styles/themes';

import SEO from '../next-seo.config';
import { DefaultSeo } from 'next-seo';
import { MDXProvider } from "@mdx-js/react"
import MDXComponents from '@/components/MDXComponents';

function App({ Component, pageProps }) {
  return (
    <>
      <Head><meta content="width=device-width, initial-scale=1" name="viewport" /></Head>
      <ChakraProvider theme={theme}>
        <MDXProvider components={MDXComponents}>
          <AuthProvider>
            <DefaultSeo {...SEO} />
            <Component {...pageProps} />
          </AuthProvider>
        </MDXProvider>
      </ChakraProvider>
    </>

  )
}

export default App
