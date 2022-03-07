import React, { createContext, useContext, useMemo, useState } from 'react'
import { GetStaticPropsContext } from 'next';
import { MemoDetailsContextType, PostDetailsPageProps, PostInterface } from '../../Interfaces';
import HeadItemMemo from '../../Components/HeadItemMemo';
import MemoDetailsComponent from '../../Components/MemoDetailsComponent';
import { getAllPosts } from '../../utils/getAllPosts';
import { headData } from '../../utils/headData';
import { getPostBySlug } from '../../utils/getPostBySlug';
import { useHandleSetPostDetails } from '../../utils/useHandleSetPostDetails';

const MemoDetailsContext = createContext<MemoDetailsContextType | undefined>(undefined)

const MemoItem = ({ postData, 
                    slug, 
                    headObject, 
                    siteUrl,
                    baseName,
                    twitterID, 
                    MyName } : PostDetailsPageProps) => {    
    const [post, setPost] = useState<PostInterface | null>(null)    
    useHandleSetPostDetails({postData: postData, setPost: setPost})    

    const value = useMemo(() => ({
            postData, 
            post, setPost
    }), [postData,post, setPost])

    return (<MemoDetailsContext.Provider value={value}>
        {postData && slug && siteUrl && baseName && twitterID && MyName && <HeadItemMemo
            postData= {postData}
            slug= {slug}
            siteUrl= {siteUrl}
            baseName= {baseName}
            twitterID= {twitterID}
            MyName= {MyName}
        />}
        <MemoDetailsComponent />
    </MemoDetailsContext.Provider>      
    )
}
export default MemoItem

export function useMemoDetailsContext(){
    const context = useContext(MemoDetailsContext)
        if(context === undefined){
            throw new Error("useContext(useMemoDetailsContext) is undefined")
        }
        return context
    }

export const getStaticProps = async (context: GetStaticPropsContext) => {
        const { params } : any = context
        const slug: string = params && params.slug
        const slugToSend = { slug: slug }
        const data = await getPostBySlug(slugToSend)        
        const headObject = headData.find(x => x.page === "post_details")
        const siteUrl = process.env.SITE_URL
        const baseName = process.env.BASE_SITE_NAME
        const twitterID = process.env.TWITTER_ID
        const MyName = process.env.MYNAME

      return {
            props: { 
                    postData: data,
                    slug: slug,
                    siteUrl: siteUrl,
                    baseName: baseName,
                    twitterID: twitterID,
                    MyName: MyName,
                    headObject: headObject && headObject, 
                }, 
                    revalidate: 10
                }
}

export  const getStaticPaths = async () => {
const data: PostInterface[] = await getAllPosts()
const paths = data ? data.map(blog => {
    return blog.slug && {
        params: { slug: blog.slug.toString() }
    }
}) : []
return {
    paths: paths,
    fallback: true
  };
}