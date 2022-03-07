import React from 'react'
import Head from 'next/head'

interface ComponentProps {
    headObject: any
    siteUrl: string | undefined
    baseName: string | undefined
    twitterID: string | undefined
    MyName: string | undefined
}

const HeadItemHome = ({headObject, siteUrl, baseName, twitterID, MyName} : ComponentProps) => {
    const imageUrl = headObject.imageUrl
    const title = headObject.title
    const description = headObject.description
    const schema = {
                    "@context": "https://schema.org",
                    "@type": "NewsArticle",
                    "mainEntityOfPage": {
                        "@type": "WebPage",
                        "@id": `${siteUrl}`
                    },
                    "headline": `${title}`,
                    "image": [
                        `${imageUrl}`
                    ],
                    "datePublished": `${headObject.datePublished}`,
                    "dateModified": `${headObject.dateModified}`,
                    "author": {
                        "@type": "Person",
                        "name": MyName,
                        "url": `${siteUrl}`
                    }
                }    

    return (
        <>
            {headObject && siteUrl && baseName && twitterID && MyName && <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="description" content={description} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content={`${siteUrl}`} />
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
                {<script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>}
            </Head>}
        </>

    )
}

export default HeadItemHome
