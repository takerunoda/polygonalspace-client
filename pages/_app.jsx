import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { signIn, signOut, useSession } from "next-auth/client";
import axios from 'axios'
import * as gtag from '../lib/gtag'
import '../styles/globals.css'
import Layout from '../Components/Layout'
import { PageWrapper } from '../context/PageContext'
import { PostWrapper } from '../context/PostContext'
import { UserWrapper } from '../context/UserContext'
import { ModalWrapper } from '../context/ModalContext'
import { SearchWrapper } from '../context/SearchContext'
import { BookmarkWrapper } from '../context/BookmarkContext'

// function MyApp({ Component, pageProps } : AppProps) {
function MyApp({ Component, pageProps }) {
axios.defaults.withCredentials = true;

// https://github.com/vercel/next.js/tree/canary/examples/with-google-analytics
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

const [session, loading] = useSession();
    if (loading) {
      return <p>Loading...</p>;
    }


  return (
  <>
      {!session && (
        <>
          Not signed in <br />
          <button onClick={signIn}>Sign in</button>
        </>
      )}
      {session && (
    <>
      <UserWrapper>
      <PostWrapper>
      <ModalWrapper>
      <BookmarkWrapper>
      <PageWrapper>
        <SearchWrapper>
          <Layout>
          <Component {...pageProps} />
          </Layout>
        </SearchWrapper>        
      </PageWrapper>
      </BookmarkWrapper>
      </ModalWrapper>
      </PostWrapper>
      </UserWrapper>
    </>
      )}
    </>
  )
}

export default MyApp
