import type { AppProps /*, AppContext */ } from 'next/app'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios'
import * as gtag from '../lib/gtag'
import '../styles/globals.css'
import Layout from '../Components/Layout'
import { PageWrapper } from '../context/PageContext'
import { PostWrapper } from '../context/PostContext'
import { UserWrapper } from '../context/UserContext'
import { ModalWrapper } from '../context/ModalContext'
import { SearchWrapper } from '../context/SearchContext'
import { FunctionsWrapper } from '../context/FunctionsContext';

function MyApp({ Component, pageProps } : AppProps) {
axios.defaults.withCredentials = true;

// https://github.com/vercel/next.js/tree/canary/examples/with-google-analytics
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
  <>
      <PostWrapper>
      <PageWrapper>
      <ModalWrapper>
      <SearchWrapper>
      <UserWrapper>
        <FunctionsWrapper>
          <Layout>
          <Component {...pageProps} />
          </Layout>
        </FunctionsWrapper>
      </UserWrapper>
      </SearchWrapper>        
      </ModalWrapper>
      </PageWrapper>
      </PostWrapper>
    </>
  )
}

export default MyApp
