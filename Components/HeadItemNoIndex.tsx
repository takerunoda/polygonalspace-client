import React from 'react'
import Head from 'next/head'

interface ComponentProps {
            headObject: any
            slug: string | undefined
            siteUrl: string | undefined
            baseName: string | undefined
            twitterID: string | undefined
            MyName: string | undefined
        }

const HeadItemNoIndex = ({headObject, slug, siteUrl, baseName, twitterID, MyName} : ComponentProps) => {
    const imageUrl = headObject.imageUrl
    const title = headObject.title
    const description = headObject.description
    const url = `${slug && slug.length > 1 ? `${siteUrl}/${slug}` : siteUrl}`

    return (
        <>
            {headObject && siteUrl && slug && baseName && twitterID && MyName && <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="robots" content="noindex, nofollow" />
                <meta name="description" content={description} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content={url} />
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
                {/* <link href="https://fonts.googleapis.com/css2?family=Oxygen:wght@300;400;700&family=Ubuntu:wght@500&family=Roboto:wght@100;500;600;700&display=swap" rel="stylesheet" /> */}
            </Head>}
        </>
    )
}

export default HeadItemNoIndex
