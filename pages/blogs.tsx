import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import Cookies from 'js-cookie';
import { BlogsContextType, PostPageProps } from '../Interfaces';
import { usePostContext } from '../context/PostContext';
import BlogsComponent from '../Components/BlogsComponent';
import HeadItemGeneral from '../Components/HeadItemGeneral';
import { getInitialBlog } from '../utils/getInitialBlog';
import { useScrollPosition } from '../utils/useScrollPosition';
import { handlePageChangeBlogs } from '../utils/handlePageChangeBlogs';
import { send_blog_posts_by_page } from '../utils/urls';
import { handlePageChangeInitial } from '../utils/handlePageChangeInitial';
import { defaultPicture, headData } from '../utils/headData';
import { useSetPageCookiesGeneral } from '../utils/useSetPageCookiesGeneral';
import { useHandleObserverGeneral } from '../utils/useHandleObserverGeneral';
import { useHandleObserverGeneralInitial } from '../utils/useHandleObserverGeneralInitial';

const BlogsContext = createContext<BlogsContextType | undefined>(undefined)

const BlogPosts = ({headObject, 
                    initialData, 
                    totalPages, 
                    itemsLength, 
                    siteUrl, 
                    baseName, 
                    twitterID,
                    MyName } : PostPageProps) => {  
    const [loadingGeneral, setLoadingGeneral] = useState<boolean>(false)
    const [hasMoreGeneral, setHasMoreGeneral] = useState<boolean>(true)
    const [isVisibleGeneral, setIsVisibleGeneral] = useState<boolean>(false)    
    const [isVisibleGeneralInitial, setIsVisibleGeneralInitial] = useState<boolean>(false)
    const {blogPost, setBlogPost } = usePostContext();
    const currentPageCookie = Cookies.get("currentPageBlogPost")
    const [currentPage, setCurrentPage] = 
               useState((blogPost.length > 0) && currentPageCookie ? JSON.parse(currentPageCookie) : 1)
    const elementRef = useRef(null)
    const elementInitialRef = useRef(null)
    
    const pageChangeInitial = useCallback(() => handlePageChangeInitial({
            setLoadingGeneral,
            setCurrentPage,
            currentPage,
            totalPages,
            hasMoreGeneral,
            setHasMoreGeneral,
            data: blogPost, 
            setData: setBlogPost, 
            urlName: send_blog_posts_by_page,
            itemsLength,
    }), [blogPost, currentPage, hasMoreGeneral, itemsLength, setBlogPost, totalPages])

    const pageChange = useCallback(() => handlePageChangeBlogs({
        setLoadingGeneral,
        setCurrentPage,
        currentPage,
        totalPages,
        hasMoreGeneral,
        setHasMoreGeneral,
        data: blogPost,
        setData: setBlogPost, 
        urlName: send_blog_posts_by_page,
        itemsLength,
    }), [blogPost, currentPage, hasMoreGeneral, itemsLength, setBlogPost, totalPages])

    useHandleObserverGeneral({
            pageChange,
            setIsVisibleGeneral,
            elementRef,
            items: blogPost,
         })
    useHandleObserverGeneralInitial({ 
            pageChangeInitial,
            setIsVisibleGeneralInitial,
            elementInitialRef,
         })
    useScrollPosition({path: "blogPostScroll"})
    useSetPageCookiesGeneral({
        currentPage,
        currentPageCookie: "currentPageBlogPost", 
        totalPages,
        totalPagesCookie: "totalPagesBlogPost",})

    const blogsValue = useMemo(() => ({
            loadingGeneral, initialData, elementRef, elementInitialRef, currentPage, hasMoreGeneral, isVisibleGeneral, isVisibleGeneralInitial
    }), [loadingGeneral, initialData, currentPage, hasMoreGeneral, isVisibleGeneral, isVisibleGeneralInitial])

return (<BlogsContext.Provider value={blogsValue}>
            {headObject && siteUrl && baseName && twitterID && MyName &&<HeadItemGeneral
                headObject= {headObject}
                siteUrl= {siteUrl}
                slug= {`blogs`}
                baseName= {baseName}
                twitterID= {twitterID}
                MyName= {MyName}            
            />}
            <BlogsComponent />
        </BlogsContext.Provider>
    )
}

export default BlogPosts

export function useBlogsContext(){
    const context = useContext(BlogsContext)
        if(context === undefined){
            throw new Error("useContext(useBlogsContext) is undefined")
        }
        return context
    }

export const getStaticProps = async () => {
            const headObject = headData.find(x => x.page === "blog_posts")
            const initialData = await getInitialBlog() 
            const items = initialData.items
            const totalPages = initialData.totalPages
            const itemsLength = initialData.itemsLength
            const siteUrl = process.env.SITE_URL
            const baseName = process.env.BASE_SITE_NAME
            const twitterID = process.env.TWITTER_ID
            const MyName = process.env.MYNAME
            const defaultPictureUrl = `${process.env.SITE_URL}/${defaultPicture}`
            const updatedHeadObject = headObject && {...headObject, imageUrl: defaultPictureUrl}

        return {
                props: { 
                    headObject: updatedHeadObject && updatedHeadObject,
                    initialData: items,
                    totalPages: totalPages,
                    itemsLength: itemsLength,
                    siteUrl: siteUrl,
                    baseName: baseName,
                    twitterID: twitterID,
                    MyName: MyName,
                 }, 
                revalidate: 10
            }
        }