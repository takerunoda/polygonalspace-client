import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import Cookies from 'js-cookie';
import { MemoContextType, PostPageProps } from '../Interfaces';
import { usePostContext } from '../context/PostContext';
import MemoComponent from '../Components/MemoComponent';
import HeadItemGeneral from '../Components/HeadItemGeneral';
import { getInitialMemo } from '../utils/getInitialMemo';
import { handlePageChange } from '../utils/handlePageChange';
import { useScrollPosition } from '../utils/useScrollPosition';
import { send_posts_by_page } from '../utils/urls'
import { handlePageChangeInitial } from '../utils/handlePageChangeInitial';
import { useSetPageCookiesGeneral } from '../utils/useSetPageCookiesGeneral';
import { useHandleObserverGeneral } from '../utils/useHandleObserverGeneral';
import { defaultPicture, headData } from '../utils/headData';
import { useHandleObserverGeneralInitial } from '../utils/useHandleObserverGeneralInitial';

const MemoContext = createContext<MemoContextType | undefined>(undefined)

const Posts = ({ headObject, initialData, totalPages, itemsLength, siteUrl, baseName, twitterID, MyName } : PostPageProps) => {  
    const [loadingGeneral, setLoadingGeneral] = useState<boolean>(false)
    const [hasMoreGeneral, setHasMoreGeneral] = useState<boolean>(true)
    const [isVisibleGeneral, setIsVisibleGeneral] = useState<boolean>(false)    
    const [isVisibleGeneralInitial, setIsVisibleGeneralInitial] = useState<boolean>(false)    
    const {allPost, setAllPost} = usePostContext();    
    const currentPageCookie = Cookies.get("currentPagePost")
    const [currentPage, setCurrentPage] = 
               useState((allPost.length > 0) && currentPageCookie ? JSON.parse(currentPageCookie) : 2)
    const elementRef = useRef(null)
    const elementInitialRef = useRef(null)
    const pageChangeInitial = useCallback(() => handlePageChangeInitial({
            setLoadingGeneral,
            setCurrentPage,
            currentPage,
            totalPages, 
            hasMoreGeneral,
            setHasMoreGeneral,
            data: allPost, 
            setData: setAllPost, 
            urlName: send_posts_by_page,
            itemsLength
    }), [allPost, currentPage, hasMoreGeneral, itemsLength, setAllPost, totalPages])
    const pageChange = useCallback(() => handlePageChange({
            setLoadingGeneral,
            setCurrentPage,
            currentPage,
            totalPages,
            hasMoreGeneral,
            setHasMoreGeneral,
            data: allPost,
            setData: setAllPost, 
            urlName: send_posts_by_page,
            itemsLength
    }), [allPost, currentPage, hasMoreGeneral, itemsLength, setAllPost, totalPages])
    useHandleObserverGeneral({
            pageChange,
            setIsVisibleGeneral,
            elementRef,
            items: allPost,
         })
    useHandleObserverGeneralInitial({ 
            pageChangeInitial,
            setIsVisibleGeneralInitial,
            elementInitialRef,
         })
    useScrollPosition({path: "postScroll"})
    useSetPageCookiesGeneral({
        currentPage,
        currentPageCookie: "currentPagePost", 
        totalPages,
        totalPagesCookie: "totalPagesPost",})
    
    const memoValue = useMemo(() => ({
            loadingGeneral, initialData, elementRef, elementInitialRef, currentPage, hasMoreGeneral, isVisibleGeneral, isVisibleGeneralInitial
    }), [loadingGeneral, initialData, currentPage, hasMoreGeneral, isVisibleGeneral, isVisibleGeneralInitial])

    return (
    <MemoContext.Provider value={memoValue}>
        {headObject && siteUrl && baseName && twitterID && MyName &&<HeadItemGeneral
            headObject= {headObject}
            siteUrl= {siteUrl}
            slug= {headObject.slug}
            baseName= {baseName}
            twitterID= {twitterID}
            MyName= {MyName}            
        />}
        <MemoComponent />
    </MemoContext.Provider>
    )
}

export default Posts

export function useMemoContext(){
    const context = useContext(MemoContext)
        if(context === undefined){
            throw new Error("useContext(useMemoContext) is undefined")
        }
        return context
    }

export const getStaticProps = async () => {
            const headObject = headData.find(x => x.page === "all_posts")
            const initialData = await getInitialMemo() 
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