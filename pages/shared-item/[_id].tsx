import React, { createContext, useContext, useMemo, useState } from 'react'
import { GetStaticPropsContext } from 'next';
import { BookmarkItemInterface, BookmarkDetailsPageProps, SharedDetailsContextType } from '../../Interfaces';
import HeadItemShared from '../../Components/HeadItemShared';
import BookmarkDetailsComponent from '../../Components/BookmarkDetailsComponent';
import { headData } from '../../utils/headData';
import { getBookmarkById } from '../../utils/getBookmarkById';
import { useUserBookmarkIds } from '../../utils/useUserBookmarkIds';
import { getAllSharedBookmarks } from '../../utils/getAllSharedBookmarks';
import { useHandleSetPostDetails } from '../../utils/useHandleSetPostDetails';

const SharedDetailsContext = createContext<SharedDetailsContextType | undefined>(undefined)

const BookmarkDetails = ({  postData, 
                            post_id, 
                            headObject, 
                            siteUrl, 
                            baseName, 
                            twitterID, 
                            MyName } : BookmarkDetailsPageProps) => {
    const [bookmarkPost, setBookmarkPost] = useState<BookmarkItemInterface | null>(null)
    useHandleSetPostDetails({postData, setPost: setBookmarkPost})    
    useUserBookmarkIds()

    const value = useMemo(() => ({
            postData,
            bookmarkPost, setBookmarkPost
    }), [bookmarkPost, setBookmarkPost, postData])
    
    return (
    <SharedDetailsContext.Provider value={value}>
        {postData && siteUrl && baseName && twitterID && MyName && post_id && <HeadItemShared
            postData= {postData}
            slug= {`shared-item/${post_id}`}
            siteUrl= {siteUrl}
            baseName= {baseName}
            twitterID= {twitterID}
            MyName= {MyName}
        />}
        <BookmarkDetailsComponent />
    </SharedDetailsContext.Provider>
    )
}
export default BookmarkDetails

export function useSharedDetailsContext(){
    const context = useContext(SharedDetailsContext)
        if(context === undefined){
            throw new Error("useContext(useSharedDetailsContext) is undefined")
        }
        return context
    }

export const getStaticProps = async (context: GetStaticPropsContext) => {
    const { params } : any = context
    const _id: string = params && params._id
    const idToSend = { bookmarkId: _id }
    const data = await getBookmarkById(idToSend)
    const headFn = (x: {page: string;
                        title: string;
                        imageUrl: string;
                        description: string;}) => {
        return x.page === "bookmark_details"
    }
    const headObject = headData.find(headFn) ?? {}
    const siteUrl = process.env.SITE_URL
    const baseName = process.env.BASE_SITE_NAME
    const twitterID = process.env.TWITTER_ID
    const MyName = process.env.MYNAME

      return {
            props: {    postData: data, 
                        post_id: _id, 
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
const data: BookmarkItemInterface[] = await getAllSharedBookmarks()
const paths = data.map(blog => {
    return blog._id &&  {
        params: { _id: blog._id.toString() }
    }
})
    return {
        paths: paths,
        fallback: true
    }
}