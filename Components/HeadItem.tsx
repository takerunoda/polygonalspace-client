import React from 'react'
import Head from 'next/head'
import { defaultDescription, defaultPicture } from '../utils/headData'

interface ComponentProps {
    title: string
    description: string
    imageUrl: string
    noIndex: boolean
    defaultURL: boolean
}

const HeadItem = ({title, description, imageUrl, noIndex, defaultURL} : ComponentProps) => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    const baseName = process.env.NEXT_PUBLIC_BASE_SITE_NAME
    const twitterID = process.env.NEXT_PUBLIC_TWITTER_ID
    const defaultPictureItem: any = defaultPicture
    const defaultDescriptionItem: any = defaultDescription

    return (
        <>
            {!defaultURL ? 
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
                {noIndex && <meta name="robots" content="noindex, nofollow" />}
                <meta name="description" content={description} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content={baseUrl} />
                <meta property="og:image" content={imageUrl} />
                <meta property="og:site_name" content={baseName} />
                <meta property="og:locale" content="jp_JP" />
                <meta property="og:type" content="article" /> 
                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:title" content={title}/>
                <meta name="twitter:description" content={description}/>
                <meta name="twitter:site" content={twitterID}/>
                <meta name="twitter:image" content={imageUrl} />
                <meta name="twitter:creator" content={twitterID} />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com"  />
                <link href="https://fonts.googleapis.com/css2?family=Oxygen:wght@300;400;700&family=Ubuntu:wght@500&family=Roboto:wght@100;500;600;700&display=swap" rel="stylesheet" />
            </Head> :
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
                {noIndex && <meta name="robots" content="noindex, nofollow" />}
                <meta name="description" content={defaultDescriptionItem} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={defaultDescriptionItem} />
                <meta property="og:url" content={baseUrl} />
                <meta property="og:image" content={defaultPictureItem} />
                <meta property="og:site_name" content={baseName} />
                <meta property="og:locale" content="jp_JP" />
                <meta property="og:type" content="article" /> 
                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:title" content={title}/>
                <meta name="twitter:description" content={defaultDescriptionItem}/>
                <meta name="twitter:site" content={twitterID}/>
                <meta name="twitter:image" content={defaultPictureItem} />
                <meta name="twitter:creator" content={twitterID} />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com"  />
                <link href="https://fonts.googleapis.com/css2?family=Oxygen:wght@300;400;700&family=Ubuntu:wght@500&family=Roboto:wght@100;500;600;700&display=swap" rel="stylesheet" />
            </Head>}
        </>

    )
}

export default HeadItem
