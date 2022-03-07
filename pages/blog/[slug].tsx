import React, { createContext, useContext, useMemo, useState } from 'react'
import { GetStaticPropsContext } from 'next';
import { BlogInterface, BlogDetailsPageProps, BlogDetailsContextType } from '../../Interfaces';
import HeadItemBlog from '../../Components/HeadItemBlog';
import BlogDetailsComponent from '../../Components/BlogDetailsComponent';
import { getAllBlogPosts } from '../../utils/getAllBlogPosts';
import { getBlogPostBySlug } from '../../utils/getBlogPostBySlug';
import { useHandleSetBlogPostDetails } from '../../utils/useHandleSetBlogPostDetails';
import { defaultDescription, defaultPicture, headData } from '../../utils/headData';

const BlogDetailsContext = createContext<BlogDetailsContextType | undefined>(undefined)

const BlogDetails = ({ postData, slug, headObject, siteUrl, baseName, twitterID, MyName } : BlogDetailsPageProps) => {
    const [post, setPost] = useState<BlogInterface | null>(null)
    const value = useMemo(() => ({
            postData,
            post, setPost
    }), [post, setPost, postData])
    useHandleSetBlogPostDetails({postData, setPost})

    return (
    <BlogDetailsContext.Provider value={value}>
        {postData && slug && siteUrl && baseName && twitterID && MyName && <HeadItemBlog
            postData= {postData}
            slug= {slug}
            siteUrl= {siteUrl}
            baseName= {baseName}
            twitterID= {twitterID}
            MyName= {MyName}            
        />}
        <BlogDetailsComponent />
    </BlogDetailsContext.Provider>      
    )
}
export default BlogDetails

export function useBlogDetailsContext(){
    const context = useContext(BlogDetailsContext)
        if(context === undefined){
            throw new Error("useContext(useBlogDetailsContext) is undefined")
        }
        return context
    }

export const getStaticProps = async (context: GetStaticPropsContext) => {
            const { params }: any = context
            const slug: string = params && params.slug
            const slugToSend = { slug: slug }
            const dataSlug = await getBlogPostBySlug(slugToSend)
            const headObject = headData.find(x => x.page === "blog_details")
            const picture = defaultPicture
            const description = defaultDescription
            const siteUrl = process.env.SITE_URL
            const baseName = process.env.BASE_SITE_NAME
            const twitterID = process.env.TWITTER_ID
            const MyName = process.env.MYNAME
   
      return {
            props: { 
                    postData: dataSlug, 
                    slug: slug,
                    siteUrl: siteUrl,
                    baseName: baseName,
                    twitterID: twitterID,
                    MyName: MyName,
                    headObject: headObject && headObject, 
                    defaultPicture: picture, 
                    defaultDescription: description }, 
            revalidate: 10
                }
}

export  const getStaticPaths = async () => {
const data: any[] = await getAllBlogPosts()
const paths = data ? data.map(blog => {
    return blog.id && {
        params: { slug: blog.slug.toString() }
    }
}) : []
return {
    paths: paths,
    fallback: true
  };
}