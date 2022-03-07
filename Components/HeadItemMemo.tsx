import React from 'react'
import Head from 'next/head'
import { trimArticleMeta } from '../utils/trimArticleMeta'
import { defaultDescription, defaultPicture } from '../utils/headData'

interface ComponentProps {
    postData: any
    slug: string | undefined
    siteUrl: string | undefined
    baseName: string | undefined
    twitterID: string | undefined
    MyName: string | undefined
}

const HeadItemMemo = ({postData, slug, siteUrl, baseName, twitterID, MyName} : ComponentProps) => {
    const imageUrl=postData ? postData.imageUrl : defaultPicture
    const title=postData && typeof postData.articleTitle === "string"? postData.articleTitle : "Polygonal Space "
    const description=postData && postData.article && typeof postData.article === "string"? trimArticleMeta(postData.article) : defaultDescription
    const schema = {
                    "@context": "https://schema.org",
                    "@type": "NewsArticle",
                    "mainEntityOfPage": {
                        "@type": "WebPage",
                        "@id": `${siteUrl}/memo-item/${slug}`
                    },
                    "headline": `${title} | Polygonal Space`,
                    "image": [
                        `${imageUrl}`
                    ],
                    "datePublished": `${postData.createdAt}`,
                    "dateModified": `${postData.updatedAt}`,
                    "author": {
                        "@type": "Person",
                        "name": MyName,
                        "url": `${siteUrl}`
                    }
                }
            const schema2 = { 
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [{
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": siteUrl
                },{
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Blogs",
                    "item": `${siteUrl}/memo`
                },{
                    "@type": "ListItem",
                    "position": 3,
                    "name": postData.articleTitle
                }]
            }

    return (
        <>
            {postData && slug && siteUrl && baseName && twitterID && MyName && <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="description" content={description} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content={`${siteUrl}/memo-item/${slug}`} />
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
                {postData && slug && siteUrl && baseName && twitterID && MyName && <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>}
                {<script type="application/ld+json">
                    {JSON.stringify(schema2)}
                </script>}
            </Head>}
        </>

    )
}

export default HeadItemMemo
